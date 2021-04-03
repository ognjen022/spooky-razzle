import { Epic, ofType } from 'redux-observable'
import { EMPTY } from 'rxjs'
import { mergeMap, filter, tap } from 'rxjs/operators'
import { RootState } from '../../RootState'
import moment from 'moment';

const intercomUpdateEpic: Epic<any, any, RootState> = (action$) =>
  action$.pipe(
    ofType('@@router/LOCATION_CHANGE'),
    mergeMap(() => {
      
        if ((window as any).Intercom) {
        (window as any).Intercom('update', {last_request_at: moment("03-25-2015 +0000", "MM-DD-YYYY Z").valueOf() / 1000 });
      }
      return EMPTY;
    }
    )
  )

export default [intercomUpdateEpic]
