import { createAction } from 'typesafe-actions'

export const networkErroredEvent = createAction('@shared/network/errored', (resolve) => (originalEvent: any, error: any) => resolve({ originalEvent, error }))
