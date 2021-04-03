import { eventGroups } from '../../eventGroups'

const moduleName = '@payments'
const sectionName = 'paymentDetails'

export const PAYMENTS_PAYMENT_DETAILS_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const PAYMENTS_PAYMENT_DETAILS_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const PAYMENTS_PAYMENT_DETAILS_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`
