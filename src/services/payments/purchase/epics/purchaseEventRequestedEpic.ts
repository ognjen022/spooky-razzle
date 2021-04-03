import { selectGamePassPriceFormatted } from './../../products/selectors';
import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, catchError } from 'rxjs/operators'
import { purchaseTagErroredEvent, purchaseTagReceivedEvent } from '../events'
import { RootState } from '../../../RootState'
import { postPurchaseEvent } from '../api/postPurchaseEvent'
import * as eventTypes from '../eventTypes'
import Notifications from 'react-notification-system-redux'
import { tagsSaveStreamEvent } from '../../../content/tags/events'
import { selectTag } from '../../../content/tags/selectors'
import { IStream } from '../../../content/tags/models'
import * as _ from 'lodash'
import { tokenRefreshTokenRequestedEvent } from '../../../userSecurity/token/events'

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

const lookupLivestreamEventId = (streams: IStream[], eventId: number | undefined): string => {
  const match: IStream = _.find(streams, (stream: IStream) => stream.eventId === eventId)

  if (match && match.videoStreams && match.videoStreams.length > 0) {
    return match.videoStreams[0].liveStreamEventId
  }

  return ''
}

const purchaseEventRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(eventTypes.PAYMENTS_PURCHASE_GAMEPASS_REQUESTED),
    exhaustMap(() =>
      from(postPurchaseEvent(lookupLivestreamEventId(state$.value.content.tags.streams || [], state$.value.payments.purchase.eventId), {
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
            let livestreamEventId = lookupLivestreamEventId(state$.value.content.tags.streams || [], state$.value.payments.purchase.eventId)

            const gamePassPriceFormatted = selectGamePassPriceFormatted(state$.value.payments?.products, state$.value.configuration);
            try {
              let data = {
                'event': 'transaction',
                'ecommerce': {
                  'purchase': {
                    'actionField': {
                      'id': livestreamEventId,
                      'affiliation': 'Game Pass',
                      'revenue': gamePassPriceFormatted,
                      'tax': '$0.00',
                      'shipping': '$0.00',
                      'coupon': ''
                    },
                    'products': [{
                      'name': `GAME PASS - ${livestreamEventId}`,
                      'id': livestreamEventId,
                      'price': gamePassPriceFormatted,
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
              console.log('purchaseEventRequestedEpic dataLayer push error', err)
            }
            
            return of(tokenRefreshTokenRequestedEvent(), purchaseTagReceivedEvent(tag?.path || ''), getSuccessNotification(), tagsSaveStreamEvent(state$.value.payments.purchase.eventId || 0)) // todo: saved already this will unsave
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

export default [purchaseEventRequestedEpic]
