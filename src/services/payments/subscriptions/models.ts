export interface SubscriptionDetailsState {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly isSubmitting: boolean
  readonly items: PurchaseHistory[]
}

export interface PurchaseHistory {
  readonly user_id: string | undefined
  readonly external_customer_id: string | undefined
  readonly subscriptionType: string | undefined
  readonly start: Date | undefined
  readonly end: Date | undefined
  readonly product_id: string | undefined
  readonly transaction_id: string | undefined
  readonly _Id: string | undefined
  readonly expiry: string| undefined
  tagName: string | undefined
  price: string | undefined
}

export interface SubscriptionDetailsRequest {
  readonly password: string | undefined
  readonly confirmPassword: string | undefined
}
