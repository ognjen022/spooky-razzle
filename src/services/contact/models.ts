export interface IContactUs {
    firstName: string | undefined
    lastName: string | undefined
    email: string | undefined
    message: string | undefined
}
export interface IContactUsState {
    contactUsData: IContactUs | undefined
    error: string | undefined
    errorDescription: string | undefined
    isSending: boolean
}

export interface IContactUsResponse {
  readonly contactUsData: IContactUs | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}

  
  
  