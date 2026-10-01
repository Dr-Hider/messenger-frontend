interface LoginRequest {
    login: string,
    password: string
}

export async function login(login: string, password: string) {
    const apiUrl = useRuntimeConfig().public.apiBase

    const body: LoginRequest = {
        login: login,
        password: password
    }
    
    const login_response = fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
}
