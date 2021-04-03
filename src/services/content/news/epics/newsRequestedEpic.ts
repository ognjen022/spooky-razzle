import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { NewsEventTypes, newsRequestedEvent, newsReceivedEvent, newsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getNews } from '../api/getNews'

const newsRequestedEpic: Epic<NewsEventTypes, NewsEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(newsRequestedEvent)),
    exhaustMap(event =>
      from(getNews()).pipe(
        exhaustMap(apiResponse => 
          of(apiResponse.statusCode === 200 ? newsReceivedEvent(apiResponse.data) : newsErroredEvent(apiResponse.data))
        ),
        catchError(() => of(newsErroredEvent({
          newsMetaData: [],
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [newsRequestedEpic]
