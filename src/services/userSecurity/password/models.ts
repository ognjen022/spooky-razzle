export interface PasswordState {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly isSubmitting: boolean
}

export interface PasswordResetRequest {
  readonly password: string | undefined
  readonly confirmPassword: string | undefined
}

export interface PasswordResetResponse {
  readonly id: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}