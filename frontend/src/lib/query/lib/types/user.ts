type UserBase = {
  id: number
  name: string
  email: string
  motto: string
}

export type UserResponse = UserBase

export type UpdateUserRequest = UserBase & {
  password: string
  newPassword: string
}

export type UpdateUserResponse = UserBase
