import { USERSECURITY_ACCOUNT_DETAILS_ERRORED } from './../accountDetails/eventTypes';
import { eventGroups } from '../../eventGroups'

const moduleName = '@userSecurity'
const sectionName = 'token'

export const USERSECURITY_TOKEN_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const USERSECURITY_TOKEN_FORGOT_PASSWORD_REQUESTED = `${moduleName}/${sectionName}/password-reset/${eventGroups.REQUESTED}`
export const USERSECURITY_TOKEN_FORGOT_PASSWORD_RECEIVED = `${moduleName}/${sectionName}/password-reset/${eventGroups.RECEIVED}`
export const USERSECURITY_TOKEN_FORGOT_PASSWORD_ERRORED = `${moduleName}/${sectionName}/password-reset/${eventGroups.ERRORED}`
export const USERSECURITY_TOKEN_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const USERSECURITY_TOKEN_REMOVED = `${moduleName}/${sectionName}/${eventGroups.REMOVED}`
export const USERSECURITY_TOKEN_TOGGLED = `${moduleName}/${sectionName}/${eventGroups.TOGGLED}`
export const USERSECURITY_TOKEN_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`
export const USERSECURITY_TOKEN_REFRESH_REQUESTED = `${moduleName}/${sectionName}/refresh/${eventGroups.REQUESTED}`
