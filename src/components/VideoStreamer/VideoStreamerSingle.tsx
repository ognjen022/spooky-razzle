import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import styles from './VideoStreamer.module.scss'

import PurchaseButton from '../PurchaseButton/PurchaseButton'
import { ITag, IStream, VideoStream, ITagIndex, VideoStreamStatus, StreamTypes } from '../../services/content/tags/models'
import { filterStreams, getTagsFull, selectVideoStreamStatus, isStreamLive } from '../../services/content/tags/selectors'
import SaveStreamButton from '../../components/SaveButtons/SaveStreamButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../services/RootState'
import { Stream } from 'stream'
import { useParams, Link } from 'react-router-dom'
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors'
import { push, goBack } from 'connected-react-router'
import PlayButton from '../PlayButton/PlayButton'
import { getInitials, isMobile } from '../../utils/utils'
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events'
import EventSeoHead from '../SeoHead/EventSeoHead'
import LazyImage from '../LazyImage/LazyImage'
import VideoPlayerDefault from '../VideoPlayer/VideoPlayerDefault'
import TracTracPlayer from '../VideoPlayer/TracTracPlayer'
import Button from '../Button/Button'
import { relative } from 'path'
interface VideoStreamerProps {

}

enum mainScreen {
  tracTrac = 'tractrac',
  stream = 'stream'
}

