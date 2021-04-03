import { selectProducts } from './../../config/selectors';
import { IConfigurationState } from './../../config/models';
import { SubscriptionDetailsState } from './models'
export const selectHasWatchItAll = (state: SubscriptionDetailsState, config: IConfigurationState): boolean => {
  const stripeWatchItAllProductId = selectProducts(config).watch_it_all//getStripeWatchItAllProductId()
  let result = false
  state.items?.forEach(item => {
    if (item.product_id === stripeWatchItAllProductId) result = true
  })
  return result
}
export const selectHasProduct = (state: SubscriptionDetailsState, stripeProductId: string, config: IConfigurationState): boolean => {
  const stripeWatchItAllProductId = selectProducts(config).watch_it_all// getStripeWatchItAllProductId()
  let result = false
  state.items?.forEach(item => {
    if (item.product_id === stripeWatchItAllProductId || item.product_id === stripeProductId) result = true
  })
  return result
}
export const selectError = (state: SubscriptionDetailsState): string => state.error || ''
export const selectIsSubmitting = (state: SubscriptionDetailsState): boolean => state.isSubmitting