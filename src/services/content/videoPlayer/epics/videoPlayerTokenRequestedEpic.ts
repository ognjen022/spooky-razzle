import { videoPlayerTokenRequested, videoPlayerTokenReceived, videoPlayerTokenErrored } from './../events';
import { getVideoPlayerToken } from './../api/getVideoPlayerToken';
import { isActionOf } from 'typesafe-actions';
import { filter, exhaustMap, catchError } from 'rxjs/operators';
import { RootState } from '../../../RootState';
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs'

const videoPlayerTokenRequestedEpic: Epic<any, any, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(videoPlayerTokenRequested)),
        exhaustMap((event) =>
            from(getVideoPlayerToken(event.payload)).pipe(
                exhaustMap(apiResponse => {
                    if (apiResponse.statusCode === 200) {
                        return of(
                            videoPlayerTokenReceived(apiResponse.data)
                        )
                    }
                    return of(videoPlayerTokenErrored(apiResponse.data))
                }),
                catchError(() => of(videoPlayerTokenErrored({
                    id: undefined,
                    error: 'Network error',
                    errorDescription: 'Check your network connection'
                })))
            )
        ));


export default [videoPlayerTokenRequestedEpic]