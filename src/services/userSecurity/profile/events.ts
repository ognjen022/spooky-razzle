import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { ProfileResponse } from './models'
import { ActionType } from 'typesafe-actions'

export const profileRequestedEvent = createAction(eventTypes.USERSECURITY_PROFILE_REQUESTED)

export const profileReceivedEvent = createAction(eventTypes.USERSECURITY_PROFILE_RECEIVED, (resolve) => (data: ProfileResponse) =>
  resolve(data)
)

export const profileErroredEvent = createAction(eventTypes.USERSECURITY_PROFILE_ERRORED, (resolve) => (error: any) => resolve({ error }))


export type ProfileEventTypes = ActionType<
  typeof profileRequestedEvent | typeof profileReceivedEvent | typeof profileErroredEvent
>
