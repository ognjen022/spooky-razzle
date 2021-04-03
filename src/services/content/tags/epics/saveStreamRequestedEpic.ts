import { Epic } from 'redux-observable'
import { from, of, EMPTY } from 'rxjs'
import { mergeMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { tagsSaveStreamEvent } from '../events'
import { RootState } from '../../../RootState'
import Notifications from 'react-notification-system-redux'
import { postOrDeleteSavedStreams } from '../api/postOrDeleteSavedStreams'

const getErrorNotification = (method: string) => {
  return Notifications.error(
    {
      title: 'Error',
      message: `An error occurred. Stream not ${method.toLocaleLowerCase().replace('delete', 'delet')}ed. Please try again.`,
      position: 'tc',
      autoDismiss: 10,
      action: {
        label: 'Close',
        callback: () => console.log('Notification closed')
      }
    }
  )
}

const streamSaveRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(tagsSaveStreamEvent)),
    mergeMap((event: any) => {
      const eventId: number = event.payload
      let method: string = 'POST'

      if (!state$.value.content.tags.savedEventIds.includes(eventId)) method = 'DELETE'
      return from(postOrDeleteSavedStreams(eventId, method)).pipe(
        mergeMap(apiResponse => {
          if (apiResponse.is_success) {
            return EMPTY
          }

          return of(getErrorNotification(method))
        }),
        catchError(() => of(getErrorNotification(method)))
      )
    })
  )

export default [streamSaveRequestedEpic]
