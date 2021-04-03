import { eventGroups } from '../../eventGroups'

const moduleName = '@userSecurity'
const sectionName = 'accountDetails'

export const USERSECURITY_ACCOUNT_DETAILS_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const USERSECURITY_ACCOUNT_DETAILS_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const USERSECURITY_ACCOUNT_DETAILS_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`



export const USERSECURITY_TOGGLE_LOGIN = `${moduleName}/showLogin`
export const USERSECURITY_TOGGLE_SIGNUP = `${moduleName}/showSignup`
export const USERSECURITY_TOGGLE_FORGOTPASSWORD = `${moduleName}/showForgotPassword`
export const USERSECURITY_TOGGLE_WELCOME = `${moduleName}/showWelcomePage`
export const USERSECURITY_EXECUTE_CALLBACK = `${moduleName}/executeCallback`