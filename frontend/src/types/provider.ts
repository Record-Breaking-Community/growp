import { SetState } from './util'

type LayoutContextType = {
  siteTitle: string
}

export type LayoutContext = {
  layoutValue: LayoutContextType
  setLayoutValue: SetState<LayoutContextType>
}
