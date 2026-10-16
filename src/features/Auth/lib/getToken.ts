import type { Csrf } from "../types/auth"

export async function getToken(): Promise<Csrf> {
    const apiUrl = useRuntimeConfig().public.apiBase

    const tokenResponse = await fetch(`${apiUrl}/api/v1/auth/csrf`, {
        credentials: "include"
    })

    if (!tokenResponse.ok) {
        return {
            parameterName: "",
            token: "",
            headerName: ""
        }
    }

    return await tokenResponse.json()
}
