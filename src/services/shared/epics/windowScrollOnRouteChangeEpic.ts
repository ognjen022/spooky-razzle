import { Epic, ofType } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { mergeMap, filter, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootState } from '../../RootState'
import Notifications from 'react-notification-system-redux'
import { networkErroredEvent } from '../networkErroredEvent'

const windowScrollOnRouteChangeEpic: Epic<any, any, RootState> = (action$) =>
  action$.pipe(
    ofType('@@router/LOCATION_CHANGE'),
    mergeMap(event => {
      (window as any).scroll(0, 0)
      return EMPTY
    }
    )
  )

export default [windowScrollOnRouteChangeEpic]
