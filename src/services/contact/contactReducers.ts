import { Reducer, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IContactUsState, IContactUsResponse } from './models';
import * as eventTypes from './eventTypes'


const initialState: IContactUsState = {
    contactUsData: {
        firstName: undefined,
        email : undefined,
        lastName : undefined,
        message : undefined
    },
    error: undefined,
    errorDescription: undefined,
    isSending: false
}
  
  const contactUsReducer: Reducer<IContactUsState> = createReducer(initialState, {
    [eventTypes.CONTACT_SEND_REQUESTED]: (state) => ({ ...initialState, isSending: true }),
    [eventTypes.CONTACT_SEND_RECEIVED]: (state, action: PayloadAction<IContactUsResponse>) => ({ ...action.payload, isSending: false }),
    [eventTypes.CONTACT_SEND_ERRORED]: (state, action: PayloadAction<IContactUsResponse>) => ({ ...action.payload, isSending: false }),
  })
  
  export default contactUsReducer