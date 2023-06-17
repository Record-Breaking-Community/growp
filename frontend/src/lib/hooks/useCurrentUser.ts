import { AxiosError } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { ApiError } from '~/types/util'
import { getCurrentUser } from '../query'
import { UserResponse } from '../query/lib/types/user'

export function useCurrentUser(): UseQueryResult<
  UserResponse,
  AxiosError<ApiError>
> {
  return useQuery('user', getCurrentUser, {
    onSuccess: () => {
      // eslint-disable-next-line no-console
      console.log('get_current_user')
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error(`${err.response?.status} : ${err.response?.data.detail}`)
    },
    staleTime: 10,
    cacheTime: 10 * 60 * 1000,
  })
}
