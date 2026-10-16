import { Client, type StompConfig } from '@stomp/stompjs'

export function getWebSocketUrl(): string {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'http://localhost:8080'
    const wsBase = apiBase.replace(/^http(s?):\/\//, 'ws$1://')
    return `${wsBase.replace(/\/+$/, '')}/ws`
}

export function createStompClient(options?: Partial<StompConfig>): Client {
    const brokerURL = getWebSocketUrl()

    return new Client({
        brokerURL,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => {
            if (import.meta.dev) {
                // console.debug('[STOMP]', str)
            }
        },
        ...options
    })
}

let sharedClient: Client | null = null

export function getSharedStompClient(): Client {
    if (!sharedClient) {
        sharedClient = createStompClient()
    }
    return sharedClient
}
