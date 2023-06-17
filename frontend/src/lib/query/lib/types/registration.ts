type SignBase = {
  email: string
  password: string
}

export type SignUp = SignBase & {
  name: string
}

export type SignIn = SignBase

type ResponseBase = {
  id: number
  name: string
  email: string
}

export type SignUpResponse = ResponseBase

export type SignInResponse = ResponseBase & {
  motto: string
}

export type LogoutResponse = {
  message: string
}
