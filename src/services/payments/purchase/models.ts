export interface PurchaseState {
  readonly showModal: boolean
  readonly tagInfo: any | undefined
  readonly purchaseOption: PurchaseOption
  readonly tagId: string | undefined
  readonly eventId: number | undefined
  readonly cardToken: any | undefined
  readonly isSaving: boolean,
  readonly checkingPromo: boolean,
  readonly promoCode: string | undefined
  readonly promoCoupon: PromoInformation | undefined
}

export interface PromoInformation {
  readonly priceAfter?: string | undefined;
  readonly nextPayment?: string | undefined;
  readonly error?: string | undefined
}

export enum PurchaseOption {
  GamePass,
  WatchItAll,
  SeasonPass
}
