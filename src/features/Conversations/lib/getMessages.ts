import { getToken } from '~/features/Auth'
import type { Messages } from '../types/conversations'

export async function getMessages(conversationId: number): Promise<Messages> {
    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const messagesResponse = await fetch(`${apiUrl}/api/v1/conversations/${conversationId}/messages`, {
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": csrf.token
        }
    })

    if (!messagesResponse.ok) {
        return {
            messages: [],
            hasMore: false,
            nextLastCreatedAt: "",
            nextLastId: -1
        }
    }

    return await messagesResponse.json()
}
