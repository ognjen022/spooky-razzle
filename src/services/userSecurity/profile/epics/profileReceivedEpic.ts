
import { Epic } from 'redux-observable'
import { EMPTY } from 'rxjs'
import { exhaustMap, filter, catchError, mergeMap, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { ProfileEventTypes, profileReceivedEvent, profileErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getProfile } from '../api/getProfile'

const profileReceivedEpic: Epic<ProfileEventTypes, ProfileEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(profileReceivedEvent)),
    tap(action => {
      if ((window as any).Intercom) {
        (window as any).Intercom('update', {
            name: `${action.payload.metadata?.FirstName} ${action.payload.metadata?.LastName}`,
            email: `${action.payload.email}`
        });
      }
    }),
    mergeMap((event: any) => EMPTY)
  )

export default [profileReceivedEpic]
