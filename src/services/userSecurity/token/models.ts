export interface SignInState {
  readonly accessToken: string | undefined
  readonly idToken: string | undefined
  readonly scope: string | undefined
  readonly expiresIn: number
  readonly expiry: Date | undefined
  readonly tokenType: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly isSubmitting: boolean
  readonly passwordReset?: TokenPasswordResetResponse
}

export interface forgotPasswordState {
  readonly email: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly isSubmitting: boolean
}

export interface TokenState {
  readonly signIn: SignInState,
  readonly forgotPassword: forgotPasswordState
}

export interface TokenRequest {
  readonly username: string
  readonly password: string
  readonly redirectTo: string | undefined
}

export interface TokenResponse {
  readonly accessToken: string | undefined
  readonly idToken: string | undefined
  readonly scope: string | undefined
  readonly expiresIn: number
  readonly expiry: Date | undefined
  readonly tokenType: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly refreshToken: string | undefined
  readonly redirectTo: string | undefined
}

export interface TokenPasswordResetRequest {
  readonly email: string | undefined
}

export interface TokenPasswordResetResponse {
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}