import type { LoginRequest } from "../types/auth"
import { getToken } from "./getToken"
import { getMe } from "./getMe"

export async function login(loginOrEmail: string, password: string): Promise<Response> {
    const apiUrl = useRuntimeConfig().public.apiBase
    const csrf = await getToken()

    const body: LoginRequest = {
        loginOrEmail: loginOrEmail,
        password: password
    }
    
    const loginResponse = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json",
            "X-XSRF-TOKEN": csrf.token
        },
        body: JSON.stringify(body)
    })

    if (loginResponse.ok) {
        const me = await getMe()
        localStorage.setItem("id", me.id.toString())
        localStorage.setItem("displayName", me.displayName)
    }

    return loginResponse
}
