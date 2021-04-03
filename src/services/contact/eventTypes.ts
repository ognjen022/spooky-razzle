import { eventGroups } from '../eventGroups'

const moduleName = '@contact'
const sectionName = 'send'

export const CONTACT_SEND_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const CONTACT_SEND_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const CONTACT_SEND_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`