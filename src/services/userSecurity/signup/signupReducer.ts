import { createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { SignupState, SignupResponse } from './models'
import * as userSecurityEventTypes from '../../userSecurity/token/eventTypes'

import * as eventTypes from './eventTypes'

const initialState: SignupState = {
  id: undefined,
  error: undefined,
  errorDescription: undefined,
  isSubmitting: false
}

const signupReducer: Reducer<SignupState> = createReducer(initialState, {
  [userSecurityEventTypes.USERSECURITY_TOKEN_REMOVED]: (state) => ({ ...initialState }),
  [eventTypes.USERSECURITY_SIGNUP_REQUESTED]: (state) => ({ ...initialState, isSubmitting: true }),
  [eventTypes.USERSECURITY_SIGNUP_RECEIVED]: (state, action: PayloadAction<SignupResponse>) => ({ ...action.payload, isSubmitting: false }),
  [eventTypes.USERSECURITY_SIGNUP_ERRORED]: (state, action: PayloadAction<SignupResponse>) => ({ ...action.payload, isSubmitting: false }),
})

export default signupReducer
