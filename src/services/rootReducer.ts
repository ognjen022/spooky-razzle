import { ConfigModule } from './config/module';
import { ContactModule } from './contact/module';
import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { reducer as notificationsReducer } from 'react-notification-system-redux'
import { UserSecurityModule } from './userSecurity/module'
import { ContentModule } from './content/module'
import { PaymentsModule } from './payments/module'

const userSecurity = UserSecurityModule.reducer
const content = ContentModule.reducer
const payments = PaymentsModule.reducer
const contact = ContactModule.reducer
const configuration = ConfigModule.reducer


const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    notifications: notificationsReducer,
    userSecurity,
    content,
    payments,
    contact,
    configuration
  })

export default rootReducer
