import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { paymentDetailsRequestedEvent, paymentDetailsReceivedEvent, paymentDetailsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getPaymentsPaymentDetails } from '../api/getPaymentsPaymentDetails'
import { profileRequestedEvent } from '../../../userSecurity/profile/events'
import Notifications from 'react-notification-system-redux'


const getSuccessNotification = () => {
  return Notifications.success(
    {
      title: 'Saved',
      message: 'Your payment details have been updated',
      position: 'tc',
      autoDismiss: 10,
      action: {
        label: 'Close',
        callback: () => console.log('Notification closed')
      }
    }
  )
}

const getErrorNotification = () => {
  return Notifications.error(
    {
      title: 'Error',
      message: 'Your payment details have not been updated',
      position: 'tc',
      autoDismiss: 10,
      action: {
        label: 'Close',
        callback: () => console.log('Notification closed')
      }
    }
  )
}

const paymentDetailsRequestedEpic: Epic<any, any, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(paymentDetailsRequestedEvent)),
    exhaustMap(event =>
      from(getPaymentsPaymentDetails({
        name: event.payload.name,
        card: event.payload.card,
        ccv: event.payload.ccv,
        expiryMonth: event.payload.expiryMonth,
        expiryYear: event.payload.expiryYear,
        address1: event.payload.address1,
        address2: event.payload.address2,
        city: event.payload.city,
        postCode: event.payload.postCode,
        country: event.payload.country,
      })).pipe(
        exhaustMap(apiResponse => {
          console.log('[paymentDetailsRequestedEpic apiResponse]', apiResponse)
          return apiResponse.statusCode
            ? of(
              paymentDetailsReceivedEvent(apiResponse.data),
              profileRequestedEvent(),
              getSuccessNotification()
            ) : of(
              paymentDetailsErroredEvent(apiResponse.data),
              getErrorNotification()
            )
        }),
        catchError(() => of(paymentDetailsErroredEvent({
          id: undefined,
          error: 'Network error',
          errorDescription: 'Check your internet connection',
          token: undefined
        })))
      )
    )
  )

export default [paymentDetailsRequestedEpic]
