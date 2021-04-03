import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { SubscriptionDetailsEventTypes,  subscriptionDetailsRequestedEvent, subscriptionDetailsReceivedEvent, subscriptionDetailsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getSubscriptionDetails } from '../api/getSubscriptionsSubscriptionDetails'

const subscriptionDetailsRequestedEpic: Epic<SubscriptionDetailsEventTypes, SubscriptionDetailsEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(subscriptionDetailsRequestedEvent)),
    exhaustMap(event =>
      from(getSubscriptionDetails()).pipe(
        exhaustMap(apiResponse => {
          // console.log('subscriptionDetailsRequestedEpic apiResponse', apiResponse)
          return of(subscriptionDetailsReceivedEvent(apiResponse))
        }),
        catchError(() => of(subscriptionDetailsErroredEvent({
          id: undefined,
          error: 'Network error',
          errorDescription: 'Check your internet connection'
        })))
      )
    )
  )

export default [subscriptionDetailsRequestedEpic]
