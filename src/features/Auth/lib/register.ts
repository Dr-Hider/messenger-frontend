import type { LoginRequest, RegisterRequest } from "../types/auth"
import { getToken } from "./getToken"

export async function register(
    login: string,
    email: string,
    displayName: string,
    password: string): Promise<LoginRequest> {
        const apiUrl = useRuntimeConfig().public.apiBase
        const csrf = await getToken()

        const body: RegisterRequest = {
            login: login,
            email: email,
            displayName: displayName,
            password: password
        }
        
        const registerResponse = await fetch(`${apiUrl}/api/v1/users`, {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json",
                "X-XSRF-TOKEN": csrf.token
            },
            body: JSON.stringify(body)
        })

        if (!registerResponse.ok) {
            return {
                loginOrEmail: "",
                password: ""
            }
        }

        return {
            loginOrEmail: login,
            password: password
        }
}
