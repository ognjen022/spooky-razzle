import { contactUsRequestedEvent, ContactUsEventTypes, contactUsReceivedEvent, contactUsErroredEvent } from './../events';
import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { exhaustMap, filter, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootState } from '../../RootState'
import { postContactUs } from '../api/postContactUs'
import Notifications from 'react-notification-system-redux';

const getSuccessNotification = () => {
  return Notifications.success(
    {
      title: 'Sent',
      message: 'Thanks for your message. We\'ll be in touch shortly',
      position: 'tc',
      autoDismiss: 10,
      action: {
        label: 'Close',
        callback: () => console.log('Notification closed')
      }
    }
  )
}

const getErrorNotification = (error: any) => {
  return Notifications.error(
    {
      title: 'Send failed',
      message: `An error occurred ${error}`,
      position: 'tc',
      autoDismiss: 10,
      action: {
        label: 'Close',
        callback: () => console.log('Notification closed')
      }
    }
  )
}

const contactUsRequestedEpic: Epic<any, any, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(contactUsRequestedEvent)),
    exhaustMap((event) =>
      from(postContactUs(event.payload.firstname, event.payload.lastname, event.payload.email, event.payload.messsage)).pipe(
        exhaustMap(apiResponse =>
          of(
            apiResponse.statusCode === 200 ? contactUsReceivedEvent(apiResponse.data) : contactUsErroredEvent(apiResponse.data),
            apiResponse.statusCode === 200 ? getSuccessNotification() : getErrorNotification(''),
          )
        ),
        catchError(() => of(contactUsErroredEvent({
          contactUsData: undefined,
          error: 'Network error',
          errorDescription: 'Check your network connection'
        })))
      )
    )
  )

export default [contactUsRequestedEpic]
