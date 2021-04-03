import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { PasswordEventTypes, passwordUpdateRequestedEvent, passwordReceivedEvent, passwordErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { postUserSecurityUpdatePassword } from '../api/postUserSecurityUpdatePassword'

const passwordResetRequestedEpic: Epic<PasswordEventTypes, PasswordEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(passwordUpdateRequestedEvent)),
    exhaustMap(event =>
      from(postUserSecurityUpdatePassword({ password: event.payload.password, confirmPassword: event.payload.confirmPassword })).pipe(
        exhaustMap(apiResponse => 
          of(apiResponse.statusCode === 200 ? passwordReceivedEvent(apiResponse.data) : passwordErroredEvent(apiResponse.data))
        ),
        catchError(() => of(passwordErroredEvent({
          id: undefined,
          error: 'Network error',
          errorDescription: 'Check your internet connection'
        })))
      )
    )
  )

export default [passwordResetRequestedEpic]
