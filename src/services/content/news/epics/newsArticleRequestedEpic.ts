import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { NewsEventTypes, newsArticleRequestedEvent, newsArticleReceivedEvent, newsArticleErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getArticle } from '../api/getArticle'

const newsArticleRequestedEpic: Epic<NewsEventTypes, NewsEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(newsArticleRequestedEvent)),
    exhaustMap(event =>
      from(getArticle(event.payload)).pipe(
        exhaustMap(apiResponse => 
          of(apiResponse.statusCode === 200 ? newsArticleReceivedEvent(apiResponse.data) : newsArticleErroredEvent(apiResponse.data))
        ),
        catchError(() => of(newsArticleErroredEvent({
          newsArticle: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [newsArticleRequestedEpic]
