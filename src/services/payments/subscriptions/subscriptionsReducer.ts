import { createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { SubscriptionDetailsState, PurchaseHistory } from './models'

import * as eventTypes from './eventTypes'
import * as userSecurityEventTypes from '../../userSecurity/token/eventTypes'

const initialState: SubscriptionDetailsState = {
  id: undefined,
  error: undefined,
  errorDescription: undefined,
  isSubmitting: false,
  items: []
}


const subscriptionsReducer: Reducer<SubscriptionDetailsState> = createReducer(initialState, {
  [userSecurityEventTypes.USERSECURITY_TOKEN_REMOVED]: (state) => ({ ...initialState }),
  [eventTypes.SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_REQUESTED]: (state) => ({ ...initialState, isSubmitting: true }),
  [eventTypes.SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_RECEIVED]: (state, action: PayloadAction<PurchaseHistory[]>) => (
    { ...state, items: action.payload, isSubmitting: false }
  ),
  [eventTypes.SUBSCRIPTIONS_SUBSCRIPTION_DETAILS_ERRORED]: (state, action: PayloadAction<any>) => (
    {
      ...state,
      items: [],
      isSubmitting: false
    }
  ),
  [eventTypes.SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_REQUESTED]: (state) => ({...state, isSubmitting:true}),
  [eventTypes.SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_RECEIVED]: (state) => ({...state, isSubmitting:false}),
  [eventTypes.SUBSCRIPTIONS_UNSUBSCRIPTION_DETAILS_ERRORED]: (state, action: PayloadAction<any>) => ({
    
    ...state,
    isSubmitting: false
  })
})

export default subscriptionsReducer