import { createReducer, Reducer, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductsState } from './models'
import * as eventTypes from './eventTypes'
import { ApiResponse } from '../../shared/ApiResponse'

const initialState: ProductsState = {
  list: []
}

const purchaseReducer: Reducer<ProductsState> = createReducer(initialState, {
  [eventTypes.PAYMENTS_PRODUCTS_RECEIVED]: (state, event: PayloadAction<ApiResponse<Product[]>>) => ({ ...state, list: event.payload.data }),
})

export default purchaseReducer
