export interface SignupState {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly isSubmitting: boolean
}

export interface SignupResponse {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}