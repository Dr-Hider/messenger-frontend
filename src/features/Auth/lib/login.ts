import type { LoginRequest } from "../types/auth"
import { getToken } from "./getToken"

export async function login(loginOrEmail: string, password: string): Promise<Response> {
    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const body: LoginRequest = {
        loginOrEmail: loginOrEmail,
        password: password
    }
    
    return await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json",
            "X-XSRF-TOKEN": csrf.token
        },
        body: JSON.stringify(body)
    })
}
