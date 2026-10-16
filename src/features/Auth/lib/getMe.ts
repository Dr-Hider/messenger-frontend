import type { Me } from "../types/auth"

export async function getMe(): Promise<Me> {
    const apiUrl = useRuntimeConfig().public.apiBase

    const checkResponse = await fetch(`${apiUrl}/api/v1/users/me`, {
        credentials: "include"
    })

    if (!checkResponse.ok) {
        return {
            id: -1,
            login: "",
            email: "",
            displayName: "",
            createdAt: ""
        }
    }

    return await checkResponse.json()
}
