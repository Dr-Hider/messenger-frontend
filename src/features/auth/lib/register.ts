interface RegisterRequest {
    login: string,
    email: string,
    nickname: string,
    password: string
}

export async function register(login: string, email: string, nickname: string, password: string) {
    const apiUrl = useRuntimeConfig().public.apiBase

    const body: RegisterRequest = {
        login: login,
        email: email,
        nickname: nickname,
        password: password
    }
    
    const register_response = fetch(`${apiUrl}/api/v1/users`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
}
