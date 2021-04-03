import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, delay } from 'rxjs/operators'
import { RootState } from '../../RootState'

const delayPeriod: number = 60000

const minuteTimerEpic: Epic<any, any, RootState> = (action$) =>
  action$.pipe(
    ofType('POLL_TICKED'),
    delay(delayPeriod),
    mergeMap(event => {
      // console.log('POLL TICKED at ', new Date())
      let { payload } = event
      return of({ type: 'POLL_TICKED', payload })
    })
  )

export default [minuteTimerEpic]
