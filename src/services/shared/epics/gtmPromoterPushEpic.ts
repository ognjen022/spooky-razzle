import { Epic, ofType } from 'redux-observable'
import { EMPTY, of } from 'rxjs'
import { mergeMap, tap, withLatestFrom } from 'rxjs/operators'

import { RootState } from '../../RootState'
import { selectMainTag } from '../../content/tags/selectors'
import { ITag } from '../../content/tags/models'
import { createAction } from 'typesafe-actions'

const pageVisited = createAction('PAGE_VISITED', resolve => (response: any) => resolve(response))

const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement)

const gtmPromoterPushEpic: Epic<any, any, RootState, any> = (action$, state$) =>
  action$.pipe(
    ofType('PAGE_INITIALIZED'),
    mergeMap(event => {
      const mainTag: ITag | undefined = selectMainTag(state$.value)
      const visited = state$.value.content.tags.visitedTags
      const data = {
        promoterId: mainTag?.id,
        eventName: mainTag?.name
      }
      if (mainTag !== undefined && visited?.filter(o => o.promoterId === mainTag?.id && o.eventName === mainTag?.name).length === 0) {
        if (!isServer) (window as any).dataLayer.push(data)
        return of(pageVisited(data))
      }
      return EMPTY
    })
  )

export default [gtmPromoterPushEpic]
