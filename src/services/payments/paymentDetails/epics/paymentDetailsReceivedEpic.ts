import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { PaymentsDetailsEventTypes, paymentDetailsReceivedEvent } from '../events'
import { RootState } from '../../../RootState'
import { push } from 'connected-react-router'

const paymentDetailsReceivedEpic: Epic<PaymentsDetailsEventTypes, any, RootState> = (action$) =>
  action$.pipe(
    // filter(isActionOf(passwordReceivedEvent)),
    // mergeMap(() => of(push('/signup-verification')))
  )

export default [paymentDetailsReceivedEpic]
