import { getConfiguration } from './../api/getConfiguration';
import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, catchError } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { configReceivedEvent, configErroredEvent } from '../events'
import { RootState } from '../../RootState'
import * as configurationEventTypes from '../eventTypes'

const getConfiugratioRequestedEpic: Epic<any, any, RootState> = (action$) =>
  action$.pipe(
    ofType(configurationEventTypes.CONFIG_REQUESTED),
    exhaustMap(event =>
      from(getConfiguration()).pipe(
        exhaustMap(apiResponse => 
            of(apiResponse.is_success ? configReceivedEvent(apiResponse.data) : configErroredEvent(apiResponse.data))
        
        ),
        catchError(() => of(configErroredEvent({
          streams: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [getConfiugratioRequestedEpic]
