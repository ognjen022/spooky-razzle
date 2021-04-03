import { createReducer, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { TokenState, TokenResponse, TokenPasswordResetResponse } from './models'
import moment from 'moment'

import * as eventTypes from './eventTypes'
import { deleteTokens } from '../../shared/tokenLocalStorage'

const initialState: TokenState = {
  signIn: {
    accessToken: undefined,
    expiresIn: 0,
    expiry: undefined,
    idToken: undefined,
    scope: undefined,
    tokenType: undefined,
    error: undefined,
    errorDescription: undefined,
    isSubmitting: false
  },
  forgotPassword: {
    email: undefined,
    error: undefined,
    errorDescription: undefined,
    isSubmitting: false
  }
}

const tokenReducer: Reducer<TokenState> = createReducer(initialState, {
  // Reset Password Event Handlers
  [eventTypes.USERSECURITY_TOKEN_FORGOT_PASSWORD_REQUESTED]: () => {
    let signIn = initialState.signIn
    let forgotPassword = initialState.forgotPassword
    let result = {
      signIn: { ...signIn },
      forgotPassword: { ...forgotPassword, isSubmitting: true }
    }
    return result
  },
  [eventTypes.USERSECURITY_TOKEN_FORGOT_PASSWORD_RECEIVED]: (state, event: PayloadAction<TokenPasswordResetResponse>) => {
    let signIn = initialState.signIn
    let result = {
      signIn: { ...signIn },
      forgotPassword: {
        ...event.payload,
        error: 'Email sent.',
        isSubmitting: false,
        email: state.forgotPassword.email
      }
    }
    return result
  },
  [eventTypes.USERSECURITY_TOKEN_FORGOT_PASSWORD_ERRORED]: (state, event: PayloadAction<any>) => {
    let signIn = initialState.signIn
    let result = {
      signIn: { ...signIn },
      forgotPassword: {
        ...event.payload,
        isSubmitting: false,
        email: state.forgotPassword.email
      }
    }
    return result

  },

  // SignIn Event Handlers
  [eventTypes.USERSECURITY_TOKEN_REQUESTED]: () => {
    let signIn = initialState.signIn
    let forgotPassword = initialState.forgotPassword
    let result = {
      signIn: { ...signIn, isSubmitting: true },
      forgotPassword: { ...forgotPassword }
    }
    return result
  },
  [eventTypes.USERSECURITY_TOKEN_RECEIVED]: (state, event: PayloadAction<TokenResponse>) => {
    const expiry: Date = moment().add(event.payload['expires_in'], 's').toDate()
    
    let forgotPassword = initialState.forgotPassword
    const result = {
      signIn: {
        ...event.payload,
        expiry,
        isSubmitting: false
      },
      forgotPassword: { ...forgotPassword }
    }
    return result
  },
  [eventTypes.USERSECURITY_TOKEN_ERRORED]: (state, event: PayloadAction<TokenResponse>) => {
    let forgotPassword = initialState.forgotPassword
    // console.log('USERSECURITY_TOKEN_ERRORED event', event)
    const result = {
      signIn: {
        ...event.payload,
        expiry: undefined,
        isSubmitting: false
      },
      forgotPassword: { ...forgotPassword }
    }
    return result
  },
  [eventTypes.USERSECURITY_TOKEN_REFRESH_REQUESTED]: () => {
    let signIn = initialState.signIn
    let forgotPassword = initialState.forgotPassword
    let result = {
      signIn: { ...signIn },
      forgotPassword: { ...forgotPassword }
    }
    return result
  },
  // SignOut Event Handlers 
  [eventTypes.USERSECURITY_TOKEN_REMOVED]: () => {

    // TODO: move to epic
    deleteTokens()

    let result = { ...initialState }
    return result
  },
  ['TOKEN_PERSIST']: (state) => ({...state})
})

export default tokenReducer
