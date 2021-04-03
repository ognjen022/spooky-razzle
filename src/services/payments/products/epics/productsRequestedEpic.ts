import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, catchError } from 'rxjs/operators'
import * as contentTagsEventTypes from '../../../content/tags/eventTypes'

import { paymentsProductsReceivedEvent, paymentsProductsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { ApiResponse } from '../../../shared/ApiResponse'
import { Product } from '../models'
import { getProductsList } from '../api/getProductsList'

const productsRequestedEpic: Epic<any, any, RootState> = (action$, store) =>
  action$.pipe(
    ofType(contentTagsEventTypes.CONTENT_TAGS_REQUESTED),
    exhaustMap(() =>
      from(getProductsList()).pipe(
        exhaustMap((apiResponse: ApiResponse<Product[]>) => {
          return of(paymentsProductsReceivedEvent(apiResponse))
        }),
        catchError(() => of(paymentsProductsErroredEvent({
          data: [],
          is_success: false,
          statusCode: 500,
          success: false
        })))
      )
    )
  )

export default [productsRequestedEpic]
