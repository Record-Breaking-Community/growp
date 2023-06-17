import { CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import validator from 'validator'
import PasswordController from '~/components/base/FormField/PasswordController'
import { useLayout } from '~/components/provider/LayoutProvider'
import { useSignUp } from '~/lib/hooks/useSignUp'

type LoginForm = {
  name: string
  email: string
  password: string
}

export function SignupPage() {
  //フォーム状態とメソッドを取得
  const { control, handleSubmit } = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { setLayoutValue } = useLayout()
  const { mutate, isLoading } = useSignUp()

  useEffect(() => {
    setLayoutValue({ siteTitle: '新規登録' })
  }, [])

  const onSubmit = (data: LoginForm) => mutate(data)

  return (
    <form
      className='mx-auto my-16 flex w-3/5 flex-col gap-8 rounded-lg border-2 px-20 py-10 shadow xl:w-1/2 xl:px-24 xl:py-20 2xl:w-2/5 2xl:px-28'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className='text-center text-2xl'>新規登録</h3>
      <Controller
        control={control}
        name='name'
        render={({ field, fieldState: { error } }) => (
          <TextField
            className='mb-6'
            {...field}
            error={!!error}
            helperText={error?.message as string}
            id='name'
            label='名前'
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
            className='mb-6'
            {...field}
            error={!!error}
            helperText={error?.message as string}
            id='email'
            label='メールアドレス'
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'メールアドレスは必須です。',
          },
          validate: {
            isEmail: (value) =>
              validator.isEmail(value) ||
              '正しいメールアドレスを入力してください。',
          },
        }}
      />
      <PasswordController
        control={control}
        label='パスワード'
        name='password'
        required
      />
      <div className='mx-auto flex flex-col items-center justify-center gap-4'>
        {!isLoading ? (
          <Button
            className='rounded px-4 py-2'
            color='primary'
            disabled={isLoading}
            type='submit'
            variant='outlined'
          >
            新規登録
          </Button>
        ) : (
          <CircularProgress />
        )}
        <Link className='block text-center' href='/login'>
          Login
        </Link>
      </div>
    </form>
  )
}
