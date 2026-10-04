import { getToken } from "~/features/Auth/lib/getToken"
import type { Conversation } from "../types/conversations"

export async function getConversation(id: number): Promise<Conversation> {
    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const conversation_response = await fetch(`${apiUrl}/api/v1/conversations/${id}`, {
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": csrf.token
        }
    })

    if (!conversation_response.ok) {
        return {
            id: -1,
            title: "",
            type: "",
            visibility: "",
            createdAt: ""
        }
    }

    return await conversation_response.json()
}