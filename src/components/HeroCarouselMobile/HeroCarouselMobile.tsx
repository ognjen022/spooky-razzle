import React, { useState, useRef } from 'react'

import moment from 'moment'

import { ITag, IStream } from '../../services/content/tags/models'
import { filterStreams } from '../../services/content/tags/selectors'
import SaveStreamButton from '../SaveButtons/SaveStreamButton'
import { Link } from 'react-router-dom'
import LazyImage from '../LazyImage/LazyImage'
import { truncateString } from '../../utils/utils'


interface HeroCarouselMobileProps {
  mainTag: ITag | undefined
  streams: IStream[]
  filterTag: ITag | undefined
  limit: number
}

const HeroCarouselMobile: React.FC<HeroCarouselMobileProps> = (props: HeroCarouselMobileProps) => {

  const filteredStreams = filterStreams(props.streams, props.limit, props.filterTag)

  const [activePanelNumber, setActivePanelNumber] = useState<number>(0); // set active the first panel

  const mainTag = props.mainTag

  const handlePanelClick = (panel: number) => {
    setActivePanelNumber(panel)
  }

  const renderSlide = (stream: IStream, index: number) => (
    <div
      className={`hero-carousel-mobile__slide ${activePanelNumber === index ? 'is-active' : ''}`}
      onClick={() => handlePanelClick(index)}
      key={index}
    >
      <div className={`hero-carousel-mobile__image ${activePanelNumber === index ? 'is-active' : ''}`}>
        <button className="hero-carousel-mobile__button">
          <span className="screen-reader-text">Toggle slide</span>
        </button>
        <div className="hero-carousel-mobile__counter">
          {index + 1} / {filteredStreams?.length}
        </div>
        <LazyImage src={stream.image ? `${stream.image}?width=640&height=360&mode=crop` : ''} alt={stream.name} />
        <div className="hero-carousel-mobile__date">{moment(stream.startTime).format('ddd Do MMM YYYY - h.mm A')}</div>
        <SaveStreamButton
          stream={stream}
          className={`hero-carousel-mobile__save ${activePanelNumber === index ? 'is-active' : ''}`}
        />
      </div>
      <div className={`hero-carousel-mobile__content ${activePanelNumber === index ? 'is-active' : ''}`}>
        <div className={`hero-carousel-mobile__content-inner ${activePanelNumber === index ? 'is-active' : ''}`}>
          <Link to={`/play/${stream.eventId}`}>
            <h2>{truncateString(stream.name, 50)}</h2>
          </Link>
          {stream?.description && <p>{stream.description}</p>}
        </div>
      </div>
    </div>
  )

  if (mainTag === undefined || props.streams?.length === 0) return (<div>No streams</div>)

  return (
    <section>
      <div className="container">
        <div className="hero-carousel-mobile">
          <div className="hero-carousel-mobile__label">
            <Link to={`${props.filterTag?.path}`}>
              <h2>Featured</h2>
            </Link>
          </div>
          <div className="hero-carousel-mobile__slides">

            {filteredStreams.map((stream, index) =>
              renderSlide(stream, index)
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCarouselMobile
