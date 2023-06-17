import { AxiosError } from 'axios'
import { useAlert } from 'react-alert'
import { UseQueryResult, useQuery } from 'react-query'
import { ApiError } from '~/types/util'
import { getResultList } from '../query'
import { UserResponse } from '../query/lib/types/user'

export function useCurrentUser(): UseQueryResult<
  UserResponse,
  AxiosError<ApiError>
> {
  const alert = useAlert()

  return useQuery('resultList', getResultList, {
    onError: (e) => {
      alert.error(`${e.response?.status} : ${e.response?.data.detail}`)
    },
  })
}
