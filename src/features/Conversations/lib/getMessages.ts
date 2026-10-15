import { getToken } from '~/features/Auth'

export async function getMessages(conversationId: number): Promise<Response> {
    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const messagesResponse = await fetch(`${apiUrl}/api/v1/conversations/${conversationId}/messages`, {
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": csrf.token
        }
    })

    return messagesResponse
}
