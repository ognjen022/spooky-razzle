import { selectSeasonPassPriceFormatted } from './../../products/selectors';
import { tokenRefreshTokenRequestedEvent } from './../../../userSecurity/token/events';
import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, catchError } from 'rxjs/operators'
import { purchaseTagErroredEvent, purchaseTagReceivedEvent } from '../events'
import { RootState } from '../../../RootState'
import { postPurchaseProduct } from '../api/postPurchaseProduct'
import * as eventTypes from '../eventTypes'
import Notifications from 'react-notification-system-redux'
import { tagsSaveTagEvent } from '../../../content/tags/events'
import { selectTag } from '../../../content/tags/selectors'
import { selectSelectedStripeProductId } from '../selectors'

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

const purchaseTagRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(eventTypes.PAYMENTS_PURCHASE_TAG_REQUESTED),
    exhaustMap(() =>
      from(postPurchaseProduct(selectSelectedStripeProductId(state$.value), '', {
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

            const seasonPassPriceFormatted = selectSeasonPassPriceFormatted(state$.value);
            try {
              let data = {
                'event': 'transaction',
                'ecommerce': {
                  'purchase': {
                    'actionField': {
                      'id': tag?.stripeProductId,
                      'affiliation': 'Tag',
                      'revenue': seasonPassPriceFormatted,
                      'tax': '$0.00',
                      'shipping': '$0.00',
                      'coupon': ''
                    },
                    'products': [{
                      'name': tag?.name,
                      'id': tag?.id,
                      'price': seasonPassPriceFormatted,
                      'brand': '',
                      'category': '',
                      'variant': '',
                      'quantity': 1,
                      'coupon': ''
                    }]
                  }
                }
              };
              (window as any).dataLayer.push(data);
            } catch (err) {
              console.log('purchaseTagRequestedEpic dataLayer push error', err);
            }

            return of(tokenRefreshTokenRequestedEvent(), purchaseTagReceivedEvent(tag?.path || ''), getSuccessNotification(), tagsSaveTagEvent(state$.value.payments.purchase.tagId || '')) // todo: saved already this will unsave
          } else {
            return of(purchaseTagErroredEvent(apiResponse.data), getErrorNotification(apiResponse.data))
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

export default [purchaseTagRequestedEpic]
