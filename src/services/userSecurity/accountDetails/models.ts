
export interface AccountDetailsState {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly isSubmitting: boolean
  readonly showLogin: boolean
  readonly showSignup: boolean
  readonly showForgotPassword: boolean
  readonly showWelcomePage: boolean
  readonly callBack?: () => void
}

export interface AccountDetailsResponse {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}

export interface AccountDetailsRequest {
  readonly firstName: string | undefined
  readonly lastName: string | undefined
  readonly email: string | undefined
  readonly phone: string | undefined
}