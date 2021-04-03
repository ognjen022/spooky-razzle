import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { TokenEventTypes, tokenRequestedEvent, tokenReceivedEvent, tokenErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { postUserSecurityLogin } from '../api/postUserSecurityLogin'

const tokenRequestedEpic: Epic<TokenEventTypes, TokenEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(tokenRequestedEvent)),
    exhaustMap(event =>
      from(postUserSecurityLogin(event.payload.username, event.payload.password)).pipe(
        exhaustMap(apiResponse =>
          of(apiResponse.statusCode === 200 ? tokenReceivedEvent({ ...apiResponse.data, redirectTo: event.payload.redirectTo }) : tokenErroredEvent(apiResponse.data))
        ),
        catchError(error => {
          // console.log('tokenRequestedEpic error', error)
          return of(tokenErroredEvent({
            accessToken: undefined,
            expiresIn: 0,
            expiry: undefined,
            idToken: undefined,
            scope: undefined,
            tokenType: undefined,
            error: 'Network error',
            errorDescription: 'Check your internet connection',
            refreshToken: undefined,
            redirectTo: undefined,
          }))
        }
        )
      )
    )
  )

export default [tokenRequestedEpic]
