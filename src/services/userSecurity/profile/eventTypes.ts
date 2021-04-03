import { eventGroups } from '../../eventGroups'

const moduleName = '@userSecurity'
const sectionName = 'profile'

export const USERSECURITY_PROFILE_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const USERSECURITY_PROFILE_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const USERSECURITY_PROFILE_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`