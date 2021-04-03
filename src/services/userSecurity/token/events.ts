import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { TokenResponse, TokenPasswordResetRequest, TokenPasswordResetResponse, TokenRequest } from './models'
import { ActionType } from 'typesafe-actions'

// Sign in Events
export const tokenRequestedEvent = createAction(
  eventTypes.USERSECURITY_TOKEN_REQUESTED,
  (resolve) => (request: TokenRequest) => resolve(request)
)
export const tokenReceivedEvent = createAction(eventTypes.USERSECURITY_TOKEN_RECEIVED, (resolve) => (data: TokenResponse) =>
  resolve(data)
)
export const tokenErroredEvent = createAction(eventTypes.USERSECURITY_TOKEN_ERRORED, (resolve) => (error: TokenResponse) => resolve(error))

// Reset Password Events
export const tokenPasswordResetRequestedEvent = createAction(
  eventTypes.USERSECURITY_TOKEN_FORGOT_PASSWORD_REQUESTED,
  (resolve) => (request: TokenPasswordResetRequest) => resolve(request)
)

export const tokenPasswordResetReceivedEvent = createAction(eventTypes.USERSECURITY_TOKEN_FORGOT_PASSWORD_RECEIVED, (resolve) => (data: TokenPasswordResetResponse) =>
  resolve(data)
)

export const tokenPasswordResetErroredEvent = createAction(eventTypes.USERSECURITY_TOKEN_FORGOT_PASSWORD_ERRORED, (resolve) => (error: TokenPasswordResetResponse) => resolve(error))

// Signout Events
export const tokenRemovedEvent = createAction(eventTypes.USERSECURITY_TOKEN_REMOVED)

export const tokenRefreshTokenRequestedEvent = createAction(eventTypes.USERSECURITY_TOKEN_REFRESH_REQUESTED)

export type TokenEventTypes = ActionType<
  typeof tokenRequestedEvent
  | typeof tokenReceivedEvent
  | typeof tokenErroredEvent
  | typeof tokenPasswordResetRequestedEvent
  | typeof tokenPasswordResetReceivedEvent
  | typeof tokenPasswordResetErroredEvent
  | typeof tokenRemovedEvent
  | typeof tokenRefreshTokenRequestedEvent
>
