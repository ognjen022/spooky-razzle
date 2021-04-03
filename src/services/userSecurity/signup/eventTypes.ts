import { eventGroups } from '../../eventGroups'

const moduleName = '@userSecurity'
const sectionName = 'signup'

export const USERSECURITY_SIGNUP_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const USERSECURITY_SIGNUP_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const USERSECURITY_SIGNUP_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`
