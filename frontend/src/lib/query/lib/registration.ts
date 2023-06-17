import { RootRequest, HttpMethod } from './const'
import { fetchWithAccessToken, fetchWithOutToken } from './fetch'
import {
  LogoutResponse,
  SignIn,
  SignInResponse,
  SignUp,
  SignUpResponse,
} from './types/registration'

/**
 * 新規登録
 * @param {SignUp} data 新規登録に必要なパラメータ
 * @returns {Promise<SignUpResponse>} 新規登録したユーザーの情報
 */
export async function signUp(data: SignUp): Promise<SignUpResponse> {
  const res: SignUpResponse = await fetchWithOutToken(
    RootRequest.SignUp,
    HttpMethod.POST,
    data
  )
  return res
}

/**
 * ログイン
 * @param {SignIn} data ログインに必要なパラメータ
 * @returns {Promise<SignInResponse>} ログインしたユーザーの情報
 */
export async function signIn(data: SignIn): Promise<SignInResponse> {
  const res: SignInResponse = await fetchWithOutToken(
    RootRequest.SignIn,
    HttpMethod.POST,
    data
  )
  return res
}

/**
 * ログアウト
 * @returns {Promise<LogoutResponse>} ログアウトのメッセージ
 */
export async function logout(): Promise<LogoutResponse> {
  const res: LogoutResponse = await fetchWithAccessToken(
    RootRequest.Logout,
    HttpMethod.DELETE
  )
  return res
}
