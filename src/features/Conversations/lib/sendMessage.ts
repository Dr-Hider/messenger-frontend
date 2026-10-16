import { getToken } from '~/features/Auth'

export async function sendMessage(conversationId: number, text: string): Promise<boolean> {
    if (!text.trim() || conversationId <= 0) {
        return false
    }

    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const response = await fetch(`${apiUrl}/api/v1/conversations/${conversationId}/messages`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrf.token
        },
        body: JSON.stringify({ text })
    })

    return response.ok
}
