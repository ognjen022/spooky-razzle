import { Reducer, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IVideoStreamResponse, IVideoPlayerState, IVideoTokenResponse } from './models';

import { Event } from '../../eventGroups'
import * as eventTypes from './eventTypes'

const initialState: IVideoPlayerState = {
    isLoading: true,
    stream: undefined,
    token: undefined
}


const videoPlayerReducer: Reducer<IVideoPlayerState> = createReducer(initialState, {
    [eventTypes.CONTENT_VIDEO_PLAYER_STREAM_REQUESTED]: () => ({ ...initialState, isLoading: true }),
    [eventTypes.CONTENT_VIDEO_PLAYER_STREAM_RECEIVED]: (state, action: PayloadAction<IVideoStreamResponse>) => {
        return { ...state, stream: action.payload, isLoading: false }
    },
    [eventTypes.CONTENT_VIDEO_PLAYER_STREAM_ERRORED]: (state) => {
        return { ...state, stream: undefined, isLoading: false }
    },
    [eventTypes.CONTENT_VIDEO_PLAYER_TOKEN_REQUESTED]: (state) => {
        return { ...state, isLoading: true }
    }, 
    [eventTypes.CONTENT_VIDEO_PLAYER_TOKEN_RECEIVED]: (state, action: PayloadAction<IVideoTokenResponse>) => {
        return { ...state, token: action.payload, isLoading: false }
    },
    [eventTypes.CONTENT_VIDEO_PLAYER_TOKEN_ERRORED]: (state) => {
        return { ...state, isLoading: true }
    }
});

export default videoPlayerReducer
