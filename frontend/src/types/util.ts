import { SetStateAction, Dispatch, ReactNode } from 'react'

// reactのuseState, SetState部分
export type SetState<T> = Dispatch<SetStateAction<T>>

export type ProviderProps = {
  children: ReactNode
}

export type ApiError = {
  detail: string
}
