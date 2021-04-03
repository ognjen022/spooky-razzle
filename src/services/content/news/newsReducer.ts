import { createReducer, Reducer, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

import * as eventTypes from './eventTypes'
import { INewsState, INewsMetaDataResponse, INewsArticleResponse } from './models'

const initialState: INewsState = {
  newsMetaData: [],
  currentNewsArticle: undefined,
  error: undefined,
  errorDescription: undefined,
  hasLoadedNews: false,
}

const newsReducer: Reducer<INewsState> = createReducer(initialState, {
  [eventTypes.CONTENT_NEWS_RECEIVED]: (state, action: PayloadAction<INewsMetaDataResponse>) => {
    state.newsMetaData = action.payload.newsMetaData
    state.hasLoadedNews = true
    return state
  },
  [eventTypes.CONTENT_NEWS_ERRORED]: (state, action: PayloadAction<INewsMetaDataResponse>) => {
    state.error = action.payload.error
    state.errorDescription = action.payload.errorDescription
    state.hasLoadedNews = true
    return state
  },
  [eventTypes.CONTENT_NEWS_ARTICLE_RECEIVED]: (state, action: PayloadAction<INewsArticleResponse>) => {
    state.currentNewsArticle = action.payload.newsArticle
    state.hasLoadedNews = true
    return state
  },
  [eventTypes.CONTENT_NEWS_ARTICLE_ERRORED]: (state, action: PayloadAction<INewsArticleResponse>) => {
    state.error = action.payload.error
    state.errorDescription = action.payload.errorDescription
    state.hasLoadedNews = true
    return state
  },
})

export default newsReducer
