export type SubmitRequest = {
  isForming: boolean
  isStorming: boolean
  isNorming: boolean
  isPerforming: boolean
  isAdjourning: boolean
}

type ResultBase = {
  name: string
  description: string
}

export type ResultResponse = ResultBase & {
  id: number
  createdAt: Date
  updatedAt: Date
}
