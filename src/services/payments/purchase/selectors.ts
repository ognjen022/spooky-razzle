import { PromoInformation, PurchaseState } from './models'
import { RootState } from '../../RootState'
import { selectTag } from '../../content/tags/selectors'

export const selectShowModal = (state: PurchaseState): boolean => state.showModal
export const selectTagStripeProductId = (state: PurchaseState): string | undefined => state.tagInfo

export const isSeasonPass = (state: PurchaseState): boolean => state.tagId !== undefined && state.tagId !== null;

export const isGamePass = (state: PurchaseState): boolean => state.eventId !== undefined && state.eventId !== null;

export const selectSelectedStripeProductId = (state: RootState): string => {

  let result = ''

  let selectedTagId = state.payments.purchase.tagId
  if (selectedTagId) {
    let tag = selectTag(state, selectedTagId)
    if (tag?.stripeProductId) {
      result = tag.stripeProductId
    }
  }

  return result
}

export const selectPromoCode = (state:PurchaseState): PromoInformation | undefined  => state.promoCoupon;