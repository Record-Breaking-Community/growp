import { HttpMethod, RootRequest } from './const'
import { fetchWithOutToken } from './fetch'

/**
 * helloでテスト
 * @returns {string} hello, world
 */
export async function fetchHello(): Promise<string> {
  const res: string = await fetchWithOutToken(RootRequest.Hello, HttpMethod.GET)
  return res
}
