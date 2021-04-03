import { createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { PaymentDetailsState, PaymentDetailsResponse } from './models'
import * as userSecurityEventTypes from '../../userSecurity/token/eventTypes'

import * as eventTypes from './eventTypes'

const initialState: PaymentDetailsState = {
  id: undefined,
  error: undefined,
  errorDescription: undefined,
  isSubmitting: false,
  token: undefined
}

const paymentsReducer: Reducer<PaymentDetailsState> = createReducer(initialState, {
  [userSecurityEventTypes.USERSECURITY_TOKEN_REMOVED]: (state) => ({ ...initialState }),
  [eventTypes.PAYMENTS_PAYMENT_DETAILS_REQUESTED]: (state) => ({ ...initialState, isSubmitting: true }),
  [eventTypes.PAYMENTS_PAYMENT_DETAILS_RECEIVED]: (state, action: PayloadAction<PaymentDetailsResponse>) => ({ ...action.payload, isSubmitting: false }),
  [eventTypes.PAYMENTS_PAYMENT_DETAILS_ERRORED]: (state, action: PayloadAction<PaymentDetailsResponse>) => ({ ...action.payload, isSubmitting: false }),
})

export default paymentsReducer