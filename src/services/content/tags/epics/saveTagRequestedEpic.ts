import { Epic } from 'redux-observable'
import { from, of, EMPTY } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { tagsSaveTagEvent } from '../events'
import { RootState } from '../../../RootState'
import Notifications from 'react-notification-system-redux'
import { postOrDeleteSavedTags } from '../api/postOrDeleteSavedTags'

const getErrorNotification = (method: string) => {
  return Notifications.error(
    {
      title: 'Error',
      message: `An error occurred. Tag not ${method.toLocaleLowerCase().replace('delete', 'delet')}ed. Please try again.`,
      position: 'tc',
      autoDismiss: 10,
      action: {
        label: 'Close',
        callback: () => console.log('Notification closed')
      }
    }
  )
}


const tagsSaveRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(tagsSaveTagEvent)),
    exhaustMap((event: any) => {
      const tagId: string = event.payload
      let method: string = 'POST'
      if (!state$.value.content.tags.savedTagIds.includes(tagId)) method = 'DELETE'

      return from(postOrDeleteSavedTags(tagId, method)).pipe(
        exhaustMap(apiResponse => {
          if (apiResponse.is_success) {
            return EMPTY
          }

          return of(getErrorNotification(method))
        }),
        catchError(() => of(getErrorNotification(method)))
      )
    })
  )

export default [tagsSaveRequestedEpic]
