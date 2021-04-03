import { createAction } from 'typesafe-actions';
import * as eventTypes from './eventTypes'
import { Event } from '../../eventGroups'
import { PromoInformation } from './models'

export const showPurchaseModalToggledEvent = (tagInfo: any | undefined, tagId: string | undefined, eventId: number | undefined): Event<any> => ({
  type: eventTypes.PAYMENTS_PURCHASE_SHOWMODAL_TOGGLED,
  payload: {
    value: {
      tagInfo,
      tagId,
      eventId
    }
  }
})

export const purchaseWatchItAllRequestedEvent = (promoCode: string, cardToken: any): Event<any> => ({
  type: eventTypes.PAYMENTS_PURCHASE_WATCHITALL_REQUESTED,
  payload: {
    value: {
      promoCode: promoCode,
      cardToken: cardToken
    }
  }
})

export const purchaseGamePassRequestedEvent = (cardToken: any): Event<any> => ({
  type: eventTypes.PAYMENTS_PURCHASE_GAMEPASS_REQUESTED,
  payload: {
    value: cardToken
  }
})

export const purchaseTagRequestedEvent = (cardToken: any): Event<any> => ({
  type: eventTypes.PAYMENTS_PURCHASE_TAG_REQUESTED,
  payload: {
    value: cardToken
  }
})

export const purchaseTagReceivedEvent = (tagPath: string): Event<string> => ({
  type: eventTypes.PAYMENTS_PURCHASE_TAG_RECEIVED,
  payload: {
    value: tagPath
  }
})

export const purchaseTagErroredEvent = (error: any): Event<any> => ({
  type: eventTypes.PAYMENTS_PURCHASE_TAG_ERRORED,
  payload: {
    value: error
  }
})

export const promoRequestedEvent = createAction(
  eventTypes.PAYMENTS_PURCHASE_PROMOCODE_REQUESTED,
  (resolve) => (promoCode: string, productPrice: any) => resolve({
    promoCode,
    productPrice
  })
);

export const promoReceivedEvent = createAction(
  eventTypes.PAYMENTS_PURCHASE_PROMOCODE_RECEIVED,
  (resolve) => (promoInformation: PromoInformation) => resolve(promoInformation)
);


export const promoErroedEvent = createAction(
  eventTypes.PAYMENTS_PURCHASE_PROMOCODE_ERRORED,
  (resolve) => (error: any) => resolve(error)
);


