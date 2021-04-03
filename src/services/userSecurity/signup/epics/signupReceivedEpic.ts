import { accountToggleSignupEvent } from './../../accountDetails/events';
import { Epic } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { SignupEventTypes, signupReceivedEvent } from '../events'
import { RootState } from '../../../RootState'
import { push } from 'connected-react-router'

const signupReceivedEpic: Epic<SignupEventTypes, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(signupReceivedEvent)),
    mergeMap(() => 
      EMPTY

    )
  )

export default [signupReceivedEpic]
