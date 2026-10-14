import { getToken } from "~/features/Auth"
import type { Conversation } from "../types/conversations"

export async function getConversation(id: number): Promise<Conversation> {
    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const conversationResponse = await fetch(`${apiUrl}/api/v1/conversations/${id}`, {
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": csrf.token
        }
    })

    if (!conversationResponse.ok) {
        return {
            id: -1,
            title: "",
            type: "",
            visibility: "",
            createdAt: ""
        }
    }

    return await conversationResponse.json()
}
