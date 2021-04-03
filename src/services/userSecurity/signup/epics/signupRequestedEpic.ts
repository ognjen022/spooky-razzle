import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { SignupEventTypes, signupRequestedEvent, signupReceivedEvent, signupErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { postUserSecuritySignup } from '../api/postUserSecuritySignup'
import { tokenRequestedEvent } from '../../token/events'

const signupRequestedEpic: Epic<any, any, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(signupRequestedEvent)),
    exhaustMap((event) =>
      from(postUserSecuritySignup(event.payload.firstname, event.payload.lastname, event.payload.email, event.payload.password, event.payload.join)).pipe(
        exhaustMap(apiResponse => {
          if (apiResponse.statusCode === 200) {
            return of(
              signupReceivedEvent(apiResponse.data),
              tokenRequestedEvent({
                username: event.payload.email,
                password: event.payload.password,
                redirectTo: ''
              })
            )
          }
          return of(signupErroredEvent(apiResponse.data))
        }),
        catchError(() => of(signupErroredEvent({
          id: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [signupRequestedEpic]
