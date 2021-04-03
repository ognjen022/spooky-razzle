import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { SignupResponse } from './models'
import { ActionType } from 'typesafe-actions'
import { networkErroredEvent } from '../../shared/networkErroredEvent'

export const signupRequestedEvent = createAction(
  eventTypes.USERSECURITY_SIGNUP_REQUESTED,
  (resolve) => (firstname: string, lastname: string, email: string, password: string, join: boolean) => resolve({ firstname, lastname, email, password, join })
)

export const signupReceivedEvent = createAction(eventTypes.USERSECURITY_SIGNUP_RECEIVED, (resolve) => (data: SignupResponse) =>
  resolve(data)
)

export const signupErroredEvent = createAction(eventTypes.USERSECURITY_SIGNUP_ERRORED, (resolve) => (error: SignupResponse) => resolve(error))

export type SignupEventTypes = ActionType<
  typeof signupRequestedEvent | typeof signupReceivedEvent | typeof signupErroredEvent | typeof networkErroredEvent
>
