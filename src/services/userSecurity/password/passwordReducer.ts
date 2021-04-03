import { createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { PasswordState, PasswordResetResponse } from './models'

import * as eventTypes from './eventTypes'

const initialState: PasswordState = {
  id: undefined,
  error: undefined,
  errorDescription: undefined,
  isSubmitting: false
}

const passwordReducer: Reducer<PasswordState> = createReducer(initialState, {
  [eventTypes.USERSECURITY_PASSWORD_CHANGE_REQUESTED]: (state) => {
    return { ...initialState, isSubmitting: true }
  },
  [eventTypes.USERSECURITY_PASSWORD_CHANGE_RECEIVED]: (state, action: PayloadAction<PasswordResetResponse>) => {
    const payload = action.payload
    return { ...payload, isSubmitting: false }
  },
  [eventTypes.USERSECURITY_PASSWORD_CHANGE_ERRORED]: (state, action: PayloadAction<PasswordResetResponse>) => {
    const payload = action.payload
    return { ...payload, isSubmitting: false }
  },
})

export default passwordReducer