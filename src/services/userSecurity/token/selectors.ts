import { stat } from 'fs'
import moment from 'moment';
import { TokenState } from './models'

export const selectIsLoggedIn = (state: TokenState): boolean =>
    (state.signIn['access_token'] !== null && state.signIn['access_token'] !== undefined) // normal login
    || (state.signIn.accessToken !== null && state.signIn.accessToken !== undefined)

export const selectIsTokenValid = (state: TokenState): boolean =>
    state.signIn.expiry !== undefined ? new Date(state.signIn.expiry) >= new Date(): true


export const selectSignInError = (state: TokenState): string => state.signIn.error || ''
export const selectSignInIsSubmitting = (state: TokenState): boolean => state.signIn.isSubmitting

export const selectForgotPasswordError = (state: TokenState): string => state.forgotPassword.error || ''
export const selectForgotPasswordIsSubmitting = (state: TokenState): boolean => state.forgotPassword.isSubmitting