const VideoStreamerSingle: React.FC<VideoStreamerProps> = (props) => {
  const videoPlayer = React.createRef<any>();
  const { eventIdParam } = useParams() as any
  const eventId: number = parseInt(eventIdParam)

  const uniqueId = uuidv4()
  const [playing, setPlaying] = useState(false)
  const [, setShowModal] = useState(false)
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])
  const isLoggedIn = useSelector<RootState, boolean>(state => selectIsLoggedIn(state.userSecurity.token))
  const dispatch = useDispatch()

  const streams = useSelector<RootState, IStream[] | undefined>(state => state.content.tags.streams)
  const stream: IStream | undefined = _.find(streams || [], (stream: IStream) => stream.eventId === eventId)

  if (!stream) dispatch(goBack())

  const videoStreamStatus = useSelector<RootState, VideoStreamStatus>(state => selectVideoStreamStatus(state, stream))
  const [tracTracSources, setTractracSources] = useState<any>([]);
  const [streamProgress, setStreamProgress] = useState<number>(0);
  const [tracTrac, setTracTrac] = useState(false);
  const [streamerMainScreen, setStreamerMainScreen] = useState(mainScreen.stream);
  // No stream or liveStreams?
  let hasVideoStream = (stream && stream.videoStreams && stream.videoStreams?.length > 0)
  let hasBroadcast = stream && isStreamLive(stream.startTime, stream.duration);
  let autoPlay = hasVideoStream && hasBroadcast && isLoggedIn
  const lineUpTagsFull: ITag[] = stream ? getTagsFull(stream.lineUpTags, uuidIndex) : []

  const [tracTracSource, setTractracSource] = useState<any>(undefined);
  if (!stream) return (<></>)

  const getLivestreamEventId = (stream: IStream): string => {
    if (!stream || !stream.videoStreams || stream.videoStreams.length === 0) {
      return ''
    }

    return stream.videoStreams.filter(stream => stream.streamType === StreamTypes.MatchStream)[0].liveStreamEventId
  }

  const getLiveEventVideoIdUrlParam = (stream: IStream): number => {
    if (!stream || !stream.videoStreams || stream.videoStreams.length === 0 || !stream.videoStreams[0].liveEventVideoId) {
      return 0
    }
    return stream.videoStreams.filter(stream => stream.streamType === StreamTypes.MatchStream)[0].liveEventVideoId//`&videoId=${stream.videoStreams[0].liveEventVideoId}`
  }

  const getTracTracSources = (stream: IStream) : VideoStream[] => {
  
    return stream.videoStreams.filter(stream => stream.streamType === StreamTypes.TracTracStream)
  }

  const cropImageIfMobile = (imageUri: string): string => {
    
    if (isMobile()) {
      return `${imageUri}?width=640&height=360&mode=crop`
    }
    return `${imageUri}?width=2560&height=1440&mode=crop`;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if(tracTrac) {
      
      const sources = getTracTracSources(stream).map((val, index) => ({
        id: uuidv4(),
        streamName:  val.streamName,
        source: val.tractracSource,
        previewImage: val.previewImage
      }));
      setTractracSources(sources)
      setTractracSource(sources[0]);

      setStreamerMainScreen(mainScreen.tracTrac);
    }
  }, [tracTrac])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (stream) {
      setTracTrac(!isMobile() && stream.videoStreams.filter(vs => vs.streamType === StreamTypes.TracTracStream).length > 0);
    }
  }, [stream])
  
  console.log(stream, tracTracSource);
  return (
    <div className="container">
      <EventSeoHead stream={stream} />
      {
        tracTrac ? 
        (
        <div className={styles['video-streamer-wrapper']}>
          <div className={styles['video-streamer__details']}>
            <div className={styles['video-streamer']}>
              <div className="aspect-ratio-16-9">
                {playing && tracTracSource ?
                  (
                    streamerMainScreen === mainScreen.tracTrac ? 
                    (
                      <TracTracPlayer 
                        tracTracSource={tracTracSource.source}></TracTracPlayer>
                    ) : 
                    (
                      <VideoPlayerDefault 
                        position={streamProgress}
                        eventId={getLivestreamEventId(stream)} 
                        videoId={getLiveEventVideoIdUrlParam(stream)}
                        isLive={false} ></VideoPlayerDefault>
                    )
                  ) : (
                    <>
                      {
                        streamerMainScreen === mainScreen.tracTrac ? 
                        (
                          <LazyImage src={cropImageIfMobile(tracTracSource?.previewImage ? `${tracTracSource?.previewImage}` : stream?.image ? `${stream?.image}` : 'https://via.placeholder.com/2560x1440.png')} alt="" />
                        ) :
                        (
                          <LazyImage src={cropImageIfMobile(stream?.image ? `${stream?.image}` : 'https://via.placeholder.com/2560x1440.png')} alt="" />
                        )
                      }
                      <PlayButton
                        stream={stream}
                        className={'calendar-video__play-icon'}
                        playStream={() => setPlaying(true)}
                        mobileRedirectUrl={undefined}
                      />
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div className={styles['video-streamer__details']}>
            <div className={styles['video-streamer']}>
              <div className="aspect-ratio-16-9">
                {playing ?
                  (
                    streamerMainScreen === mainScreen.tracTrac ? 
                    (
                      <VideoPlayerDefault 
                        position={streamProgress}
                        eventId={getLivestreamEventId(stream)} 
                        videoId={getLiveEventVideoIdUrlParam(stream)}
                        isLive={false} ></VideoPlayerDefault>
                    ) : 
                    (
                      <TracTracPlayer 
                        tracTracSource={tracTracSource.source}></TracTracPlayer>
                    )
                  ) : (
                    <>
                      {
                        streamerMainScreen === mainScreen.tracTrac ? 
                        (
                          <LazyImage src={cropImageIfMobile(stream?.image ? `${stream?.image}` : 'https://via.placeholder.com/2560x1440.png')} alt="" />
                        ) :
                        (
                          <LazyImage src={cropImageIfMobile(tracTracSource?.previewImage ? `${tracTracSource?.previewImage}` : stream?.image ? `${stream?.image}` : 'https://via.placeholder.com/2560x1440.png')} alt="" />
                        )
                      }
                      <PlayButton
                        stream={stream}
                        className={'calendar-video__play-icon'}
                        playStream={() => setPlaying(true)}
                        mobileRedirectUrl={undefined}
                      />
                    </>
                  )
                }
              </div>
            </div>
            {
              tracTrac && 
              <>
                {
                  !isMobile() && stream.videoStreams.filter(vs => vs.streamType === StreamTypes.TracTracStream).length > 0 && tracTrac &&

                    <Button 
                      onClick={() => setStreamerMainScreen(streamerMainScreen === mainScreen.tracTrac ? mainScreen.stream : mainScreen.tracTrac)}
                      color={'ghost-green'}
                      label="swap main screen">
                    </Button>
                }
                <div className={styles['video-streamer__tractrac-feed']} >
                  <span>TracTrac Feeds</span>
                  <ul>
                    {tracTracSources.map((item, index) => {
                      return (<li><Link to={'#'} 
                      style={{
                    fontWeight: tracTracSource.id === item.id ? 'bold' : 'normal'
                  }} 
                  onClick={() => setTractracSource(item)}>{item.streamName}</Link></li>);
                    })}
                  </ul>
                </div>
              </>
              
            }
          </div>
        </div>
        ) :
        (<div className={styles['video-streamer']}>
          <div className="aspect-ratio-16-9">
            {playing ?
              (
                <VideoPlayerDefault 
                  eventId={getLivestreamEventId(stream)} 
                  videoId={getLiveEventVideoIdUrlParam(stream)}
                  position={streamProgress}
                  onTimeUpdate={ev => setStreamProgress(ev)}
                  isLive={false} ></VideoPlayerDefault>
                // <iframe title="Video Player" src={`/video-player/index.html?eventId=${getLivestreamEventId(stream)}${getLiveEventVideoIdUrlParam(stream)}`} allowFullScreen></iframe>
              ) : (
                <>
                  <LazyImage src={cropImageIfMobile(stream?.image ? `${stream.image}` : 'https://via.placeholder.com/2560x1440.png')} alt="" />
                  <PlayButton
                    stream={stream}
                    className={'calendar-video__play-icon'}
                    playStream={() => setPlaying(true)}
                    mobileRedirectUrl={undefined}
                  />
                </>
              )
            }


          </div>
        </div>)
      }
      <div className={styles['video-streamer-content']}>
        <div className={styles['video-streamer__details']}>
          <div className={styles['video-stream__details-wrapper']}>
            
            <div className={styles['video-streamer__date-label']}>
              <span>{moment(stream.startTime).format('ddd Do MMM YYYY') /* TUE 7th Jan 2020 */}</span>
            </div>
          </div>
          <h2 className={styles['video-streamer__details-name']}> {stream.name}</h2>
          <div className={styles['video-streamer__actions']}>
            <SaveStreamButton
              suffix="to my stream" 
              className={styles['video-streamer__tractrac']} 
              stream={stream}></SaveStreamButton>
            
          </div>
          <p>{stream.description}</p>
          <div className={styles['video-streamer-socials-wrapper']}>
            <nav className={styles['video-streamer-social-nav']}>
              {/*
              <ul className={styles['video-streamer-social-nav__list']}>
                <li className={styles['video-streamer-social-nav__list-item']}>

                  <a href="/#" className={styles['video-streamer-social-nav__link']}>
                    <svg className="icon" role="presentation">
                      <use xlinkHref="#icon-social-facebook"></use>
                    </svg>
                    <span className="screen-reader-text">Facebook</span>
                  </a>

                </li>
                <li className={styles['video-streamer-social-nav__list-item']}>
                  <a href="/#" className={styles['video-streamer-social-nav__link']}>
                    <svg className="icon" role="presentation">
                      <use xlinkHref="#icon-social-twitter"></use>
                    </svg>
                    <span className="screen-reader-text">Twitter</span>
                  </a>

                </li>
              </ul>
              */}
            </nav>
          </div>

        </div>
        <div className={styles['video-streamer-teams-vs-wrapper']}>
          <div className={styles['inner-wrapper']}>
            {
              (videoStreamStatus === VideoStreamStatus.NotPurchased || videoStreamStatus === VideoStreamStatus.NotPurchasedNotLoggedIn) &&
              <div className={styles['video-stream-teams-vs-header']}>
                <span>Purchase Options</span>
              </div>
            }
            {lineUpTagsFull?.length >= 2 &&
              <ul className={styles['video-streamer-teams-vs-list']}>

                <li className={styles['video-streamer-teams-vs-list__images']}>
                  <div className={styles['video-streamer-teams-vs-list__image']}>
                    <LazyImage src={lineUpTagsFull[0].icon} alt="" />
                  </div>
                  <div className={styles['video-streamer-teams-vs-list__image']}>
                    <LazyImage src={lineUpTagsFull[1].icon} alt="" />
                  </div>
                </li>
                <li className={styles['video-streamer-teams-vs-list__names']}>
                  <span>
                    <Link to={lineUpTagsFull[0].path || '#'}>{lineUpTagsFull[0].name}</Link>
                  </span>
                  <div className={styles['video-streamer-teams-vs-list__versus-span']}>Vs</div>
                  <span>
                    <Link to={lineUpTagsFull[1].path || '#'}>{lineUpTagsFull[1].name}</Link>
                  </span>
                </li>
              </ul>
            
            }
            
            <PurchaseButton classNames={`${styles['video-streamer-teams-vs-list__actions']} ${lineUpTagsFull?.length < 2 ? styles['video-streamer-teams-vs-list__actions--offset'] : ''}`} mainTag={undefined} stream={stream} />

          </div>
          <div className={styles['video-streamer-socials-wrapper-mobile']}>
            <nav className={styles['video-streamer-social-nav']}>
              {/*
              <ul className={styles['video-streamer-social-nav__list']}>
                <li className={styles['video-streamer-social-nav__list-item']}>

                    <a href="/#" className={styles['video-streamer-social-nav__link']}>
                      <svg className="icon" role="presentation">
                        <use xlinkHref="#icon-social-facebook"></use>
                      </svg>
                      <span className="screen-reader-text">Facebook</span>
                    </a>
                </li>
                <li className={styles['video-streamer-social-nav__list-item']}>
                  <a href="/#" className={styles['video-streamer-social-nav__link']}>
                    <svg className="icon" role="presentation">
                      <use xlinkHref="#icon-social-twitter"></use>
                    </svg>
                    <span className="screen-reader-text">Twitter</span>
                  </a>
                </li>
              </ul>
                  */}
            </nav>
          </div>
        </div>
        
      </div>
    </div >
  )
}

export default VideoStreamerSingle
