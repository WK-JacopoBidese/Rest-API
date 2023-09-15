export interface User {
    username: string,
    email: string,
    password: string
}

export interface SavedUser extends User {
    id: string
}

export interface Users {
    [key: string]: SavedUser
}