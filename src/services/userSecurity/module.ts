import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'

// Password
import passwordResetRequestedEpic from './password/epics/passwordResetRequestedEpic'
//import passwordReceivedEpic from './password/epics/passwordReceivedEpic'
import passwordReducer from './password/passwordReducer'
import { PasswordEventTypes } from './password/events'

// AccountDetails
import accountDetailsRequestedEpic from './accountDetails/epics/accountDetailsRequestedEpic'
import executeCallbackEpic from './accountDetails/epics/accoutDetailsExecuteCallbackEpic'
import accountToggleWelcomeEpic from './accountDetails/epics/accountToggleWelcomeEpic'
import accountDetailsReducer from './accountDetails/accountDetailsReducer'
import { AccountDetailsEventTypes } from './accountDetails/events'

// Profile
import profileReducer from './profile/profileReducer'
import { ProfileEventTypes } from './profile/events'
import profileRequestedEpic from './profile/epics/profileRequestedEpic'
import profileReceivedEpic from './profile/epics/profileReceivedEpic'

// Token
import tokenRequestedEpic from './token/epics/tokenRequestedEpic'
import tokenPersistEpic from './token/epics/tokenPersistEpic'
import tokenReceivedEpic from './token/epics/tokenReceivedEpic'
import tokenPasswordResetRequestedEpic from './token/epics/tokenPasswordResetRequestedEpic'
import refreshTokenRequestedEpic from './token/epics/refreshTokenRequestedEpic'
import { TokenEventTypes } from './token/events'
import tokenReducer from './token/tokenReducer'

// Signup
import signupRequestedEpic from './signup/epics/signupRequestedEpic'
import signupReceivedEpic from './signup/epics/signupReceivedEpic'
import { SignupEventTypes } from './signup/events'
import signupReducer from './signup/signupReducer'

// Epics
const epics = combineEpics(
  ...tokenRequestedEpic,
  ...signupRequestedEpic,
  ...tokenReceivedEpic,
  ...profileRequestedEpic,
  ...signupReceivedEpic,
  ...tokenPasswordResetRequestedEpic,
  ...passwordResetRequestedEpic,
  //...passwordReceivedEpic,
  ...accountDetailsRequestedEpic,
  ...refreshTokenRequestedEpic,
  ...profileReceivedEpic,
  ...tokenPersistEpic,
  ...executeCallbackEpic,
  ...accountToggleWelcomeEpic
)

// Reducers
const userSecurityReducer = combineReducers({
  profile: profileReducer,
  token: tokenReducer,
  signup: signupReducer,
  password: passwordReducer,
  accountDetails: accountDetailsReducer
})

// Module Interface
interface IUserSecurityModule {
  readonly epics: any
  readonly reducer: any
}

// Exports
export type UserSecurityEventTypes =
  TokenEventTypes
  | SignupEventTypes
  | ProfileEventTypes
  | PasswordEventTypes
  | AccountDetailsEventTypes

export const UserSecurityModule: IUserSecurityModule = {
  epics: epics,
  reducer: userSecurityReducer,
}
