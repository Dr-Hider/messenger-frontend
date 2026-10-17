import type { createWithId, createWithoutId } from "../types/create"
import { getToken } from "~/features/Auth/lib/getToken"

export async function createConversationWithCompanion(
    title: string,
    type: string,
    visibility: string,
    companionId: number): Promise<boolean> {
        const apiUrl = useRuntimeConfig().public.apiBase
        const csrf = await getToken()

        const body: createWithId = {
            title: title,
            type: type,
            visibility: visibility,
            companionId: companionId
        }

        const createResponse =  await fetch(`${apiUrl}/api/v1/conversations`, {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json",
                "X-XSRF-TOKEN": csrf.token
            },
            body: JSON.stringify(body)
        })

        return createResponse.ok
}
