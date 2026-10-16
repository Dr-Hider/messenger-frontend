import { ref, watch, onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'
import type { StompSubscription } from '@stomp/stompjs'
import { getSharedStompClient } from '~/shared/api/socket'
import type { Message } from '../types/conversations'
import type {
    WebSocketEvent,
    NewMessageEvent,
    UserTypingEvent,
    MessageReadEvent,
    MessageDeletedEvent
} from '../types/socket'

export interface UseConversationSocketOptions {
    onNewMessage?: (message: Message) => void
    onUserTyping?: (event: UserTypingEvent) => void
    onMessageRead?: (event: MessageReadEvent) => void
    onMessageDeleted?: (event: MessageDeletedEvent) => void
}

export function useConversationSocket(
    conversationIdSource: MaybeRefOrGetter<number>,
    options: UseConversationSocketOptions = {}
) {
    const isConnected = ref(false)
    const client = getSharedStompClient()

    let conversationSub: StompSubscription | null = null
    let userQueueSub: StompSubscription | null = null

    const hasListeners = Boolean(
        options.onNewMessage ||
        options.onUserTyping ||
        options.onMessageRead ||
        options.onMessageDeleted
    )

    function handleEvent(event: WebSocketEvent) {
        switch (event.type) {
            case 'NEW_MESSAGE':
                options.onNewMessage?.(event.message)
                break
            case 'USER_TYPING':
                options.onUserTyping?.(event)
                break
            case 'MESSAGE_READ':
                options.onMessageRead?.(event)
                break
            case 'MESSAGE_DELETED':
                options.onMessageDeleted?.(event)
                break
        }
    }

    function subscribe(convId: number) {
        unsubscribe()

        if (!hasListeners || convId <= 0 || !client.connected) {
            return
        }

        // Subscribe to conversation broadcast topic
        conversationSub = client.subscribe(`/topic/conversations/${convId}`, (message) => {
            try {
                const event: WebSocketEvent = JSON.parse(message.body)
                handleEvent(event)
            } catch (err) {
                console.error('[WebSocket] Failed to parse message body:', err)
            }
        })

        // Subscribe to user private queue
        userQueueSub = client.subscribe('/user/queue/messages', (message) => {
            try {
                const event: WebSocketEvent = JSON.parse(message.body)
                handleEvent(event)
            } catch (err) {
                console.error('[WebSocket] Failed to parse user queue message:', err)
            }
        })
    }

    function unsubscribe() {
        if (conversationSub) {
            conversationSub.unsubscribe()
            conversationSub = null
        }
        if (userQueueSub) {
            userQueueSub.unsubscribe()
            userQueueSub = null
        }
    }

    function sendTyping() {
        const convId = toValue(conversationIdSource)
        if (convId > 0 && client.connected) {
            client.publish({
                destination: `/app/conversations/${convId}/typing`,
                body: JSON.stringify({})
            })
        }
    }

    onMounted(() => {
        if (!import.meta.client) return

        const originalOnConnect = client.onConnect
        client.onConnect = (frame) => {
            isConnected.value = true
            originalOnConnect?.(frame)
            const currentId = toValue(conversationIdSource)
            if (hasListeners) {
                subscribe(currentId)
            }
        }

        const originalOnDisconnect = client.onDisconnect
        client.onDisconnect = (frame) => {
            isConnected.value = false
            originalOnDisconnect?.(frame)
        }

        if (client.connected) {
            isConnected.value = true
            if (hasListeners) {
                subscribe(toValue(conversationIdSource))
            }
        } else if (!client.active) {
            client.activate()
        }

        if (hasListeners) {
            watch(
                () => toValue(conversationIdSource),
                (newId) => {
                    if (client.connected) {
                        subscribe(newId)
                    }
                }
            )
        }
    })

    onUnmounted(() => {
        unsubscribe()
    })

    return {
        isConnected,
        sendTyping
    }
}
