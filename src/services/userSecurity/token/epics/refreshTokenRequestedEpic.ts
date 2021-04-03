import { USERSECURITY_TOKEN_REFRESH_REQUESTED } from './../eventTypes';
import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, catchError } from 'rxjs/operators'
import { tokenReceivedEvent, tokenErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { postUpdateToken } from '../api/postUpdateToken'
import * as purchaseEventTypes from '../../../payments/purchase/eventTypes'
import { getRefreshToken } from '../../../shared/tokenLocalStorage'
import { Event } from '../../../eventGroups'

const refreshTokenRequestedEpic: Epic<any, any, RootState> = (action$) =>
  action$.pipe(
    ofType(USERSECURITY_TOKEN_REFRESH_REQUESTED),
    exhaustMap((event: Event<string>) =>
      from(postUpdateToken(getRefreshToken())).pipe(
        exhaustMap(apiResponse => {
          // console.log('refreshTokenRequestedEpic apiResponse', apiResponse)
          return of(apiResponse.statusCode === 200 ? tokenReceivedEvent({ ...apiResponse.data, redirectTo: event?.payload?.value }) : tokenErroredEvent(apiResponse.data))
        }),
        catchError(() => of(tokenErroredEvent({
          accessToken: undefined,
          expiresIn: 0,
          expiry: undefined,
          idToken: undefined,
          scope: undefined,
          tokenType: undefined,
          error: 'Network error',
          errorDescription: 'Check your internet connection',
          refreshToken: undefined,
          redirectTo: undefined
        })))
      )
    )
  )

export default [refreshTokenRequestedEpic]
