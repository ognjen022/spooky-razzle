import { Epic, ofType} from 'redux-observable'
import { EMPTY} from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { RootState } from '../../../RootState'

const tokenPersistEpic: Epic<any, any, RootState> = (action$, store) =>
  action$.pipe(
    ofType('TOKEN_PERSIST'),
    mergeMap(event => {
        let data = {
            'userId': store.value.userSecurity.profile.id,
            profile: store.value.userSecurity.profile // comment out
          };
          (window as any).dataLayer.push(data);
      return EMPTY
    })
  )

export default [tokenPersistEpic]
