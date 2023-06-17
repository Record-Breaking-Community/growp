import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useLayout } from '~/components/provider/LayoutProvider'

export function DiagnosisResult() {
  const { setLayoutValue } = useLayout()

  useEffect(() => {
    setLayoutValue({ siteTitle: '診断結果' })
  }, [])

  return (
    <div className='bg-gradient-to-b from-[#F3BCBC] to-[#FF5C0099]'>
      <div className='flex flex-col items-center py-10'>
        <Typography component='div' variant='h6'>
          あなたのチームタイプ
        </Typography>
        <Typography className='my-6 font-medium' component='div' variant='h3'>
          形成期
        </Typography>
        <div className='relative my-4 h-[380px] w-[700px]'>
          <Image
            alt='現在のあなたのチームを'
            fill
            src='/forming.png'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className='flex flex-col items-center pb-10'>
        <Typography component='div' variant='h4'>
          形成期とは？
        </Typography>
        <div className='my-6 min-h-[300px] min-w-[800px] rounded-3xl bg-[#F38686] p-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.3)] shadow-white'>
          {/* 文章 */}
        </div>
        <Button
          className='mt-3 bg-[#1976D2]'
          color='primary'
          variant='contained'
        >
          サイトへ
        </Button>
      </div>
    </div>
  )
}
