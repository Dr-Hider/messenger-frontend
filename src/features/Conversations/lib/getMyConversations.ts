import { getToken } from "~/features/Auth/lib/getToken"
import type { MyConversations } from "../types/conversations"

export async function getMyConversations(): Promise<MyConversations> {
    const apiUrl = useRuntimeConfig().public.apiBase

    const csrf = await getToken()

    const conversations_response = await fetch(`${apiUrl}/api/v1/me/conversations`, {
        credentials: "include",
        headers: {
            "X-XSRF-TOKEN": csrf.token
        }
    })

    if (!conversations_response.ok) {
        return {
            conversations: [],
            nextLastUpdatedAt: "",
            nextLastId: -1
        }
    }

    return await conversations_response.json()
}
