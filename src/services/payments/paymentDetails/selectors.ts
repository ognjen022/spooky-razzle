import { PaymentDetailsState } from './models'

export const selectError = (state: PaymentDetailsState): string => state.error || ''
export const selectIsSubmitting = (state: PaymentDetailsState): boolean => state.isSubmitting
