import { Button, CircularProgress, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import PasswordController from '~/components/base/FormField/PasswordController'
import { useLayout } from '~/components/provider/LayoutProvider'
import { useCurrentUser } from '~/lib/hooks/useCurrentUser'
import { useUpdateProfile } from '~/lib/hooks/useUpdateProfile'
import { SignInResponse } from '~/lib/query/lib/types/registration'
import { Profile } from '~/types/user'

export function ProfilePage() {
  const { control, handleSubmit, setValue } = useForm<Profile>({
    defaultValues: {
      email: '',
      name: '',
      motto: '',
      currentPassword: '',
      newPassword: '',
    },
  })

  const { setLayoutValue } = useLayout()
  const client = useQueryClient()
  const { mutate, isLoading } = useUpdateProfile()
  const { data, isLoading: loading, isError } = useCurrentUser()
  const router = useRouter()

  if (isError) router.push('/')

  useEffect(() => {
    setLayoutValue({ siteTitle: 'アカウント情報' })
  }, [])

  useEffect(() => {
    const d = data as any
    if (d && 'data' in d) {
      setProfile({
        name: d.data.name,
        email: d.data.email,
        motto: d.data.motto,
      })
    }
  }, [data])

  const setProfile = (data: { name: string; email: string; motto: string }) => {
    setValue('name', data.name)
    setValue('email', data.email)
    setValue('motto', data.motto)
  }

  const onSubmit = (data: Profile) => {
    const user = client.getQueriesData<SignInResponse>('user')[0][1]

    // submit query
    mutate({
      id: user.id,
      name: data.name,
      email: data.email,
      motto: data.motto,
      password: data.currentPassword,
      newPassword: data.newPassword,
    })
  }

  return (
    <form
      className='mx-auto my-16 flex w-3/5 flex-col gap-8 rounded-lg border-2 px-20 py-10 shadow xl:w-1/2 xl:px-24 xl:py-20 2xl:w-2/5 2xl:px-28'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className='text-center text-2xl'>アカウント情報</h3>
      <Controller
        control={control}
        name='name'
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            error={!!error}
            helperText={error?.message as string}
            id='name'
            label='名前'
            required
          />
        )}
        rules={{
          required: { value: true, message: '名前は必須です。' },
          minLength: {
            value: 4,
            message: '4文字以上で入力してください',
          },
        }}
      />
      <Controller
        control={control}
        name='email'
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            error={!!error}
            helperText={error?.message as string}
            id='email'
            label='メールアドレス'
            required
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'メールアドレスは必須です。',
          },
          validate: {
            isEmail: (value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
              '正しいメールアドレスを入力してください。',
          },
        }}
      />
      <Controller
        control={control}
        name='motto'
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            error={!!error}
            helperText={error?.message as string}
            id='motto'
            label='座右の銘'
          />
        )}
      />
      <PasswordController
        control={control}
        label='現在のパスワード'
        name='currentPassword'
      />
      <PasswordController
        control={control}
        label='新しいパスワード'
        name='newPassword'
      />
      <div className='mx-auto mb-4 w-1/5 '>
        {!isLoading ? (
          <Button
            className='rounded px-4 py-2'
            color='primary'
            type='submit'
            variant='outlined'
          >
            更新
          </Button>
        ) : (
          <CircularProgress />
        )}
      </div>
    </form>
  )
}
