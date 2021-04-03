import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { TagsEventTypes, tagsRequestedEvent, tagsReceivedEvent, tagsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getTags } from '../api/getTags'

const tagsRequestedEpic: Epic<TagsEventTypes, TagsEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(tagsRequestedEvent)),
    exhaustMap(event =>
      from(getTags()).pipe(
        exhaustMap(apiResponse => 
          of(apiResponse.statusCode === 200 ? tagsReceivedEvent(apiResponse.data) : tagsErroredEvent(apiResponse.data))
        ),
        catchError(() => of(tagsErroredEvent({
          tree: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [tagsRequestedEpic]
