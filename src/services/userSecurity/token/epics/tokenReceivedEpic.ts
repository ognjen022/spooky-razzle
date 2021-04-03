import { accountToggleLoginEvent, executeCallbackEvent, accountToggleSignupEvent, accountToggleWelcomeEvent } from './../../accountDetails/events';
import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import { filter, mergeMap, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { goBack, push } from 'connected-react-router'
import { tokenReceivedEvent } from '../events'
import { TokenResponse } from '../models'
import { RootState } from '../../../RootState'
import { profileRequestedEvent } from '../../profile/events'
import { setAccessToken, setRefreshToken } from '../../../shared/tokenLocalStorage'
import { subscriptionDetailsRequestedEvent } from '../../../payments/subscriptions/events'
import { showPurchaseModalToggledEvent } from '../../../payments/purchase/events'
import { PurchaseState } from '../../../payments/purchase/models'
import { IStream } from '../../../content/tags/models'
import _ from 'lodash'

const saveTokenToLocalStorage = (token: TokenResponse) => {

  // normal login returns token.access_token
  // google login returns token.accessToken
  const accessToken = token.accessToken || token['access_token'] || ''
  const refreshToken = token.refreshToken || token['refresh_token'] || ''

  if (accessToken) {
    setAccessToken(accessToken)
  }

  if (refreshToken) {
    setRefreshToken(refreshToken)
  }
}

const isPurchaseModalFreeToWatch = (state: PurchaseState, streams: IStream[]): boolean => {
  if (state.showModal && state.eventId) {
    const stream: IStream | undefined = _.find(streams, (item: IStream) => {
      return item.eventId === state.eventId
    })
    if (stream && stream.isFreeToWatch) return true
  }
  //if (eventId)
  return false
}


const tokenReceivedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(tokenReceivedEvent)),
    tap(action => saveTokenToLocalStorage(action.payload)),
    mergeMap(action => {

      // sign up should show welcome page
      if (state$.value.userSecurity.accountDetails.showSignup) {

        return of(
          profileRequestedEvent(),
          subscriptionDetailsRequestedEvent(),
          accountToggleSignupEvent(),
          accountToggleWelcomeEvent(),
          // executeCallbackEvent()
        )
      }
      
      return of(
        profileRequestedEvent(),
        subscriptionDetailsRequestedEvent(),
        accountToggleLoginEvent(),
        executeCallbackEvent()
      )

      
    })
  )

export default [tokenReceivedEpic]
