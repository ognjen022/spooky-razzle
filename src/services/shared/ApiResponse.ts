export interface ApiResponse<T> {
  readonly statusCode: number
  readonly is_success: boolean | undefined
  readonly success: boolean
  readonly data: T
  readonly message?: string | undefined
}
