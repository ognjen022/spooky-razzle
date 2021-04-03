import { ProfileState } from './profile/models'
import { TokenState } from './token/models'
import { SignupState } from './signup/models'
import { PasswordState } from './password/models'
import { AccountDetailsState } from './accountDetails/models'

export interface IUserSecurityState {
  readonly profile: ProfileState
  readonly token: TokenState
  readonly signup: SignupState
  readonly password: PasswordState
  readonly accountDetails: AccountDetailsState
}
