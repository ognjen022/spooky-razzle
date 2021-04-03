import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { PasswordResetResponse } from './models'
import { ActionType } from 'typesafe-actions'
import { networkErroredEvent } from '../../shared/networkErroredEvent'

export const passwordUpdateRequestedEvent = createAction(
  eventTypes.USERSECURITY_PASSWORD_CHANGE_REQUESTED,
  (resolve) => (password: string, confirmPassword: string ) => resolve({ password, confirmPassword })
)

export const passwordReceivedEvent = createAction(eventTypes.USERSECURITY_PASSWORD_CHANGE_RECEIVED, (resolve) => (data: PasswordResetResponse) =>
  resolve(data)
)

export const passwordErroredEvent = createAction(eventTypes.USERSECURITY_PASSWORD_CHANGE_ERRORED, (resolve) => (error: PasswordResetResponse) => resolve(error))

export type PasswordEventTypes = ActionType<
  typeof passwordUpdateRequestedEvent | typeof passwordReceivedEvent | typeof passwordErroredEvent | typeof networkErroredEvent
>
