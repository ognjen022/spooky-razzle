import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootState } from '../../RootState'
import Notifications from 'react-notification-system-redux'
import { networkErroredEvent } from '../networkErroredEvent'

const networkErroredEpic: Epic<any, any, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(networkErroredEvent)),
    mergeMap(() => of(Notifications.error(
      {
        // uid: 'once-please', // you can specify your own uid if required
        title: 'Network Error',
        message: 'Something went wrong. Please check your network connection.',
        position: 'tr',
        autoDismiss: 10,
        action: {
          label: 'Close',
          callback: () => console.log('Notification closed')
        }
      }
    )))
  )

export default [ networkErroredEpic ]

/* 

{
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Click me!!',
    callback: () => alert('clicked!')
  }
}

*/