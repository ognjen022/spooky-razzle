import { IVideoTokenResponse } from './models';
import { ActionType, createAction } from 'typesafe-actions'
import * as eventTypes from './eventTypes'

export const videoPlayerStreamRequested = createAction(
    eventTypes.CONTENT_VIDEO_PLAYER_STREAM_REQUESTED,
    (resolve) => (eventId: number | string , videoId: number | undefined, isLive: boolean) => resolve({ eventId, videoId, isLive })
)

export const videoPlayerStreamReceived = createAction(
    eventTypes.CONTENT_VIDEO_PLAYER_STREAM_RECEIVED,
    (resolve) => (videoStream: IVideoTokenResponse) => resolve(videoStream)
)

export const videoPlayerStreamErrored = createAction(
    eventTypes.CONTENT_VIDEO_PLAYER_STREAM_ERRORED,
    (resolve) => (err: any) => resolve(err)
)

export const videoPlayerTokenRequested = createAction(
    eventTypes.CONTENT_VIDEO_PLAYER_TOKEN_REQUESTED,
    (resolve) => (scope: string) => resolve(scope)
)

export const videoPlayerTokenReceived = createAction(
    eventTypes.CONTENT_VIDEO_PLAYER_TOKEN_RECEIVED,
    (resolve) => (token: IVideoTokenResponse) => resolve(token)
)

export const videoPlayerTokenErrored = createAction(
    eventTypes.CONTENT_VIDEO_PLAYER_TOKEN_ERRORED,
    (resolve) => (err: any) => resolve(err)
)
export type VideoPlayerEventTypes = ActionType<
  typeof videoPlayerStreamRequested | 
  typeof videoPlayerStreamReceived |
  typeof videoPlayerStreamErrored |
  typeof videoPlayerTokenRequested |
  typeof videoPlayerTokenReceived |
  typeof videoPlayerTokenErrored
>
  