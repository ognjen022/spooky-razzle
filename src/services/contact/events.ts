import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { IContactUsResponse } from './models'
import { ActionType } from 'typesafe-actions'
import { networkErroredEvent } from '../shared/networkErroredEvent'

export const contactUsRequestedEvent = createAction(
  eventTypes.CONTACT_SEND_REQUESTED,
  (resolve) => (firstname: string, lastname: string, email: string, messsage: string) => resolve({ firstname, lastname, email, messsage })
)

export const contactUsReceivedEvent = createAction(eventTypes.CONTACT_SEND_RECEIVED, (resolve) => (data: IContactUsResponse) =>
  resolve(data)
)

export const contactUsErroredEvent = createAction(eventTypes.CONTACT_SEND_ERRORED, (resolve) => (error: IContactUsResponse) => resolve(error))

export type ContactUsEventTypes = ActionType<
  typeof contactUsRequestedEvent | typeof contactUsReceivedEvent | typeof contactUsErroredEvent | typeof networkErroredEvent
>
