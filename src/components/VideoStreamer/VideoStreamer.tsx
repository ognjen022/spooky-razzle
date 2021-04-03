import React, { useState } from 'react'
import _ from 'lodash'
import moment from 'moment'

import styles from './VideoStreamer.module.scss'

import PurchaseButton from '../PurchaseButton/PurchaseButton'
import { ITag, IStream, ITagIndex } from '../../services/content/tags/models'
import { filterStreams, getTagsFull } from '../../services/content/tags/selectors'
import SaveStreamButton from '../../components/SaveButtons/SaveStreamButton'
import { Link } from 'react-router-dom'
import LazyImage from '../LazyImage/LazyImage'
import VideoPlayerDefault from '../VideoPlayer/VideoPlayerDefault'

interface VideoStreamerProps {
  mainTag: ITag | undefined
  streams: IStream[]
  filterTag: ITag | undefined
  uuidIndex: ITagIndex[]
}

const VideoStreamer: React.FC<VideoStreamerProps> = (props: VideoStreamerProps) => {

  const [, setShowModal] = useState(false);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0)

  const filteredStreams = filterStreams(props.streams, 12, props.filterTag)

  // No live streams?
  if (!filteredStreams || filterStreams.length === 0) return <span>No Live Streams: {props.streams.length}</span>

  let liveNowStream: IStream | undefined
  liveNowStream = filteredStreams[currentStreamIndex]

  const lineUpTagsFull: ITag[] = liveNowStream ? getTagsFull(liveNowStream.lineUpTags, props.uuidIndex) : []

  const nextLiveStream = () => {
    setCurrentStreamIndex(currentIndex => currentIndex + 1)
  }

  const prevLiveStream = () => {
    setCurrentStreamIndex(currentIndex => currentIndex - 1)
  }


  return (
    <div className="container">
      <div className={styles['video-streamer']}>
        <div className="aspect-ratio-16-9">
          {liveNowStream && liveNowStream.videoStreams && liveNowStream.videoStreams.length > 0 &&
          
          <VideoPlayerDefault 
            position={0}
            onTimeUpdate={e => {}}
            isLive={true} 
            eventId={liveNowStream.videoStreams[currentStreamIndex].liveStreamEventId} 
            videoId={liveNowStream.videoStreams[0].liveEventVideoId}></VideoPlayerDefault>
            
            // <iframe title="Video Player" src={`/video-player/index.html?eventId=${liveNowStream.videoStreams[currentStreamIndex].liveStreamEventId}&videoId=${liveNowStream.videoStreams[0].liveEventVideoId}&isLive=true`} allowFullScreen></iframe>
          }
          <div className={styles['video-streamer-arrow-icons']}>
            <div style={{ visibility: currentStreamIndex === 0 ? 'hidden' : 'initial' }} onClick={prevLiveStream} className={styles['video-streamer-arrow-icon-left']}>
              <svg className={styles['streamer-icon']} role={'presentation'}>
                <use xlinkHref={'#icon-chevron-left'}></use>
              </svg>
            </div>

            <div style={{ visibility: currentStreamIndex === liveNowStream.videoStreams.length - 1 ? 'hidden' : 'initial' }} onClick={nextLiveStream} className={styles['video-streamer-arrow-icon-right']}>
              <svg className={styles['streamer-icon']} role={'presentation'}>
                <use xlinkHref={'#icon-chevron-right'}></use>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={styles['video-streamer-content']}>
        <div className={styles['video-streamer-teams-vs-wrapper']}>
          <div className={styles['inner-wrapper']}>
            {lineUpTagsFull?.length >= 2 &&
              <ul className={styles['video-streamer-teams-vs-list']}>

                <li className={styles['video-streamer-teams-vs-list__images']}>
                  <span className={styles['video-streamer-teams-vs-list__image']}>
                    <LazyImage src={lineUpTagsFull[0].image} alt="" />
                  </span>
                  <span className={styles['video-streamer-teams-vs-list__image']}>
                    <LazyImage src={lineUpTagsFull[1].image} alt="" />
                  </span>
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
            <PurchaseButton stream={liveNowStream} mainTag={props.mainTag} />
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
        <div className={styles['video-streamer__details']}>
          <h2> {liveNowStream.name}</h2>
          <p>{liveNowStream.description}</p>

          <div className={styles['video-streamer__date-label']}>
            <span>{moment(liveNowStream.startTime).format('ddd Do MMM YYYY') /* TUE 7th Jan 2020 */}</span>
          </div>
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
          <SaveStreamButton 
            suffix="to my stream" 
            className={styles['video-streamer__save-indicator']} 
            stream={liveNowStream}></SaveStreamButton>

        </div>
      </div>
    </div >
  )
}

export default VideoStreamer
