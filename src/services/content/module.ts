import { combineReducers } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'

// Tags
import tagsReducer from './tags/tagsReducer'
import { TagsEventTypes } from './tags/events'
import tagsRequestedEpic from './tags/epics/tagsRequestedEpic'
import saveTagRequestedEpic from './tags/epics/saveTagRequestedEpic'

// Streams
import tagsStreamsRequestedEpic from './tags/epics/tagsStreamsRequestedEpic'
import saveStreamRequestedEpic from './tags/epics/saveStreamRequestedEpic'
import savedStreamsRequestedEpic from './tags/epics/savedStreamsRequestedEpic'

// Blogs
import { NewsEventTypes } from './news/events'
import newsReducer from './news/newsReducer'
import newsRequestedEpic from './news/epics/newsRequestedEpic'
import newsArticleRequestedEpic from './news/epics/newsArticleRequestedEpic'

// Video pLayer
import {VideoPlayerEventTypes} from './videoPlayer/events';
import videoPlayerReducer from './videoPlayer/videoPlayerReducer';
import videoPlayerTokenRequestedEpic from './videoPlayer/epics/videoPlayerStreamRequestedEpic'
import videoPlayerStreamRequestedEpic from './videoPlayer/epics/videoPlayerTokenRequestedEpic'

// Epics
const epics = combineEpics(
  ...tagsRequestedEpic,
  ...tagsStreamsRequestedEpic,
  ...saveTagRequestedEpic,
  ...saveStreamRequestedEpic,
  ...savedStreamsRequestedEpic,
  ...newsRequestedEpic,
  ...newsArticleRequestedEpic,
  ...videoPlayerTokenRequestedEpic,
  ...videoPlayerStreamRequestedEpic
)

// Reducers
const contentReducer = combineReducers({
  tags: tagsReducer,
  news: newsReducer,
  videoPlayer: videoPlayerReducer
})

// Module Interface
interface IContentModule {
  readonly epics: any
  readonly reducer: any
}

// Exports
export type ContentEventTypes = TagsEventTypes | NewsEventTypes | VideoPlayerEventTypes // | SignupEventTypes | ProfileEventTypes

export const ContentModule: IContentModule = {
  epics: epics,
  reducer: contentReducer,
}
