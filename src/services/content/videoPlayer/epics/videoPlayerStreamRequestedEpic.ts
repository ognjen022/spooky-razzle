import { getVideoPlayerStream } from '../api/getVideoPlayerStream';
import { isActionOf } from 'typesafe-actions';
import { filter, exhaustMap, catchError } from 'rxjs/operators';
import { RootState } from './../../../RootState';
import { VideoPlayerEventTypes, videoPlayerStreamReceived, videoPlayerStreamRequested, videoPlayerStreamErrored, videoPlayerTokenRequested } from './../events';
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs'

const videoPlayerStreamRequestedEpic: Epic<VideoPlayerEventTypes, any, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(videoPlayerStreamRequested)),
        exhaustMap((event) =>
            from(getVideoPlayerStream(event.payload.eventId, event.payload.videoId)).pipe(
                exhaustMap(apiResponse => {
                    if (apiResponse.statusCode === 200) {
                        return of(
                            videoPlayerStreamReceived(apiResponse.data), videoPlayerTokenRequested('playback')
                        )
                    }
                    return of(videoPlayerStreamErrored(apiResponse.data))
                }),
                catchError(() => of(videoPlayerStreamErrored({
                    id: undefined,
                    error: 'Network error',
                    errorDescription: 'Check your network connection'
                })))
            )
        ));


export default [videoPlayerStreamRequestedEpic]