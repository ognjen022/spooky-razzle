import { AccountDetailsState } from './models'

export const selectError = (state: AccountDetailsState): string => state.error || ''
export const selectIsSubmitting = (state: AccountDetailsState): boolean => state.isSubmitting