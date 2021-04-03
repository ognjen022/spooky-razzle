import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { EMPTY} from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { executeCallbackEvent } from '../events'
import { RootState } from '../../../RootState'

const executeCallbackEpic: Epic<any, any, RootState> = (action$, store$) =>
  action$.pipe(
    ofType(executeCallbackEvent),
    mergeMap(event => {
        const callback = store$.value.userSecurity.accountDetails.callBack;

        if (callback) {
            return of(callback());
        }
        return EMPTY;
    }));
    

export default [executeCallbackEpic]
