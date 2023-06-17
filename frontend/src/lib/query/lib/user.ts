import { UserRequest, HttpMethod } from './const'
import { fetchWithAccessToken } from './fetch'
import {
  UpdateUserRequest,
  UpdateUserResponse,
  UserResponse,
} from './types/user'

/**
 * ユーザーの情報を更新する
 * @param {UpdateUserRequest} data 更新に必要なパラメータ
 * @returns {Promise<UpdateUserResponse>} 更新後のユーザーの情報
 */
export async function updateProfile(
  data: UpdateUserRequest
): Promise<UpdateUserResponse> {
  const res: UpdateUserResponse = await fetchWithAccessToken(
    UserRequest.UpdateProfile,
    HttpMethod.PATCH,
    data
  )
  return res
}

/**
 * ログイン中のユーザーの情報を返す
 * @returns {Promise<UserResponse>} ログイン中のユーザーの情報
 */
export async function getCurrentUser(): Promise<UserResponse> {
  const res: UserResponse = await fetchWithAccessToken(
    UserRequest.CurrentUser,
    HttpMethod.GET
  )
  return res
}

/**
 * refresh_tokenを使ってアクセストークンを取得する
 * @returns {Promise<UserResponse>} ログイン中のユーザーの情報
 */
export async function getRefreshToken(): Promise<void> {
  await fetchWithAccessToken(UserRequest.RefreshToken, HttpMethod.GET)
}
