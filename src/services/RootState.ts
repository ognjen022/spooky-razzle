import { IConfigurationState } from './config/models';
import { IContactUsState } from './contact/models';
import { IUserSecurityState } from './userSecurity/IUserSecurityState'
import { IContentState } from './content/IContentState'
import { IPaymentsState } from './payments/IPaymentsState'

export interface IRouterState {
  readonly location: IRLocationState
  readonly action: string
}

export interface IRLocationState {
  readonly pathname: string
  readonly search: string
  readonly hash: string
  readonly key: string
  readonly query: any
}

export type RootState = {
  router: IRouterState | any,
  notifications: any,
  userSecurity: IUserSecurityState,
  content: IContentState,
  payments: IPaymentsState,
  contact: IContactUsState,
  configuration: IConfigurationState
}
