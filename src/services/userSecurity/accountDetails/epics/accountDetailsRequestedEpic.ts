import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { accountDetailsRequestedEvent, accountDetailsReceivedEvent, accountDetailsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { postUserSecurityAccountDetails } from '../api/postUserSecurityAccountDetails'
import { profileRequestedEvent } from '../../profile/events'

const accountDetailsRequestedEpic: Epic<any, any, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(accountDetailsRequestedEvent)),
    exhaustMap(event =>
      from(
        postUserSecurityAccountDetails({
          firstName: event.payload.firstName,
          lastName: event.payload.lastName,
          email: event.payload.email,
          phone: event.payload.phone,
        })
      ).pipe(
        exhaustMap(apiResponse => {
          return apiResponse.statusCode
            ? of(
              accountDetailsReceivedEvent(apiResponse.data),
              profileRequestedEvent()
            ) : of(
              accountDetailsErroredEvent(apiResponse.data)
            )
        }),
        catchError(() => of(accountDetailsErroredEvent({
          id: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [accountDetailsRequestedEpic]
