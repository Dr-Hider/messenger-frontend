export interface LoginRequest {
    loginOrEmail: string
    password: string
}

export interface RegisterRequest {
    login: string
    email: string
    displayName: string
    password: string
}

export interface Csrf {
    parameterName: string
    token: string
    headerName: string
}

export interface Me {
    id: number
    login: string
    email: string
    displayName: string
    createdAt: string
}
