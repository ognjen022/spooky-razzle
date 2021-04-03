import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

import PurchaseButton from '../PurchaseButton/PurchaseButton'
import SaveStreamButton from '../SaveButtons/SaveStreamButton'
import { ITag, IStream, ITagIndex, VideoStreamStatus } from '../../services/content/tags/models'
import { filterStreams, getTagsFull, selectVideoStreamStatus, isStreamLive } from '../../services/content/tags/selectors'
import PremiumContent from '../../components/PremiumContent/PremiumContent'
import PlayButton from '../../components/PlayButton/PlayButton'
import LineUpIcon from '../../components/LineUpIcon/LineUpIcon'
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../services/RootState';
import LazyImage from '../LazyImage/LazyImage';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoPlayerDefault from '../VideoPlayer/VideoPlayerDefault';
import { isIos, truncateString } from '../../utils/utils';
import { push } from 'connected-react-router';

interface VideoSingleCarousel2Props {
  mainTag: ITag | undefined
  streams: IStream[]
  limit: number
  filterTag: ITag | undefined
  uuidIndex: ITagIndex[]
}

const VideoSingleCarousel2: React.FC<VideoSingleCarousel2Props> = (props: VideoSingleCarousel2Props) => {

  const isMobile = window.innerWidth <= 768;
  const pathName = useSelector<RootState, any>(state => state.router?.location?.pathname)
  let showSave = true;
  if(isMobile) {
    showSave = pathName !== '/my-streams';
  }

  const filteredStreams = filterStreams(props.streams, props.limit, props.filterTag)
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0)
  // const [currentStream, setCurrentStream] = useState(allStreams[currentStreamIndex])
  const videoStreamStatusFromRedux = useSelector<RootState, VideoStreamStatus>(state => selectVideoStreamStatus(state, filteredStreams[currentStreamIndex]))
  const [videoStreamStatus, setVideoStreamStatus] = useState(videoStreamStatusFromRedux)

  useEffect(() => {
    setVideoStreamStatus(videoStreamStatusFromRedux)
  }, [videoStreamStatusFromRedux])

  // This will add support for multiple instances of Glide in the same page
  const glideInstanceId = "glide-id_" + uuidv4();
  const glideInstanceClassName = `.${glideInstanceId} .glide`

  useEffect(() => {

    if ((window as any).__NewGlide) {

      if (props.streams?.length > 0) {

        let videoSingleCarouselGlide: any = (window as any).__NewGlide(glideInstanceClassName, {
          type: 'carousel',
          hoverpause: true,
          perView: 1,
          animationTimingFunc: 'ease-in-out',
          animationDuration: 1000,
          breakpoints: {
            768: {
              animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // default 
              animationDuration: 400
            }
          }
        })
        if (videoSingleCarouselGlide) {


          videoSingleCarouselGlide.on(['mount.after', 'run'], function () {
            let index = videoSingleCarouselGlide.index;
            setCurrentStreamIndex(index);
          });

          if (filteredStreams.length > 1)
            videoSingleCarouselGlide.mount()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (filteredStreams === undefined || filteredStreams?.length === 0) return (<></>)

  const renderSlide = (stream: IStream, index: number, lineUpTagsFull: ITag[]) => (
    
    <li className="glide__slide" key={index}>
      <div className="video-single-carousel__slider-inner">

        <ImageVideoSwitch stream={stream} index={currentStreamIndex} showSave={showSave} />

        <div className="video-single-carousel__content">
          <div className="video-single-carousel__content-inner">
            <h2><Link to={`/play/${stream.eventId}`}><span className="line-clamp-3">{truncateString(stream.name, 50)}</span></Link></h2>
            <p><span className="line-clamp-4">{stream.description}</span></p>
            {
              lineUpTagsFull && lineUpTagsFull.length > 0 &&
              <ul className="teams-vs-list">
                {
                  lineUpTagsFull?.map((lineupTag, lineupIndex) => (
                    <li className="teams-vs-list__item" key={lineupIndex}>
                      <LineUpIcon
                        stream={stream}
                        className={'teams-vs-list__image'}
                        orderNumber={lineupIndex}
                        lineUpTagsFull={lineUpTagsFull}
                      />
                      <span className="teams-vs-list__name">
                        <Link to={lineupTag.path || '#'}>{lineupTag.name}</Link>
                      </span>
                    </li>
                  ))
                }
              </ul>
            }
          </div>
          {/* { 
            stream.videoStreams && stream.videoStreams.length > 0 &&
              <div className="video-single-carousel__content-footer" id={`vsc2_div2_${uuidv4()}`}>
                <PurchaseButton stream={stream} mainTag={undefined} />
              </div>
          } */}
        </div>
      </div>
    </li>
  )

  return (
    <section>
      <div className="container">
        <div className="video-single-carousel">
          <div className="video-single-carousel__inner">
            <div className="video-single-carousel__controls">
              <div className="video-single-carousel__counter">
                <span className="video-single-carousel__counter-current">{currentStreamIndex + 1} </span> / <span className="video-single-carousel__counter-total">{filteredStreams?.length}</span>
              </div>
            </div>
            <div className="video-single-carousel__label">
              <Link to={`${props.filterTag?.path}`}>
                <span>{props.filterTag?.name}</span>
              </Link>
              <Link to={`${props.filterTag?.path}`}>
                <h2>{props.filterTag?.name}</h2>
              </Link>
            </div>

            <div className={`video-single-carousel__slider ${glideInstanceId}`} >
              <div className="glide">
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                    {filteredStreams.map((stream, index) =>
                      renderSlide(stream, index, getTagsFull(stream.lineUpTags, props.uuidIndex))
                    )}
                  </ul>
                </div>
                {filteredStreams.length > 1 &&
                  <div data-glide-el="controls" className="glide__arrows">
                    <button data-glide-dir="<" className="glide__button-prev">
                      <svg className="icon" role="presentation">
                        <use xlinkHref="#icon-chevron-left"></use>
                      </svg>
                      <span className="screen-reader-text">Previous Slide</span>
                    </button>
                    <button data-glide-dir=">" className="glide__button-next">
                      <svg className="icon" role="presentation">
                        <use xlinkHref="#icon-chevron-right"></use>
                      </svg>
                      <span className="screen-reader-text">Next Slide</span>
                    </button>
                  </div>}
              </div>
            </div >
          </div >
        </div >
      </div >
    </section >
  )
}

export default VideoSingleCarousel2

interface IImageVideoSwitchProps {
  stream: IStream
  index: number
  showSave: boolean
}

const ImageVideoSwitch: React.FC<IImageVideoSwitchProps> = ({ stream, index, showSave }) => {
  // const showPlayButton = stream && stream.startTime && moment(stream.startTime) < moment() && stream.videoStreams && stream.videoStreams.length > 0
  const [displayStream, setDisplayStream] = useState<boolean>(false)

  const openDisplayStream = () => {
    push(`/play/${stream.eventId}`);//setDisplayStream(true)
  }

  const closeDisplayStream = () => {
    setDisplayStream(false)
  }

  useEffect(() => {
    closeDisplayStream();
  }, [index])

  const getLivestreamEventId = (stream: IStream): string => {
    if (!stream || !stream.videoStreams || stream.videoStreams.length === 0) {
      return ''
    }

    return stream.videoStreams[0].liveStreamEventId
  }

  const getLiveEventVideoIdUrlParam = (stream: IStream): number | undefined => {
    if (!stream || !stream.videoStreams || stream.videoStreams.length === 0 || !stream.videoStreams[0].liveEventVideoId) {
      return undefined
    }

    return stream.videoStreams[0].liveEventVideoId;
  }

  const cropImageIfMobile = (imageUri: string): string => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    if (toMatch.some((item) => navigator.userAgent.match(item))) {
      return `${imageUri}?width=640&height=360&mode=crop`
    }
    return `${imageUri}?width=1280&height=720&mode=crop`;
  }

  return (
    <div className={'video-single-carousel__image'}>
      {displayStream ?
        (
          <>
            <button className={'calendar-video__close-button'} onClick={closeDisplayStream}>
              <svg className="icon" role="presentation">
                <use xlinkHref="#icon-mini-close"></use>
              </svg>
              <span className="screen-reader-text">Close</span>
            </button>
            {stream.videoStreams && stream.videoStreams.length > 0 &&
              <div className="aspect-ratio-16-9">
                {/* <iframe
                  title="Video Player (VSC)"
                  className={'video-multi-carousel__iframe'}
                  src={`/video-player/index.html?eventId=${getLivestreamEventId(stream)}${getLiveEventVideoIdUrlParam(stream)}`}
                  allowFullScreen>
                </iframe> */}
                <VideoPlayerDefault
                  onTimeUpdate={()=>{}}
                  position={0}
                  isLive={true}
                  eventId={getLivestreamEventId(stream)}
                  videoId={getLiveEventVideoIdUrlParam(stream)}></VideoPlayerDefault>

              </div>
            }
          </>
        )
        :
        (
          <>
            <div className="aspect-ratio-16-9">
              <Link to={`/play/${stream.eventId}`}>
                <LazyImage src={cropImageIfMobile(stream.image ? `${stream.image}` : 'https://via.placeholder.com/2560x1440.png')} alt={stream.name} /></Link>
            </div>
            <div className="video-single-carousel__premium">
              <PremiumContent stream={stream} className={'icon'} />
            </div>

            {isStreamLive(stream.startTime, stream.duration) ?
              <>
                <div className="video-single-carousel__live-indicator">
                  <svg className="icon" role="presentation">
                    <use xlinkHref="#icon-live"></use>
                  </svg>
                  <span>Live</span>
                </div>
              </>
              :
              <>
                {showSave &&
                  <SaveStreamButton stream={stream} suffix="to My Stream" className={'video-single-carousel__video-options-toggle'} />}
              </>
            }

            <div className="video-single-carousel__date-time">
              <span className="video-single-carousel__date">
                {moment(stream.startTime).format('ddd Do MMM YYYY')}
                <span className="video-single-carousel__time">- {moment(stream.startTime).format('h.mm A')}</span>
              </span>
            </div>

            <PlayButton
              stream={stream}
              className={'calendar-video__play-icon'}
              playStream={() => push(`/play/${stream.eventId}`)}
              mobileRedirectUrl={isIos() ?  `/play/${stream.eventId}` : undefined}
            />

          </>
        )}
    </div >
  )
}
