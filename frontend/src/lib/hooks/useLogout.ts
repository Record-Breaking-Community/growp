import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { useQueryClient, useMutation, UseMutationResult } from 'react-query'
import { ApiError } from '~/types/util'
import { logout } from '../query'
import { LogoutResponse } from '../query/lib/types/registration'

export function useLogout(): UseMutationResult<
  LogoutResponse,
  AxiosError<ApiError>,
  void,
  undefined
> {
  const client = useQueryClient()
  const alert = useAlert()
  const router = useRouter()

  return useMutation(logout, {
    onSuccess: () => {
      client.resetQueries('user')
      router.push('/')
      alert.info('ログアウトしました')
    },
    onError: (e) => {
      if (e.response)
        alert.error(`${e.response.status} : ${e.response.data.detail}`)
      else alert.error(`${e.message}`)
    },
  })
}
