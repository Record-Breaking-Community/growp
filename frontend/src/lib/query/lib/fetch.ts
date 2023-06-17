import axios from 'axios'
import { parseCookies } from 'nookies'
import { HttpMethod, RequestPath } from './const'

/**
 * アクセストークン(Cookie)を使ってAPIからFetchする
 * @param {RequestPath} path リクエストのパス
 * @param {HttpMethod} httpMethod httpメソッド
 * @param {object?} data 送信する情報
 * @returns {Promise<any>} 何らかの情報を返す
 */
export async function fetchWithAccessToken(
  path: RequestPath,
  httpMethod: HttpMethod,
  data?: object
): Promise<any> {
  const cookies = parseCookies()
  const access_token = cookies.access_token
  if (!access_token) {
    // eslint-disable-next-line no-console
    throw new Error("access_token doesn't exist.")
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: true,
  }

  let res
  switch (httpMethod) {
    case HttpMethod.GET:
      res = axios.get(url, options)
      break
    case HttpMethod.POST:
      res = axios.post(url, data, options)
      break
    case HttpMethod.PATCH:
      res = axios.patch(url, data, options)
      break
    case HttpMethod.DELETE:
      res = axios.delete(url, options)
      break
  }

  return res
}

/**
 * アクセストークン(Cookie)を使わずにAPIからFetchする
 * @param {RequestPath} path リクエストのパス
 * @param {HttpMethod} httpMethod httpメソッド
 * @param {object?} data 送信する情報
 * @returns {Promise<any>} 何らかの情報を返す
 */
export async function fetchWithOutToken(
  path: RequestPath,
  httpMethod: HttpMethod,
  data?: object
): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`
  let res
  switch (httpMethod) {
    case HttpMethod.POST:
      res = axios.post(url, data, {
        withCredentials: true,
      })
      break
    case HttpMethod.PATCH:
      res = axios.patch(url, data, {
        withCredentials: true,
      })
      break
    case HttpMethod.GET:
      res = axios.get(url, {
        withCredentials: true,
      })
      break
    case HttpMethod.DELETE:
      res = axios.delete(url, {
        withCredentials: true,
      })
      break
  }

  return res
}
