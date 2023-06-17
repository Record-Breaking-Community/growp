import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { useState, MouseEvent } from 'react'
import { Control, Controller } from 'react-hook-form'

type Props = {
  label: string
  control: Control<any>
  name: string
  required?: boolean
}

function PasswordController({ label, control, name, required = false }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth required variant='outlined'>
          <InputLabel
            error={!!error}
            htmlFor={`outlined-adornment-password-${label}`}
            required={required}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            id={`outlined-adornment-password-${label}`}
            type={showPassword ? 'text' : 'password'}
            {...field}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={!!error}
            label={label}
            required={required}
          />
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </FormControl>
      )}
      rules={
        required
          ? {
              required: 'パスワードは必須です。',
              minLength: {
                value: 8,
                message: '8文字以上で入力してください。',
              },
              maxLength: {
                value: 20,
                message: '20文字以下で入力してください。',
              },
            }
          : undefined
      }
    />
  )
}

export default PasswordController
