import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../../services/RootState'
import { ITag, IStream, ITicker, ITagIndex } from '../../services/content/tags/models'
import { selectMainTag, selectParentTag, selectMainTagStreams, selectTag, selectHasLoaded } from '../../services/content/tags/selectors'

import VideoMultiCarouselNew from '../../components/VideoMultiCarouselNew/VideoMultiCarouselNew'
import Ticker from '../../components/Ticker/Ticker'
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel'
import Schedule from '../../scenes/Schedule/Schedule'
import VideoSingleCarousel2 from '../../components/VideoSingleCarousel/VideoSingleCarousel2'
import CopyStatement from '../../components/CopyStatement/CopyStatement'
import LineUpMulti from '../../components/LineUpMulti/LineUpMulti'
import Calendar from '../../scenes/Calendar/Calendar'
import Spinner from '../../components/Spinner/Spinner'
import LiveNow from '../../components/LiveNow/LiveNow'
import TagSeoHead from '../../components/SeoHead/TagSeoHead'

export interface IHomeTemplateProps {
  readonly mainTag: ITag
}

const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
  if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
  return mainTag.ticker[0]
}

const HomeTemplate: React.FC<IHomeTemplateProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Selector data page needs from state
  const mainTag = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))

  const parentTag = useSelector<RootState, ITag | undefined>(state => selectParentTag(state, mainTag?.id))

  const secondaryTag1 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag1)) // HeroCarouselVideo

  const secondaryTag2 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag2)) // VideoSingleCarousel2

  const secondaryTag3 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag3)) // Calendar

  const secondaryTag4 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag4))   // Schedule

  const secondaryTag5 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag5)) // LineUp

  const secondaryTag6 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag6)) // VideoMultiCarousel(First)

  const secondaryTag7 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag7)) //VideoMultiCarousel(Second)

  const streams = useSelector<RootState, IStream[]>(state => selectMainTagStreams(state, mainTag))

  const hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))

  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])

  const carouselLimit: number = 12
  const heroCarouselLimit: number = 4
  const scheduleLimit: number = 100
  const calendarLimit: number = 100
  const ticker: ITicker | undefined = getTicker(mainTag)
  
  if (!hasLoaded) return (
    <div className="container">
      <Spinner />
    </div>
  )

  return (
    <section>
      {
        hasLoaded && mainTag !== undefined && streams !== undefined &&
        <>
          <TagSeoHead mainTag={mainTag} />

          {/* Hero Carousel */}
          <HeroCarousel mainTag={mainTag} streams={streams} limit={heroCarouselLimit} filterTag={secondaryTag1} />

          {/* Ticker */}
          {ticker && ticker.tickerMessage &&
            <Ticker text={ticker.tickerMessage.toUpperCase()} link={ticker.tickerLink} />
          }

          {/* Video Single Carousel */}
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag2} uuidIndex={uuidIndex} />

          {/* Copy Statement */}
          <CopyStatement mainTag={mainTag} parentTag={parentTag} copyStatementIndex={0} />

          {/* Temporary solution until Video Multi Carousel Mobile is created */}

          <div className="hide-large">
            {/* Video Multi Carousel (Upcoming) */}
            <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} />
          </div>
          <div className="show-large">
            {/* Video Single Carousel (Upcoming) */}
            <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} />
          </div>

          <div className="hide-large">
            {/*  Video Multi Carousel (Something else?) */}
            <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} />
          </div>
          <div className="show-large">
            {/*  Video Single Carousel (Something else?) */}
            <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} />
          </div>

          {/* Lineup */}
          <LineUpMulti mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag5} uuidIndex={uuidIndex} />

          {/* Copy Statement */}

          <CopyStatement mainTag={mainTag} parentTag={parentTag} copyStatementIndex={1} />

          {/* Calendar */}
          {/* <Calendar mainTag={mainTag} streams={streams} limit={calendarLimit} filterTag={secondaryTag3} uuidIndex={uuidIndex} /> */}

          {/* Schedule */}
          <Schedule mainTag={mainTag} streams={streams} limit={scheduleLimit} filterTag={secondaryTag4} uuidIndex={uuidIndex} />

        </>
      }
    </section>
  )
}

export default HomeTemplate
