import { ContactUsEventTypes } from './events';
import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'
import contactUsRequestedEpic from './epic/contactUsRequestedEpic'
import contactUsReducer from './contactReducers'

// Epics
const epics = combineEpics(
  ...contactUsRequestedEpic
)

// Reducers
const contentReducer = combineReducers({
  contact: contactUsReducer
})

// Module Interface
interface IContactModule {
  readonly epics: any
  readonly reducer: any
}

// Exports
export type ContactEventTypes = ContactUsEventTypes // | SignupEventTypes | ProfileEventTypes

export const ContactModule: IContactModule = {
  epics: epics,
  reducer: contentReducer,
}
