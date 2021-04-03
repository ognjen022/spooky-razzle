import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { AccountDetailsResponse } from './models'
import { ActionType } from 'typesafe-actions'
import { networkErroredEvent } from '../../shared/networkErroredEvent'
import { resolve } from 'dns'

export const accountDetailsRequestedEvent = createAction(
  eventTypes.USERSECURITY_ACCOUNT_DETAILS_REQUESTED,
  (resolve) => (firstName: string, lastName: string, email: string, phone: string, ) => resolve({ firstName, lastName, email, phone })
)

export const accountDetailsReceivedEvent = createAction(eventTypes.USERSECURITY_ACCOUNT_DETAILS_RECEIVED, (resolve) => (data: AccountDetailsResponse) =>
  resolve(data)
)

export const accountDetailsErroredEvent = createAction(eventTypes.USERSECURITY_ACCOUNT_DETAILS_ERRORED, (resolve) => (error: AccountDetailsResponse) => resolve(error))

export const accountToggleSignupEvent = createAction(eventTypes.USERSECURITY_TOGGLE_SIGNUP, resolve => (callBack?: () => void ) => resolve(callBack));
export const accountToggleLoginEvent = createAction(eventTypes.USERSECURITY_TOGGLE_LOGIN, resolve => (callBack?: () => void ) => resolve(callBack));
export const accountToggleForgotPasswordEvent = createAction(eventTypes.USERSECURITY_TOGGLE_FORGOTPASSWORD);

export const accountToggleWelcomeEvent = createAction(eventTypes.USERSECURITY_TOGGLE_WELCOME);


export const executeCallbackEvent = createAction(eventTypes.USERSECURITY_EXECUTE_CALLBACK)

export type AccountDetailsEventTypes = ActionType<
  typeof accountDetailsRequestedEvent | 
  typeof accountDetailsReceivedEvent | 
  typeof accountDetailsErroredEvent | 
  typeof networkErroredEvent |
  typeof accountToggleLoginEvent | 
  typeof accountToggleSignupEvent | 
  typeof accountToggleForgotPasswordEvent |
  typeof accountToggleWelcomeEvent |
  typeof executeCallbackEvent
>

