import { eventGroups } from '../../eventGroups'

const moduleName = '@payments'
const sectionName = 'products'

export const PAYMENTS_PRODUCTS_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const PAYMENTS_PRODUCTS_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const PAYMENTS_PRODUCTS_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`