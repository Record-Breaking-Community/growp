import { AxiosError } from 'axios'
import { useAlert } from 'react-alert'
import { useQueryClient, UseMutationResult, useMutation } from 'react-query'
import { ApiError } from '~/types/util'
import { signUp } from '../query'
import { SignUp, SignUpResponse } from '../query/lib/types/registration'

export function useSignUp(): UseMutationResult<
  SignUpResponse,
  AxiosError<ApiError>,
  SignUp,
  undefined
> {
  const client = useQueryClient()
  const alert = useAlert()

  return useMutation(signUp, {
    // TODO:anyで回避, 後々治すべき
    onSuccess: (data: any) => {
      client.setQueryData('user', data.data)
      alert.success('新規登録しました')
      // TODO:遷移先をかく
    },
    onError: (e) => {
      alert.error(`${e.response?.status} : ${e.response?.data.detail}`)
    },
  })
}
