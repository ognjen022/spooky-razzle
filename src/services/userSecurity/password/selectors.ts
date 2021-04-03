import { PasswordState } from './models'

export const selectError = (state: PasswordState): string => state.error || ''
export const selectIsSubmitting = (state: PasswordState): boolean => state.isSubmitting