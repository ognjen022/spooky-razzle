import { eventGroups } from '../../eventGroups'

const moduleName = '@payments'
const sectionName = 'purchase'

export const PAYMENTS_PURCHASE_SHOWMODAL_TOGGLED = `${moduleName}/${sectionName}/showmodal/${eventGroups.TOGGLED}`
export const PAYMENTS_PURCHASE_TAG_REQUESTED = `${moduleName}/${sectionName}/tag/${eventGroups.REQUESTED}`
export const PAYMENTS_PURCHASE_WATCHITALL_REQUESTED = `${moduleName}/${sectionName}/watchitall/${eventGroups.REQUESTED}`
export const PAYMENTS_PURCHASE_GAMEPASS_REQUESTED = `${moduleName}/${sectionName}/gamepass/${eventGroups.REQUESTED}`
export const PAYMENTS_PURCHASE_TAG_RECEIVED = `${moduleName}/${sectionName}/tag/${eventGroups.RECEIVED}`
export const PAYMENTS_PURCHASE_TAG_ERRORED = `${moduleName}/${sectionName}/tag/${eventGroups.ERRORED}`


export const PAYMENTS_PURCHASE_PROMOCODE_REQUESTED = `${moduleName}/${sectionName}/promocode/${eventGroups.REQUESTED}`
export const PAYMENTS_PURCHASE_PROMOCODE_RECEIVED = `${moduleName}/${sectionName}/promocode/${eventGroups.RECEIVED}`
export const PAYMENTS_PURCHASE_PROMOCODE_ERRORED = `${moduleName}/${sectionName}/promocode/${eventGroups.ERRORED}`