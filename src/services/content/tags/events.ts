import { createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'
import { ITagsResponse, IStreamsResponse } from './models'
import { ActionType } from 'typesafe-actions'

export const tagsRequestedEvent = createAction(eventTypes.CONTENT_TAGS_REQUESTED)

export const tagsReceivedEvent = createAction(eventTypes.CONTENT_TAGS_RECEIVED, (resolve) => (response: ITagsResponse) =>
  resolve(response)
)

export const tagsErroredEvent = createAction(eventTypes.CONTENT_TAGS_ERRORED, (resolve) => (response: ITagsResponse) =>
  resolve(response)
)

export const tagsStreamsReceivedEvent = createAction(eventTypes.CONTENT_TAGS_STREAMS_RECEIVED, (resolve) => (response: IStreamsResponse) =>
  resolve(response)
)

export const tagsStreamsErroredEvent = createAction(eventTypes.CONTENT_TAGS_ERRORED, (resolve) => (response: IStreamsResponse) =>
  resolve(response)
)

export const tagsFilterSelectedEvent = createAction(eventTypes.CONTENT_TAGS_FILTER_SELECTED, (resolve) => (tagId: string) =>
  resolve(tagId)
)

export const tagsSaveTagEvent = createAction(eventTypes.CONTENT_TAGS_SAVETAG_TOGGLED, (resolve) => (tagId: string) =>
  resolve(tagId)
)

export const tagsSaveStreamEvent = createAction(eventTypes.CONTENT_TAGS_SAVESTREAM_TOGGLED, (resolve) => (eventId: number) =>
  resolve(eventId)
)

export const tagsFilterRemovedEvent = createAction(eventTypes.CONTENT_TAGS_FILTER_REMOVED, (resolve) => () =>
  resolve()
)

export const tagsFilterSearchTermSelectedEvent = createAction(eventTypes.CONTENT_TAGS_FILTER_SEARCH_SELECTED, (resolve) => (searchTerm: string) =>
  resolve(searchTerm)
)

export const tagsFilterSearchTermRemovedEvent = createAction(eventTypes.CONTENT_TAGS_FILTER_SEARCH_REMOVED, (resolve) => () =>
  resolve()
)

export const savedTagsReceived = createAction(eventTypes.CONTENT_TAGS_SAVEDTAGS_RECEIVED, (resolve) => (tagIds: string[]) =>
  resolve(tagIds)
)

export const savedStreamsReceived = createAction(eventTypes.CONTENT_TAGS_SAVEDSTREAMS_RECEIVED, (resolve) => (savedEventIds: number[]) =>
  resolve(savedEventIds)
)

export type TagsEventTypes = ActionType<
  typeof tagsRequestedEvent
  | typeof tagsReceivedEvent
  | typeof tagsErroredEvent
  | typeof tagsFilterSelectedEvent
  | typeof tagsFilterRemovedEvent
  | typeof tagsFilterSearchTermSelectedEvent
  | typeof tagsFilterSearchTermRemovedEvent
  | typeof tagsStreamsReceivedEvent
  | typeof tagsStreamsErroredEvent
  | typeof tagsSaveTagEvent
  | typeof tagsSaveStreamEvent
  | typeof savedStreamsReceived
  | typeof savedTagsReceived
>
