import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { mergeMap, filter, catchError } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { tagsRequestedEvent, savedStreamsReceived, tagsStreamsErroredEvent, savedTagsReceived } from '../events'
import { RootState } from '../../../RootState'
import { getSavedTags } from '../api/getSavedTags'
import Notifications from 'react-notification-system-redux'
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

const savedTagsRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(tokenEventTypes.USERSECURITY_TOKEN_RECEIVED, tagsEventTypes.CONTENT_TAGS_RECEIVED),
    filter(() => selectIsLoggedIn(state$.value.userSecurity.token)),
    mergeMap(event =>
      from(getSavedTags()).pipe(
        mergeMap(apiResponse =>
          of(apiResponse.is_success ? savedTagsReceived(apiResponse.data) : getErrorNotification())
        ),
        catchError(() => of(getErrorNotification()))
      )
    )
  )

export default [savedTagsRequestedEpic]
