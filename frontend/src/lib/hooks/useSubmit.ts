import { AxiosError } from 'axios'
import { useAlert } from 'react-alert'
import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import { ApiError } from '~/types/util'
import { submit } from '../query'
import { ResultResponse, SubmitRequest } from '../query/lib/types/diagnosis'

export function useSubmit(): UseMutationResult<
  ResultResponse,
  AxiosError<ApiError>,
  SubmitRequest,
  undefined
> {
  const alert = useAlert()
  const client = useQueryClient()

  return useMutation(submit, {
    onSuccess: (data: any) => {
      client.setQueryData('result', data.data)
      alert.info('診断結果を送信します...')
    },
    onError: (e) => {
      alert.error(`${e.response?.status} : ${e.response?.data.detail}`)
    },
  })
}
