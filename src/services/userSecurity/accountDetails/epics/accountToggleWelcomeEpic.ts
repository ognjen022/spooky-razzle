
import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { EMPTY} from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { accountToggleWelcomeEvent, executeCallbackEvent } from '../events'
import { RootState } from '../../../RootState'

const accountToggleWelcomeEpic: Epic<any, any, RootState> = (action$, store$) =>
  action$.pipe(
    ofType(accountToggleWelcomeEvent),
    mergeMap(event => {
      
      if (!store$.value.userSecurity.accountDetails.showWelcomePage) {
        return of(executeCallbackEvent());
      }
      return EMPTY;
    }))
    

export default [accountToggleWelcomeEpic]
