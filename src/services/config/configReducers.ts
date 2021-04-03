import { IConfigurationState, IConfigurationResponse } from './models';
import { createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'

import * as configEventTypes from './eventTypes'

const initialState: IConfigurationState = {
  auth0_client_id: undefined,
  stripe_key: undefined,
  instrumentation_key: undefined,
  products: undefined
}

const configReducer: Reducer<IConfigurationState> = createReducer(initialState, {
    [configEventTypes.CONFIG_RECEIVED]: (state: IConfigurationState, action: PayloadAction<IConfigurationResponse>) => ({
      ...state, 
      products: { 
        game_pass: action.payload.game_pass_product_id,
        watch_it_all: action.payload.watch_it_all_product_id
      },
      auth0_client_id: action.payload.auth0_client_id,
      stripe_key: action.payload.stripe_key,
      instrumentation_key: action.payload.instrumentation_key
      })
    ,
    [configEventTypes.CONFIG_ERRORED]: (state, action: PayloadAction<any>) => ({ ...action.payload })
})
export default configReducer