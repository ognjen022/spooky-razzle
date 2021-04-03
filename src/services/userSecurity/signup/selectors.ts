import { SignupState } from './models'

export const selectError = (state: SignupState): string => state.error || ''
export const selectIsSubmitting = (state: SignupState): boolean => state.isSubmitting
