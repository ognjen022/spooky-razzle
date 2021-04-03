import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { ProfileEventTypes, profileRequestedEvent, profileReceivedEvent, profileErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getProfile } from '../api/getProfile'

const profileRequestedEpic: Epic<ProfileEventTypes, ProfileEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(profileRequestedEvent)),
    exhaustMap(() =>
      from(getProfile()).pipe(
        exhaustMap(
          (apiResponse) => {
            let data = {
              'userId': apiResponse.data.id,
              profile: apiResponse.data // comment out
            };
            (window as any).dataLayer.push(data);
            return of(profileReceivedEvent(apiResponse.data))
          }
        ),
        catchError((error) => of(profileErroredEvent(error)))
      )
    )
  )

export default [profileRequestedEpic]
