import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { videoPlayerStreamRequested } from '../../services/content/videoPlayer/events';
import { IVideoStreamResponse, IVideoTokenResponse } from '../../services/content/videoPlayer/models';
import { selectVideoPlayerStream, selectVideoPlayerToken } from '../../services/content/videoPlayer/selectors';
import { RootState } from '../../services/RootState';

import { IVideoPlayerProps } from './VideoPlayer';

const VideoPlayerDefault: React.FC<IVideoPlayerProps> = (props: IVideoPlayerProps, context: any) => {

    const videoPlayer = React.createRef<HTMLDivElement>();

    const [player, setPlayer] = useState<any>(undefined);

    const token = useSelector<RootState, IVideoTokenResponse | undefined>(state => selectVideoPlayerToken(state.content.videoPlayer))
    const stream = useSelector<RootState, IVideoStreamResponse | undefined>(state => selectVideoPlayerStream(state.content.videoPlayer))

    const dispatch = useDispatch();
    useEffect(() => {
        setPlayer(new (window as any).THEOplayer.Player(videoPlayer.current, {
            libraryLocation: "https://cdn.myth.theoplayer.com/8cc4421d-4ada-4a2c-8477-341e25036483/"
        }));
    }, [])

    useEffect(() => {
        if (player !== null && player) {
            dispatch(videoPlayerStreamRequested(
                props.eventId,
                props.videoId,
                props.isLive
            ));
            (player as any).addEventListener('timeupdate', ev => {
                const elapsed = (player as any).duration === 'Infinity' ? ev.currentTime : (player as any).duration - ev.currentTime;
                if (props.onTimeUpdate) {
                    props.onTimeUpdate(elapsed)
                }
            });
            const bigPlay = videoPlayer.current?.querySelector('#bigPlay svg') as any;
            const theoPlay = videoPlayer.current?.querySelector('.theo-big-play-button-svg-container > svg') as any;

            const spookySpinner = videoPlayer.current?.querySelector('#spookySpinner svg') as any;
            const theoSpinner = videoPlayer.current?.querySelector('.theo-loading-spinner-rotator') as any;

            videoPlayer.current?.querySelector('.theo-big-play-button-svg-container')
                ?.replaceChild(bigPlay, theoPlay);

                // videoPlayer.current?.querySelector('.theo-secondary-color.vjs-loading-spinner ')
                // ?.replaceChild(spookySpinner, theoSpinner);

            videoPlayer.current?.querySelector('.theo-cast-button.theo-chromecast-button.theo-controlbar-button.vjs-control.vjs-button')
                ?.remove();
            videoPlayer.current?.querySelector('.theo-cast-button.theo-airplay-button.theo-controlbar-button.vjs-control.vjs-button')
                ?.remove();
            
        }
    }, [player])
    useEffect(() => {
        if (token && stream && (player !== null && player)) {
            let source: { src: string | undefined, type: string } = {
                src: undefined,
                type: 'application/x-mpegurl' // sets type to HLS
            }
            let param = `?timestamp=${token.timestamp}&token=${token.token}&clientId=${token.client_id}`;
            if (stream.vods.data.length > 0) {
                source.src = `${stream.vods.data[0].data.m3u8}${param}`;
            } else if (stream.live !== null) {
                source.src = `${stream.live.m3u8}${param}`;
            }

            player.source = {
                sources: [source]
            };
            
            if (props.position ?? 0 !== 0) {
                player.currentTime = props.position;
            }
            player.play();
        }
    }, [stream, token])

    const hide = {
        display: 'none'
    }

    return (<div
        ref={videoPlayer}
        className={'spooky-player theoplayer-container video-js theoplayer-skin vjs-16-9 THEOplayer'}
    >
        <span id="bigPlay" style={hide}>
            <svg className={'big-play'} role="presentation">
                <use xlinkHref="#icon-play"></use>
            </svg>
        </span>

        <span id="spookySpinner" style={hide}>
            
            <svg className={'spooky-spinner'} role="presentation">
                <use xlinkHref="#icon-spinner"></use>
            </svg>
        </span>

    </div>)
}

export default VideoPlayerDefault;