import { Alert } from '@mui/material'
import type { AlertTemplateProps } from 'react-alert'

export function Template({ message, options }: AlertTemplateProps) {
  const type = options.type ?? 'info'

  return (
    <Alert className='mt-20' severity={type}>
      {message}
    </Alert>
  )
}
