import { AxiosError } from 'axios'
import { useAlert } from 'react-alert'
import { useQueryClient, UseMutationResult, useMutation } from 'react-query'
import { ApiError } from '~/types/util'
import { updateProfile } from '../query'
import { SignUpResponse } from '../query/lib/types/registration'
import { UpdateUserRequest } from '../query/lib/types/user'

export function useUpdateProfile(): UseMutationResult<
  SignUpResponse,
  AxiosError<ApiError>,
  UpdateUserRequest,
  undefined
> {
  const client = useQueryClient()
  const alert = useAlert()

  return useMutation(updateProfile, {
    // TODO:anyで回避, 後々治すべき
    onSuccess: (data: any) => {
      client.setQueryData('user', data.data)
      alert.success('更新に成功しました')
    },
  })
}
