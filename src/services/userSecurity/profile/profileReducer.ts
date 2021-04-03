import { createReducer, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { ProfileState, ProfileResponse } from './models'

import * as eventTypes from './eventTypes'
import * as tokenEventTypes from '../token/eventTypes'
import * as userSecurityEventTypes from '../../userSecurity/token/eventTypes'

const initialState: ProfileState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  metadata: null,
  address: null,
  cardInfo: null
  // email: null,
  // emailVerified: null,
  // error: null,
  // errorDescription: null,
  // name: null,
  // nickname: null,
  // picture: null,
  // sub: null,
  // updatedAt: null
}

const tokenReducer: Reducer<ProfileState> = createReducer(initialState, {
  [userSecurityEventTypes.USERSECURITY_TOKEN_REMOVED]: (state) => ({ ...initialState }),
  [eventTypes.USERSECURITY_PROFILE_RECEIVED]: (state, action: PayloadAction<ProfileResponse>) => {
    const payload = action.payload
    const result = {
      ...payload,
    }
    return result
  },
  [tokenEventTypes.USERSECURITY_TOKEN_REMOVED]: () => {
    return { ...initialState }
  },
})

export default tokenReducer
