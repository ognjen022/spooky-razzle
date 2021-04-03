export interface ProfileState {
  readonly id: string | null
  readonly name: string | null
  readonly email: string | null
  readonly phone: string | null
  readonly metadata: ProfileMetaData | null
  readonly address: ProfileAddress | null
  readonly cardInfo: ProfileCardInfo | null
}

export interface ProfileResponse {
  readonly id: string | null
  readonly name: string | null
  readonly email: string | null
  readonly phone: string | null
  readonly metadata: ProfileMetaData | null
  readonly address: ProfileAddress | null
  readonly cardInfo: ProfileCardInfo | null
}


export interface ProfileMetaData {
  readonly FirstName: string | null
  readonly LastName: string | null
}

export interface ProfileAddress {
  readonly line1: string | null
  readonly line2: string | null
  readonly city: string | null
  readonly postal_code: string | null
  readonly country: string | null
  readonly state: string | null
}

export interface ProfileCardInfo {
  readonly name: string | undefined
  readonly number: string | undefined
  readonly cvc: string | undefined
  readonly brand: string | undefined
  readonly last4: string | undefined
  readonly exp_month: string | undefined
  readonly exp_year: string | undefined
  readonly address_line1: string | undefined
  readonly address_line2: string | undefined
  readonly address_city: string | undefined
  readonly address_zip: string | undefined
  readonly address_country: string | undefined
}
