import type { LoginRequest } from "../types/auth"
import { getToken } from "./getToken"

export async function login(loginOrEmail: string, password: string): Promise<void> {
    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const body: LoginRequest = {
        loginOrEmail: loginOrEmail,
        password: password
    }
    
    const login_response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json",
            "X-XSRF-TOKEN": csrf.token
        },
        body: JSON.stringify(body)
    })

    if (!login_response.ok) {
        throw new Error(`Something went wrong: ${login_response.status}`)
    }
}
