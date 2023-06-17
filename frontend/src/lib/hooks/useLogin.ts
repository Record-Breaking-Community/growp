import { AxiosError } from 'axios'
import { useAlert } from 'react-alert'
import { useQueryClient, UseMutationResult, useMutation } from 'react-query'
import { ApiError } from '~/types/util'
import { signIn } from '../query'
import { SignIn, SignInResponse } from '../query/lib/types/registration'

export function useLogin(): UseMutationResult<
  SignInResponse,
  AxiosError<ApiError>,
  SignIn
> {
  const client = useQueryClient()
  const alert = useAlert()

  return useMutation(signIn, {
    // TODO:anyで回避, 後々治すべき
    onSuccess: (data: any) => {
      client.setQueryData('user', data.data)
      // TODO:遷移先を書く
      alert.success('ログインしました')
    },
    onError: (e) => {
      alert.error(`${e.response?.status} : ${e.response?.data.detail}`)
    },
  })
}
