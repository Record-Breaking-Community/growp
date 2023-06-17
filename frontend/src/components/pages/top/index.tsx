import Image from 'next/image'
import { useEffect } from 'react'
import { useLayout } from '~/components/provider/LayoutProvider'

export function Top() {
  const { setLayoutValue } = useLayout()

  useEffect(() => {
    setLayoutValue({ siteTitle: 'Growp' })
  }, [])

  return (
    <div className='text-white'>
      <div className=' bg-[#FD6565] py-10 text-center text-6xl leading-relaxed'>
        <p>現在のあなたのチームを</p>
        <p>タックマンモデルの</p>
        <p>５ステージ診断しましょう</p>
      </div>
      <div className='relative flex h-[530px] w-full'>
        <div className='relative w-1/2'>
          <Image
            alt='現在のあなたのチームを'
            fill
            src='/top_image1.png'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='relative w-1/2'>
          <Image
            alt='タックマンモデルの５ステージ診断しましょう'
            fill
            src='/top_image2.png'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <button className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#1976D2] px-4 py-2 text-[32px] text-white'>
          診断テストを受ける
        </button>
      </div>
    </div>
  )
}
