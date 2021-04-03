import { IContactUsState } from './models'

export const selectContactUsError = (state: IContactUsState): string => state.error || ''
export const selectContactUsIsSending = (state: IContactUsState): boolean => state.isSending
