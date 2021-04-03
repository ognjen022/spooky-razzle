import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { TokenEventTypes, tokenPasswordResetRequestedEvent, tokenPasswordResetReceivedEvent, tokenPasswordResetErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { postUserSecurityChangePassword } from '../api/postUserSecurityChangePassword'

const tokenPasswordResetRequestedEpic: Epic<TokenEventTypes, TokenEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(tokenPasswordResetRequestedEvent)),
    exhaustMap(event =>
      from(postUserSecurityChangePassword({ email: event.payload.email })).pipe(
        exhaustMap(apiResponse =>
          of(apiResponse.statusCode === 200 ? (tokenPasswordResetReceivedEvent(apiResponse.data)) : tokenPasswordResetErroredEvent(apiResponse.data))
        ),
        catchError(() => of(tokenPasswordResetErroredEvent({
          error: 'Network error',
          errorDescription: 'Check your internet connection'
        })))
      )
    )
  )

export default [tokenPasswordResetRequestedEpic]
