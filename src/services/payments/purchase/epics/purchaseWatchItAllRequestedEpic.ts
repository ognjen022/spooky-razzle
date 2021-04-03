import { selectProducts } from './../../../config/selectors';
import { tokenRefreshTokenRequestedEvent } from './../../../userSecurity/token/events';
import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, catchError } from 'rxjs/operators'
import { purchaseTagErroredEvent, purchaseTagReceivedEvent } from '../events'
import { RootState } from '../../../RootState'
import { postPurchaseProduct } from '../api/postPurchaseProduct'
import * as eventTypes from '../eventTypes'
import Notifications from 'react-notification-system-redux'
import { selectTag } from '../../../content/tags/selectors'
import { push } from 'connected-react-router'
import { subscriptionDetailsRequestedEvent } from '../../subscriptions/events'
import { selectWatchItAllPriceFormatted } from '../../products/selectors';

const getSuccessNotification = (message: string | undefined) => {
  return Notifications.success(
    {
      title: 'Payment succeeded',
      message: message ? message : 'Enjoy your purchase',
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

const purchaseWatchItAllRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(eventTypes.PAYMENTS_PURCHASE_WATCHITALL_REQUESTED),
    exhaustMap(() =>
      from(postPurchaseProduct(selectProducts(state$.value.configuration).watch_it_all ?? '', state$.value.payments.purchase.promoCode, {
        _id: 1,
        token: state$.value.payments.paymentDetails.token.id,
        brand: state$.value.payments.paymentDetails.token.card.brand,
        last4: state$.value.payments.paymentDetails.token.card.last4,
        expiry_year: state$.value.payments.paymentDetails.token.card.exp_year,
        expiry_month: state$.value.payments.paymentDetails.token.card.exp_month
      })).pipe(
        exhaustMap(apiResponse => {
          if (apiResponse.is_success) {
            const tagId = state$.value.payments.purchase.tagId
            const tag = selectTag(state$.value, tagId)

            const watchItAllPriceFormatted = selectWatchItAllPriceFormatted(state$.value.payments.products, state$.value.configuration);
            try {
              let data = {
                'event': 'transaction',
                'ecommerce': {
                  'purchase': {
                    'actionField': {
                      'id': selectProducts(state$.value.configuration).watch_it_all,
                      'affiliation': 'WatchItAll',
                      'revenue': watchItAllPriceFormatted,
                      'tax': '$0.00',
                      'shipping': '$0.00',
                      'coupon': ''
                    },
                    'products': [{
                      'name': 'WATCH IT ALL',
                      'id': selectProducts(state$.value.configuration).watch_it_all,
                      'price': `${watchItAllPriceFormatted}`,
                      'brand': '',
                      'category': '',
                      'variant': '',
                      'quantity': 1,
                      'coupon': state$.value.payments.purchase.promoCode
                    }]
                  }
                }
              };
              (window as any).dataLayer.push(data);
            } catch (err) {
              console.log('purchaseWatchItAllRequestedEpic dataLayer.push error', err)
            }

            const routePathname = state$.value.router?.location?.pathname
            if (routePathname === '/subscribe-now') {
              return of(tokenRefreshTokenRequestedEvent(),
                purchaseTagReceivedEvent(tag?.path || ''),
                getSuccessNotification(apiResponse.message),
                push('/browse'),
                subscriptionDetailsRequestedEvent()
              )
            } else {
              return of(
                purchaseTagReceivedEvent(tag?.path || ''),
                getSuccessNotification(apiResponse.message),
                subscriptionDetailsRequestedEvent()
              )
            }

          } else {
            return of(purchaseTagErroredEvent(apiResponse.data | apiResponse.message as any), getErrorNotification(apiResponse.message as any))
          }
        }),
        catchError(() => of(purchaseTagErroredEvent({
          id: undefined,
          error: 'Network error',
          errorDescription: 'Check your internet connection'
        })))
      )
    )
  )

export default [purchaseWatchItAllRequestedEpic]
