import { eventGroups } from '../../eventGroups'

const moduleName = '@userSecurity'
const sectionName = 'password'

export const USERSECURITY_PASSWORD_CHANGE_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const USERSECURITY_PASSWORD_CHANGE_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const USERSECURITY_PASSWORD_CHANGE_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`
