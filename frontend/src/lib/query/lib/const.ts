/**
 * FastAPI RouterのBaseURL
 */
enum RouterBaseUrl {
  User = 'users',
  Diagnosis = 'diagnosis',
}

/**
 * FastAPI UserRouterのリクエストURL
 */
export enum UserRequest {
  CurrentUser = `${RouterBaseUrl.User}/me`,
  UpdateProfile = `${RouterBaseUrl.User}/update`,
  RefreshToken = `${RouterBaseUrl.User}/refresh_token`,
}

/**
 * FastAPI DiagnosisRouterのリクエストURL
 */
export enum DiagnosisRequest {
  Index = `${RouterBaseUrl.Diagnosis}`,
  Submit = `${RouterBaseUrl.Diagnosis}/submit`,
}

/**
 * FastAPI Rootでもリクエスト可能なURL
 */
export enum RootRequest {
  Hello = 'hello',
  SignUp = 'sign_up',
  SignIn = 'sign_in',
  Logout = 'logout',
}

/**
 * FastAPIで実装済みのHttpメソッド
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * Fetchで指定できるパスの種類
 */
export type RequestPath = UserRequest | DiagnosisRequest | RootRequest
