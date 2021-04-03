import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { tagsRequestedEvent, savedStreamsReceived, tagsStreamsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getSavedStreams } from '../api/getSavedStreams'
import Notifications from 'react-notification-system-redux'
import * as eventTypes from '../eventTypes'
import * as tokenEventTypes from '../../../userSecurity/token/eventTypes'
import * as tagsEventTypes from '../../../content/tags/eventTypes'
import { selectIsLoggedIn } from '../../../userSecurity/token/selectors'

const getErrorNotification = () => {
  return Notifications.error(
    {
      title: 'Error',
      message: `An error occurred. Saved streams not found.`,
      position: 'tc',
      autoDismiss: 10,
      action: {
        label: 'Close',
        callback: () => console.log('Notification closed')
      }
    }
  )
}

const savedStreamsRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(tokenEventTypes.USERSECURITY_TOKEN_RECEIVED, tagsEventTypes.CONTENT_TAGS_RECEIVED),
    filter(() => selectIsLoggedIn(state$.value.userSecurity.token)),
    exhaustMap(event =>
      from(getSavedStreams()).pipe(
        exhaustMap(apiResponse =>
          of(apiResponse.is_success ? savedStreamsReceived(apiResponse.data) : getErrorNotification())
        ),
        catchError(() => of(tagsStreamsErroredEvent({
          streams: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [savedStreamsRequestedEpic]
