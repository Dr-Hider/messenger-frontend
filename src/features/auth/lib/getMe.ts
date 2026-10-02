import type { Me } from "../types/auth"

export async function getMe(): Promise<Me> {
    const apiUrl = useRuntimeConfig().public.apiBase

    const check_response = await fetch(`${apiUrl}/api/v1/users/me`, {
        credentials: "include"
    })

    if (!check_response.ok) {
        return {
            id: -1,
            login: "",
            email: "",
            displayName: "",
            createdAt: ""
        }
    }

    else {
        return await check_response.json()
    }
}
