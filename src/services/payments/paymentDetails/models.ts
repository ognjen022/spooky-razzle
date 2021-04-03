export interface PaymentDetailsState {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly isSubmitting: boolean
  readonly token: any | undefined
}

export interface PaymentDetailsRequest {
  readonly name: string | undefined
  readonly card: string | undefined
  readonly ccv: string | undefined
  readonly expiryMonth: string | undefined
  readonly expiryYear: string | undefined
  readonly address1: string | undefined
  readonly address2: string | undefined
  readonly city: string | undefined
  readonly postCode: string | undefined
  readonly country: string | undefined
}

export interface PaymentDetailsResponse {
  readonly id: string | undefined
  readonly error: string | undefined | any
  readonly errorDescription: string | undefined
  readonly token: any | undefined
}
