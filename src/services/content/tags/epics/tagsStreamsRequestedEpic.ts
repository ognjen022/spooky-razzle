import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { TagsEventTypes, tagsRequestedEvent, tagsStreamsReceivedEvent, tagsStreamsErroredEvent } from '../events'
import { RootState } from '../../../RootState'
import { getStreams } from '../api/getStreams'

const tagsStreamsRequestedEpic: Epic<TagsEventTypes, TagsEventTypes, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(tagsRequestedEvent)),
    exhaustMap(event =>
      from(getStreams()).pipe(
        exhaustMap(apiResponse => 
          of(apiResponse.statusCode === 200 ? tagsStreamsReceivedEvent(apiResponse.data) : tagsStreamsErroredEvent(apiResponse.data))
        ),
        catchError(() => of(tagsStreamsErroredEvent({
          streams: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [tagsStreamsRequestedEpic]
