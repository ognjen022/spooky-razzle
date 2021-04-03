import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import configReducer from './configReducers';
import getConfiugratioRequestedEpic from './epic/getConfiugratioRequestedEpic';
import { ConfigurationEventTypes } from './events';

// Epics
const epics = combineEpics(
  ...getConfiugratioRequestedEpic
)

// Reducers
// const configReducers = combineReducers({
//   config: configReducer
// })

// Module Interface
interface IConfigModule {
  readonly epics: any
  readonly reducer: any
}

// Exports
export type ConfigEventTypes = ConfigurationEventTypes // | SignupEventTypes | ProfileEventTypes

export const ConfigModule: IConfigModule = {
  epics: epics,
  reducer: configReducer,
}
