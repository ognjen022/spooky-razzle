import { createReducer, Reducer } from '@reduxjs/toolkit'
import { PurchaseState, PurchaseOption, PromoInformation } from './models'
import { Event } from '../../eventGroups'

import * as eventTypes from './eventTypes'
import * as userSecurityEventTypes from '../../userSecurity/token/eventTypes'
import { act } from 'react-dom/test-utils'

const initialState: PurchaseState = {
  showModal: false,
  tagInfo: {},
  purchaseOption: PurchaseOption.WatchItAll,
  tagId: undefined,
  eventId: undefined,
  isSaving: false,
  cardToken: undefined,
  promoCode: undefined,
  promoCoupon : undefined,
  checkingPromo: false
}

const purchaseReducer: Reducer<PurchaseState> = createReducer(initialState, {
  [userSecurityEventTypes.USERSECURITY_TOKEN_REMOVED]: (state) => ({ ...initialState }),
  [eventTypes.PAYMENTS_PURCHASE_SHOWMODAL_TOGGLED]: (state, action: Event<any>) => ({
    ...state,
    showModal: !state.showModal,
    isSaving: !state.showModal ? false : state.isSaving,
    tagInfo: {
      tagStripeProductId: action.payload?.value?.tagInfo?.stripeProductId,
      pricing: action.payload?.value?.tagInfo?.pricing,
    },
    tagId: action.payload.value.tagId,
    eventId: action.payload.value.eventId
  }),
  [eventTypes.PAYMENTS_PURCHASE_TAG_REQUESTED]: (state, action: Event<any>) => {
    return { ...state, cardToken: action.payload.value, isSaving: true }
  },
  [eventTypes.PAYMENTS_PURCHASE_WATCHITALL_REQUESTED]: (state, action: Event<any>) => {
    return { ...state, cardToken: action.payload.value.cardToken, promoCode: action.payload.value.promoCode, isSaving: true }
  },
  [eventTypes.PAYMENTS_PURCHASE_GAMEPASS_REQUESTED]: (state, action: Event<any>) => {
    return { ...state, cardToken: action.payload.value, isSaving: true }
  },
  [eventTypes.PAYMENTS_PURCHASE_TAG_RECEIVED]: (state) => ({ ...initialState, tagId: state.tagId }),
  [eventTypes.PAYMENTS_PURCHASE_TAG_ERRORED]: (state, action: Event<any>) => {
    return { ...state, cardToken: undefined, promoCode: undefined, isSaving: false }
  },
  [eventTypes.PAYMENTS_PURCHASE_PROMOCODE_REQUESTED]: (state) => {
    return { ...state, checkingPromo: true}
  },
  [eventTypes.PAYMENTS_PURCHASE_PROMOCODE_RECEIVED]: (state, action: any) => {
    return { ...state, promoCoupon: action.payload, checkingPromo: false}
  },
  [eventTypes.PAYMENTS_PURCHASE_PROMOCODE_ERRORED]: (state, action: any) => {
    return { ...state, promoCoupon: {error: 'Invalid promo code' }, checkingPromo: false}
  }
})

export default purchaseReducer
