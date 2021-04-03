import { PaymentDetailsState } from './paymentDetails/models'
import { SubscriptionDetailsState } from './subscriptions/models'
import { PurchaseState } from './purchase/models'
import { ProductsState } from './products/models'

export interface IPaymentsState {
  readonly paymentDetails: PaymentDetailsState
  readonly subscriptions: SubscriptionDetailsState
  readonly purchase: PurchaseState
  readonly products: ProductsState
}
