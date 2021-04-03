import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { INewsMetaDataResponse, INewsArticleResponse } from './models'
import { ActionType } from 'typesafe-actions'

export const newsRequestedEvent = createAction(eventTypes.CONTENT_NEWS_REQUESTED)

export const newsReceivedEvent = createAction(eventTypes.CONTENT_NEWS_RECEIVED, (resolve) => (response: INewsMetaDataResponse) =>
  resolve(response)
)

export const newsErroredEvent = createAction(eventTypes.CONTENT_NEWS_ERRORED, (resolve) => (response: INewsMetaDataResponse) =>
  resolve(response)
)

export const newsArticleRequestedEvent = createAction(eventTypes.CONTENT_NEWS_ARTICLE_REQUESTED, (resolve) => (articleName: string) =>
  resolve(articleName)
)

export const newsArticleReceivedEvent = createAction(eventTypes.CONTENT_NEWS_ARTICLE_RECEIVED, (resolve) => (response: INewsArticleResponse) =>
  resolve(response)
)

export const newsArticleErroredEvent = createAction(eventTypes.CONTENT_NEWS_ARTICLE_ERRORED, (resolve) => (response: INewsArticleResponse) =>
  resolve(response)
)


export type NewsEventTypes = ActionType<
  typeof newsRequestedEvent
  | typeof newsReceivedEvent
  | typeof newsErroredEvent
  | typeof newsArticleRequestedEvent
  | typeof newsArticleReceivedEvent
  | typeof newsArticleErroredEvent
>
