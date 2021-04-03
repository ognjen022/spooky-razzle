import { Epic, ofType } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { mergeMap, filter, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootState } from '../../RootState'
import Notifications from 'react-notification-system-redux'
import { networkErroredEvent } from '../networkErroredEvent'

const gtmDataLayerPushEpic: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    ofType('@@router/LOCATION_CHANGE'),
    /*    tap(event => {
          console.log('gtmDataLayerPushEpic tap');
          (window as any).dataLayer.push(event);
        }), */
    mergeMap(event => {
      let data = {
        event: 'Pageview',
        pagePath: window.location.href,
        pageTitle: document.title //some arbitrary name for the page/state
      }
      if (typeof window !== 'undefined' && window.document && window.document.createElement) {
        // ;(window as any).dataLayer.push(data)
      }
      // console.log('data.push', data)
      return EMPTY
      /*return of(Notifications.info(
        {
          // uid: 'once-please', // you can specify your own uid if required
          title: 'Route changed',
          message: '',
          position: 'tr',
          autoDismiss: 10,
          action: {
            label: 'Close',
            callback: () => console.log('Notification closed')
          }
        }
      )) */
    })
  )

export default [gtmDataLayerPushEpic]

/*
s
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
