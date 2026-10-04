import type { createWithId, createWithoutId } from "../types/create"
import { getToken } from "~/features/Auth/lib/getToken"

export async function createConversation(
    title: string,
    type: string,
    visibility: string): Promise<void>

export async function createConversation(
    title: string,
    type: string,
    visibility: string,
    companionId: number): Promise<void>

export async function createConversation(
    title: string,
    type: string,
    visibility: string,
    companionId?: number): Promise<void> {
        if(companionId !== undefined) {
            const apiUrl = useRuntimeConfig().public.apiBase
            const csrf = await getToken()

            const body: createWithId = {
                title: title,
                type: type,
                visibility: visibility,
                companionId: companionId
            }

            const create_response = await fetch(`${apiUrl}/api/v1/conversations`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                    "X-XSRF-TOKEN": csrf.token
                },
                body: JSON.stringify(body)
            })
        }
}
