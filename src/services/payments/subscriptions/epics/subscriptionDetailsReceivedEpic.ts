import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { SubscriptionDetailsEventTypes, subscriptionDetailsReceivedEvent } from '../events'
import { RootState } from '../../../RootState'
import { push } from 'connected-react-router'

const subscriptionDetailsReceivedEpic: Epic<SubscriptionDetailsEventTypes, any, RootState> = (action$) =>
  action$.pipe(
    // filter(isActionOf(passwordReceivedEvent)),
    // mergeMap(() => of(push('/signup-verification')))
  )

export default [subscriptionDetailsReceivedEpic]
