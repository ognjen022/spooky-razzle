import { postUnsubscribe } from '../api/postUnsubscribe';
import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { SubscriptionDetailsEventTypes, subscriptionDetailsRequestedEvent, unsubscribeReceivedEvent, unsubscribeErroredEvent, unsubscribeRequestedEvent  } from '../events'
import { RootState } from '../../../RootState'
import Notifications from 'react-notification-system-redux'


const unsubscribeReceivedEpic: Epic<SubscriptionDetailsEventTypes, SubscriptionDetailsEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(unsubscribeRequestedEvent)),
    exhaustMap(() =>
      from(postUnsubscribe()).pipe(
        exhaustMap(apiResponse => {
            if (apiResponse.is_success) {
                Notifications.success(
                    {
                      title: 'Subscription',
                      message: apiResponse.data,
                      position: 'tc',
                      autoDismiss: 10,
                      action: {
                        label: 'Close',
                        callback: () => console.log('Notification closed')
                      }
                    }
                  )
                return of (unsubscribeReceivedEvent(), subscriptionDetailsRequestedEvent());
            }
            else {
                Notifications.error(
                    {
                      title: 'Subscription',
                      message: apiResponse.data,
                      position: 'tc',
                      autoDismiss: 10,
                      action: {
                        label: 'Close',
                        callback: () => console.log('Notification closed')
                      }
                    }
                  );

                  return of(unsubscribeReceivedEvent())
            }
        }),
        catchError(() => of(unsubscribeErroredEvent({
          id: undefined,
          error: 'Network error',
          errorDescription: 'Check your internet connection'
        })))
      )
    )
  )

export default [unsubscribeReceivedEpic]
