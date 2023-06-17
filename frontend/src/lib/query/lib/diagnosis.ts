import { DiagnosisRequest, HttpMethod } from './const'
import { fetchWithAccessToken } from './fetch'
import { ResultResponse, SubmitRequest } from './types/diagnosis'

/**
 * 診断結果を送信する
 * @param {SubmitRequest} data 診断結果送信に必要なパラメータ
 * @returns {Promise<ResultResponse>} 診断結果
 */
export async function submit(data: SubmitRequest): Promise<ResultResponse> {
  const res: ResultResponse = await fetchWithAccessToken(
    DiagnosisRequest.Submit,
    HttpMethod.POST,
    data
  )
  return res
}

/**
 * 診断結果の履歴を返す
 * @returns {Promise<ResultResponse[]>} 診断結果の履歴のリスト
 */
export async function getResultList(): Promise<ResultResponse[]> {
  const res: ResultResponse[] = await fetchWithAccessToken(
    DiagnosisRequest.Submit,
    HttpMethod.GET
  )
  return res
}
