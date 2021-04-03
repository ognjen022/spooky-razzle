import { selectGamePassPriceFormatted } from './../../products/selectors';
import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, catchError } from 'rxjs/operators'
import { promoErroedEvent, promoReceivedEvent, purchaseTagErroredEvent, purchaseTagReceivedEvent } from '../events'
import { RootState } from '../../../RootState'
import * as eventTypes from '../eventTypes'
import { tagsSaveStreamEvent } from '../../../content/tags/events'
import { selectTag } from '../../../content/tags/selectors'
import * as _ from 'lodash'
import { tokenRefreshTokenRequestedEvent } from '../../../userSecurity/token/events'
import { getPromoCode } from '../api/getPromoCode';

import Notifications from 'react-notification-system-redux'

const getSuccessNotification = () => {
    return Notifications.success(
      {
        title: 'Payment succeeded',
        message: 'Enjoy your purchase',
        position: 'tc',
        autoDismiss: 10,
        action: {
          label: 'Close',
          callback: () => console.log('Notification closed')
        }
      }
    )
  }
  
  const getErrorNotification = (error: any) => {
    return Notifications.error(
      {
        title: 'Payment failed',
        message: `An error occurred ${error}`,
        position: 'tc',
        autoDismiss: 10,
        action: {
          label: 'Close',
          callback: () => console.log('Notification closed')
        }
      }
    )
  }

const promoCodeRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(eventTypes.PAYMENTS_PURCHASE_PROMOCODE_REQUESTED),
    exhaustMap(event =>
      {
        if (event.payload.promoCode === '') {
          return of(promoReceivedEvent({}))
        }
        return from(getPromoCode(event.payload.promoCode, event.payload.productPrice)).pipe(
          exhaustMap(apiResponse => {
            if (apiResponse.is_success) {
              
              return of(promoReceivedEvent(apiResponse.data));
            } else {
              return of(promoErroedEvent({
                error: 'Request error',
                errorDescription: apiResponse.data.message
              }), getErrorNotification(apiResponse.data))
            }
          }),
          catchError(() => of(promoErroedEvent({
            id: undefined,
            error: 'Network error',
            errorDescription: 'Check your internet connection'
          })))
        )
      }
    )
  )

export default [promoCodeRequestedEpic]
