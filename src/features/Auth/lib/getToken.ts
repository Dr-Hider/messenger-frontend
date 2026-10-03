import type { Csrf } from "../types/auth"

export async function getToken(): Promise<Csrf> {
    const apiUrl = useRuntimeConfig().public.apiBase

    const token_response = await fetch(`${apiUrl}/api/v1/auth/csrf`, {
        credentials: "include"
    })

    if (!token_response.ok) {
        throw new Error(`Something went wrong: ${token_response.status}`)
    }

    return await token_response.json()
}
