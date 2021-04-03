import { IVideoPlayerState, IVideoStreamResponse, IVideoTokenResponse } from './models';

export const selectVideoPlayerStream = (state: IVideoPlayerState): IVideoStreamResponse | undefined => state.stream;
export const selectVideoPlayerToken = (state: IVideoPlayerState): IVideoTokenResponse | undefined => state.token;