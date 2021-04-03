import { IConfigurationResponse } from './models';
import { createAction, ActionType } from 'typesafe-actions';

import * as eventTypes from './eventTypes'

export const configRequestedEvent = createAction(eventTypes.CONFIG_REQUESTED)

export const configReceivedEvent = createAction(eventTypes.CONFIG_RECEIVED, (resolve) => (response: IConfigurationResponse) =>
  resolve(response)
)

export const configErroredEvent = createAction(eventTypes.CONFIG_ERRORED, (resolve) => (response: any) =>
  resolve(response)
)

export type ConfigurationEventTypes = ActionType<
  typeof configRequestedEvent
  | typeof configRequestedEvent
  | typeof configRequestedEvent
>
