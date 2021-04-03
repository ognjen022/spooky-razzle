import { eventGroups } from '../../eventGroups'

const moduleName = '@payments'
const sectionName = 'subscriptions'

export const SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`
export const SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_REQUESTED = `${moduleName}/unsubscribe/${eventGroups.REQUESTED}`
export const SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_RECEIVED = `${moduleName}/unsubscribe/${eventGroups.RECEIVED}`
export const SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_ERRORED = `${moduleName}/unsubscribe/${eventGroups.ERRORED}`
