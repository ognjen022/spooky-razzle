/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from 'react-redux';

import { IVideoStreamResponse, IVideoTokenResponse } from '../../services/content/videoPlayer/models';

import { videoPlayerStreamRequested } from '../../services/content/videoPlayer/events'
import { selectVideoPlayerStream, selectVideoPlayerToken } from '../../services/content/videoPlayer/selectors'

import styles from './VideoPlayer.module.scss'
import { RootState } from '../../services/RootState';
import { isIos, getStyles } from './../../utils/utils';

export interface IVideoPlayerProps {
    eventId: number | string
    videoId: number | undefined
    isLive: boolean
    position: number | undefined
    onTimeUpdate?: (ev: number) => void | undefined
}

interface ISliderConfig {
    readonly slider: RefObject<HTMLDivElement>
    readonly bar: RefObject<HTMLDivElement>
    readonly thumb: RefObject<HTMLDivElement>
    readonly min: number
    readonly max: number
    readonly current: number
    readonly thumbWidth: number
}


const VideoPlayer: React.FC<IVideoPlayerProps> = (props: IVideoPlayerProps, context: any) => {

    const videoPlayer = React.createRef<HTMLDivElement>();
    const videoPlayerControls = React.createRef<HTMLDivElement>();

    const [volumeSliderState, setVolumeSliderState] = useState<ISliderConfig>({

        slider: React.createRef<HTMLDivElement>(),
        bar: React.createRef<HTMLDivElement>(),
        thumb: React.createRef<HTMLDivElement>(),
        min: 0,
        current: 100,
        max: 100,
        thumbWidth: 13
    });

    const [progressSliderState, setProgressSliderState] = useState<ISliderConfig>({

        slider: React.createRef<HTMLDivElement>(),
        bar: React.createRef<HTMLDivElement>(),
        thumb: React.createRef<HTMLDivElement>(),
        min: 0,
        current: 0,
        max: 100,
        thumbWidth: 13
    });

    const [progressBarThumbPosition, setProgressBarThumbPosition] = useState({ left: '0px' });
    const [volumeBarThumbPosition, setVolumeBarThumbPosition] = useState({ top: 0 });
    const [controlStyles, setControlStyles] = useState(getStyles(styles, ['video-player__controls']));
    const [logoStyles, setLogoStyles] = useState(getStyles(styles, ['video-player__logo']));
    const [volumeSliderStyles2, setVolumeSliderStyles2] = useState(getStyles(styles, ['video-player__controls-volume-slider']));
    const [volumeSliderStyles, setVolumeSliderStyle] = useState<any>({
        bottom: 0,
        left: '0'
    })
    const [isPlayerLoading, setPlayerLoading] = useState(true);
    const [playerVolume, setPlayerVolume] = useState(1);
    const [elapsedTime, setElapsedTime] = useState('00:00');
    const [player, setPlayer] = useState(null);
    const [isPlaying, startPlayer] = useState(false)
    const [isFullscreen, setFullscreen] = useState(false);
    const [isMouseDown, setMouseDown] = useState(false);
    const handle = useFullScreenHandle();
    const [isVolumeOpen, setVolumeOpen] = useState(false);
    const [isActive, setActive] = useState(true);

    const [fadeTimeout, setFadeTimeout] = useState<number>(-1)
    const [volumeFadeTimeout, setVolumeFadeTimeout] = useState<number>(-1)

    const [iosFullscreenStyle, setIosFullscreenStyle] = useState({});

    const isLoading = useSelector<RootState, boolean>(state => state.content.videoPlayer.isLoading);
    const token = useSelector<RootState, IVideoTokenResponse | undefined>(state => selectVideoPlayerToken(state.content.videoPlayer))
    const stream = useSelector<RootState, IVideoStreamResponse | undefined>(state => selectVideoPlayerStream(state.content.videoPlayer))

    let dispatch = useDispatch();

    useEffect(() => {
        setPlayer(new (window as any).THEOplayer.ChromelessPlayer(videoPlayer.current, {
            libraryLocation: "https://cdn.myth.theoplayer.com/8cc4421d-4ada-4a2c-8477-341e25036483/",
            autoPlay: !isIos(),
            mutedAutoplay: 'all'
        }));
        setVolumeSliderStyle({
            left: ((getValue(volumeSliderState.slider.current?.parentElement?.clientWidth) / 2) + 2 + (getValue(volumeSliderState.slider.current?.parentElement?.offsetLeft)) - volumeSliderState.thumbWidth / 2),
            bottom: getValue(volumeSliderState.slider.current?.parentElement?.clientHeight)
        })
        setVolumeSliderStyles2(getStyles(styles, ['video-player__controls-volume-slider', isVolumeOpen ? 'fade-in' : 'fade-out']));
    }, [])

    useEffect(() => {

        setControlStyles(getStyles(styles, ['video-player__controls', isActive ? 'fade-in' : 'fade-out']));
        setLogoStyles(getStyles(styles, ['video-player__logo', isActive ? 'fade-in' : 'fade-out']));
    }, [isActive])

    useEffect(() => {

        setVolumeSliderStyles2(getStyles(styles, ['video-player__controls-volume-slider', isVolumeOpen ? 'fade-in' : 'fade-out']));
    }, [isVolumeOpen])

    useEffect(() => {
        if (player !== null) {
            const theo = (player as any);
            dispatch(videoPlayerStreamRequested(
                props.eventId,
                props.videoId,
                props.isLive
            ));
            (player as any).addEventListener('timeupdate', (ev) => {
                console.log(ev);
                if (ev.currentTime > 0 && isPlayerLoading) {
                    setPlayerLoading(false);
                }
                const elapsed = (player as any).duration === 'Infinity' ? ev.currentTime : (player as any).duration - ev.currentTime;
                setElapsedTime(secondsToHms(elapsed));

                const progressBarThumb = (theo.currentTime / theo.duration);

                if (!isNaN(progressBarThumb) && !isMouseDown) {
                    setProgressBarThumbPosition({
                        left: `${(progressSliderState.bar.current?.clientWidth ?? 0) * progressBarThumb}px`
                    })
                }
            });



        }
    }, [player])


    useEffect(() => {

        if (player !== null) {
            if (isPlaying) {
                (player as any).play();
            } else {
                (player as any).pause();
            }
        }
    }, [isPlaying, player])

    // useEffect(() => {
    //     if (iosPreload) {
    //         (player as any).play();
    //     }
    // }, [iosPreload])
    useEffect(() => {

        if (player !== null) {
            (player as any).volume = playerVolume;
        }
    }, [playerVolume])

    useEffect(() => {
        if (token && stream && player !== null) {
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
            (player as any).source = {
                sources: [source]
            };
            
            if (!isIos()) {
                startPlayer(true);
            }
        }
    }, [stream, token])

    useEffect(() => {

        if (playerVolume === 0) {
            setVolumeSliderState({
                ...volumeSliderState,
                current: 0
            })
        }

        if (playerVolume > 0 && volumeSliderState.current === 0) {
            setVolumeSliderState({
                ...volumeSliderState,
                current: playerVolume * 100
            })
        }

    }, [playerVolume])

    useEffect(() => {
        moveProgressTo();
        seekPosition(progressSliderState.current)
    }, [progressSliderState]);

    useEffect(() => {
        let vNow = volumeSliderState.current;
        if (volumeSliderState.current > volumeSliderState.max) {
            vNow = volumeSliderState.max;
        }

        if (volumeSliderState.current < volumeSliderState.min) {
            vNow = volumeSliderState.min;
        }

        let pos = (volumeSliderRailSize() - vNow);

        if (pos >= volumeSliderState.min && pos < volumeSliderState.max) {
            setVolumeBarThumbPosition({
                ...volumeBarThumbPosition,
                top: pos === 0 ? pos : (volumeSliderState.thumbWidth / 2) + pos
            })
        } else {
            setVolumeBarThumbPosition({
                ...volumeBarThumbPosition,
                top: pos - (volumeSliderState.thumbWidth / 2)
            })
        }
        const volume = (1 - (pos / 100));
        setPlayerVolume(volume)
        //(player as any).volume = volume;

    }, [volumeSliderState]);

    const secondsToHms = (d: any): string => {
        d = Number(d < 0 ? d * -1 : d);

        if (isNaN(d))
            return '00:00'
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h === 0 ? '' : h < 10 ? `0${h}:` : `${h}:`;
        var mDisplay = m < 10 ? "0" + m : m;
        var sDisplay = s < 10 ? "0" + s : s;
        return `${hDisplay}${mDisplay}:${sDisplay}`;

    }

    const fullscreenStateChanged = (state: boolean, handle: FullScreenHandle) => {
        setFullscreen(handle.active);
    }

    const seekPosition = (position: number) => {
        if (player !== null) {
            const theo = (player as any);
            const toSeek = (theo.duration * position) / 100;
            theo.currentTime = toSeek;
        }
    }

    const progressSliderClicked = (ev: any) => {
        const currentPosition = getProgressSliderThumb(ev);

        setProgressSliderState({
            ...progressSliderState,
            current: ((progressSliderState.max - progressSliderState.min) * currentPosition) / progressSliderRailSize()
        })
        ev.preventDefault();
        ev.stopPropagation();
    }
    const volumeSliderClicked = (ev) => {

        const currentPosition = getVolumeSliderThumb(ev);

        setVolumeSliderState({
            ...volumeSliderState,
            current: currentPosition //((progressSliderState.max - progressSliderState.min) * currentPosition) / volumeSliderRailSize()
        });
        ev.preventDefault();
        ev.stopPropagation();
    }

    const getProgressSliderThumb = (ev): number => {
        const sliderOffset = progressSliderState.bar.current?.parentElement?.offsetLeft ?? 0;
        const controlsOffset = videoPlayerControls.current?.offsetLeft ?? 0;
        const videoPlayerOffset = (videoPlayerControls.current as any).offsetParent['offsetLeft']
        return ev.pageX - ((sliderOffset + controlsOffset + videoPlayerOffset));
    }

    const getVolumeSliderThumb = (ev): number => {

        const controlHeight = getValue(volumeSliderState.slider.current?.parentElement?.clientHeight)
        const playerHeight = getValue(videoPlayer.current?.parentElement?.offsetParent?.clientHeight);
        const offsetTop = (videoPlayerControls.current as any).offsetParent['offsetTop'];
        const controllBottomOffset = (getValue(playerHeight) - getValue(videoPlayerControls.current?.offsetTop)) - controlHeight;


        console.log(`ev Y axis  ${ev.pageY}`);
        console.log(`ev Y axis minus player offset  ${ev.pageY - offsetTop}`);
        console.log(`volume slider offset top ${playerHeight - controlHeight - controllBottomOffset}`)

        return (playerHeight - controlHeight - controllBottomOffset) - (ev.pageY - offsetTop);// ev.pageY - (getValue(playerHeight) - sliderBottom);
    }
    const moveProgressTo = () => {
        let vNow = progressSliderState.current;
        if (progressSliderState.current > progressSliderState.max) {
            vNow = progressSliderState.max;
        }

        if (progressSliderState.current < progressSliderState.min) {
            vNow = progressSliderState.min;
        }

        let pos = (progressSliderRailSize() * (vNow / progressSliderState.max)) - (progressSliderState.thumbWidth / 2);

        if (pos >= progressSliderState.min) {
            setProgressBarThumbPosition({
                ...progressBarThumbPosition,
                left: `${pos}px`
            })
        } else {
            setProgressBarThumbPosition({
                ...progressBarThumbPosition,
                left: `${progressSliderState.min}px`
            })
        }
    }

    const progressSliderRailSize = (): number =>
        getValue(progressSliderState.bar.current?.clientWidth);

    const volumeSliderRailSize = (): number =>
        getValue(volumeSliderState.bar.current?.clientHeight);

    const mouseMove = (ev) => {
        if (isMouseDown) {

            const currentPosition = getProgressSliderThumb(ev);
            let progressBarThumb: number = currentPosition;

            if (currentPosition > progressSliderRailSize()) {
                progressBarThumb = progressSliderRailSize();
            } else if (currentPosition < 0) {
                progressBarThumb = progressSliderState.min;
            }

            setProgressBarThumbPosition({
                left: `${progressBarThumb}px`
            })
            ev.preventDefault();
            ev.stopPropagation();
        }

        if (isActive) {
            const toSet: any = setTimeout(() => {
                setActive(false);
            }, 5000)

            if (fadeTimeout !== -1) {
                clearTimeout(fadeTimeout)
            }
            setFadeTimeout(toSet);

        }
        if (!isActive) {
            setActive(true);
        }

        if (isVolumeOpen) {

            setVolumeOpen(true);
            if (volumeFadeTimeout !== -1) {
                window.clearTimeout(volumeFadeTimeout);
            }

            setVolumeFadeTimeout(window.setTimeout(() => {
                setVolumeOpen(false);
            }, 3000));
        }
    }

    const mouseUp = (ev) => {
        if (isMouseDown) {
            setMouseDown(false);
            progressSliderClicked(ev)
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    const progressSliderMouseDown = (ev) => {
        setMouseDown(true);
    }

    const getValue = (d: number | undefined) => {
        return d ?? 0;
    }

    const onMouseEnterVolume = (ev) => {
        setVolumeOpen(true)
        if (volumeFadeTimeout !== -1) {
            window.clearTimeout(volumeFadeTimeout);
        }
        setVolumeFadeTimeout(window.setTimeout(() => {
            setVolumeOpen(false)
        }, 3000));
    }

    const onEnterFullscreen = (ev) => {
        if (isIos()) {
            setIosFullscreenStyle({
                zIndex: 2147483004,
                width: '100vw',
                height: '100vh',
                display: 'block',
                position: 'fixed',
                top: 0,
                left: 0
            });
            setFullscreen(true);
        } else {
            handle.enter();
        }
    }

    const onExitFullscreen = () => {
        if (!isIos()) {
            handle.exit();
        }
        else {
            setFullscreen(false);
            setIosFullscreenStyle({});
        }
    }


    return (
        <FullScreen handle={handle} onChange={fullscreenStateChanged}>
            <div
                id={'videoPlayer'}
                className={styles['video-player']}
                style={iosFullscreenStyle}
                ref={videoPlayer}
                onMouseMove={mouseMove}
                onMouseUp={mouseUp}
                onMouseLeave={() => { setActive(false); setVolumeOpen(false) }}
                onMouseEnter={() => setActive(true)}
            >

                {
                    <div
                        role={'button'}
                        className={styles['video-player__loader']}>
                        {

                            ((isLoading || isPlayerLoading) && isPlaying) &&
                            <svg className={styles['video-player__spinner']} role="presentation">
                                <use xlinkHref="#icon-spinner"></use>
                            </svg>
                        }
                        {
                            (isPlayerLoading && !isPlaying && isIos()) &&

                            <svg
                                className={styles['video-player__big-play']}
                                role="presentation" onClick={() => startPlayer(true)}>
                                <use xlinkHref="#icon-play"></use>
                            </svg>
                        }
                    </div>
                }
                <span className={logoStyles}>
                    <svg className={styles['video-player__logo__icon']} role="presentation">
                        <use xlinkHref="#icon-live-logo"></use>
                    </svg>
                </span>
                <div className={controlStyles} ref={videoPlayerControls}>

                    {
                        props.isLive &&
                        <button className={styles['video-player__controls-button']}>
                            <svg className={styles['video-player__controls-button-group__icon']} role="presentation">
                                <use xlinkHref="#icon-mini-live"></use>
                            </svg>
                            <span className="screen-reader-text">Live</span>
                            <span className={styles['live-indicator-text']}>&nbsp;LIVE</span>
                        </button>
                    }
                    <div className={styles['video-player__controls-button-group']}>
                        <>
                            {
                                !isPlaying &&
                                <button className={styles['video-player__controls-button']} onClick={() => startPlayer(true)} >
                                    <svg className={styles['video-player__controls-button-group__icon']} role="presentation">
                                        <use xlinkHref="#icon-mini-play"></use>
                                    </svg>
                                    <span className="screen-reader-text">Play</span>
                                </button>
                            }
                            {
                                isPlaying &&
                                <button className={styles['video-player__controls-button']} onClick={() => { startPlayer(false) }} >
                                    <svg className={styles['video-player__controls-button-group__icon']} role="presentation">
                                        <use xlinkHref="#icon-mini-pause"></use>
                                    </svg>
                                    <span className="screen-reader-text">Pause</span>
                                </button>

                            }
                        </>
                        <span className={styles['video-player__controls-volume-group']}>
                            <div
                                ref={volumeSliderState.slider}
                                className={volumeSliderStyles2}
                                style={volumeSliderStyles}
                                onClick={volumeSliderClicked}>
                                <div
                                    className={styles['video-player__controls-volume-slider__bar']}
                                    ref={volumeSliderState.bar}>
                                    <div
                                        className={styles['video-player__controls-volume-slider__indicator']}
                                        role="slider"
                                        style={volumeBarThumbPosition}
                                        aria-orientation="vertical"
                                        aria-valuemin={volumeSliderState.min}
                                        aria-valuenow={volumeSliderState.current}
                                        aria-valuemax={volumeSliderState.max}></div>
                                </div>
                            </div>
                            <button
                                className={styles['video-player__controls-button']}
                                onMouseEnter={onMouseEnterVolume}
                                onClick={() => setPlayerVolume(playerVolume === 0 ? 1 : 0)} >
                                {
                                    playerVolume > 0 &&
                                    <svg className={styles['video-player__controls-button-group__icon']} role="presentation">
                                        <use xlinkHref="#icon-video-volume"></use>
                                    </svg>
                                }
                                {
                                    playerVolume === 0 &&
                                    <svg className={styles['video-player__controls-button-group__icon']} role="presentation">
                                        <use xlinkHref="#icon-video-mute"></use>
                                    </svg>
                                }
                                <span className="screen-reader-text">Volume</span>
                            </button>
                        </span>
                    </div>
                    <div
                        className={styles['video-player__controls-progress']}
                        ref={progressSliderState.slider}
                        onMouseDown={progressSliderMouseDown}
                        onClick={progressSliderClicked}>
                        <div
                            className={styles['video-player__controls-progress__bar']}
                            ref={progressSliderState.bar}>

                            <div className={styles['video-player__controls-progress__indicator']}
                                style={progressBarThumbPosition}
                                role="slider"
                                aria-valuemin={progressSliderState.min}
                                aria-valuenow={progressSliderState.current}
                                aria-valuemax={progressSliderState.max}></div>
                        </div>
                    </div>
                    <div className={styles['video-player__controls-counter']} >
                        <button className={styles['video-player__controls-counter-time']} >
                            -&nbsp;{elapsedTime}
                        </button>
                    </div>
                    <div className={styles['video-player__controls-button-close']} >
                        {
                            !isFullscreen &&
                            <button className={styles['video-player__controls-button']} >
                                <svg className={styles['video-player__controls-button-group__icon']} role="presentation" onClick={onEnterFullscreen}>
                                    <use xlinkHref="#icon-video-fullscreen"></use>
                                </svg>
                                <span className="screen-reader-text">Enter full screen</span>
                            </button>
                        }
                        {
                            isFullscreen &&
                            <button className={styles['video-player__controls-button']} >
                                <svg className={styles['video-player__controls-button-group__icon']} role="presentation" onClick={onExitFullscreen}>
                                    <use xlinkHref="#icon-mini-close"></use>
                                </svg>
                                <span className="screen-reader-text">Exit full screen</span>
                            </button>
                        }
                    </div>
                </div>
            </div >
        </FullScreen >
    )

}

export default VideoPlayer