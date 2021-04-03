import { createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { AccountDetailsState, AccountDetailsResponse } from './models'
import * as userSecurityEventTypes from '../../userSecurity/token/eventTypes'

import * as eventTypes from './eventTypes'

const initialState: AccountDetailsState = {
  id: undefined,
  error: undefined,
  errorDescription: undefined,
  isSubmitting: false,
  showLogin: false,
  showSignup: false,
  showForgotPassword: false,
  showWelcomePage: false,
  callBack: undefined
}

const accountDetailsReducer: Reducer<AccountDetailsState> = createReducer(initialState, {
  [userSecurityEventTypes.USERSECURITY_TOKEN_REMOVED]: (state) => ({ ...initialState }),
  [eventTypes.USERSECURITY_ACCOUNT_DETAILS_REQUESTED]: (state) => {
    return { ...initialState, isSubmitting: true }
  },
  [eventTypes.USERSECURITY_ACCOUNT_DETAILS_RECEIVED]: (state, action: PayloadAction<AccountDetailsResponse>) => {
    const payload = action.payload
    return { ...payload, isSubmitting: false, showLogin: false, showSignup: false, showForgotPassword: false, showWelcomePage: false}
  },
  [eventTypes.USERSECURITY_ACCOUNT_DETAILS_ERRORED]: (state, action: PayloadAction<AccountDetailsResponse>) => {
    const payload = action.payload
    return { ...payload, isSubmitting: false, showLogin: false, showSignup: false, showForgotPassword: false, showWelcomePage: false }
  },
  [eventTypes.USERSECURITY_TOGGLE_LOGIN]: (state, action) => {
    return { ...state, showLogin: !state.showLogin, callBack: action.payload  ?? state.callBack }
  },
  [eventTypes.USERSECURITY_TOGGLE_SIGNUP]: (state, action) => {
    return { ...state, showSignup: !state.showSignup, callBack: action.payload  ?? state.callBack }
  },
  [eventTypes.USERSECURITY_TOGGLE_FORGOTPASSWORD]: (state) => {
    return { ...state, showForgotPassword: !state.showForgotPassword }
  },
  [eventTypes.USERSECURITY_TOGGLE_WELCOME]: (state) => {
    return { ...state, showWelcomePage: !state.showWelcomePage }
  }
})

export default accountDetailsReducer