import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ITag, IStream, ITicker, ITagIndex } from '../../services/content/tags/models'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectMainTag, selectParentTag, selectTag, selectMainTagStreams, selectHasLoaded } from '../../services/content/tags/selectors'
import Ticker from '../../components/Ticker/Ticker'
import VideoSingleCarousel2 from '../../components/VideoSingleCarousel/VideoSingleCarousel2'
import CopyStatement from '../../components/CopyStatement/CopyStatement'
import VideoMultiCarouselNew from '../../components/VideoMultiCarouselNew/VideoMultiCarouselNew'
import Spinner from '../../components/Spinner/Spinner'
import moment from 'moment'
import TagSeoHead from '../../components/SeoHead/TagSeoHead'

export interface ILatestTemplateProps {
  readonly mainTag: ITag
}

const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
  if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
  return mainTag.ticker[0]
}

const LatestTemplate: React.FC<ILatestTemplateProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  // Selecrt data page needs from state
  const mainTag = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))
  let parentTag = useSelector<RootState, ITag | undefined>(state => selectParentTag(state, mainTag?.id))
  const secondaryTag2 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag2)) // VideoSingleCarousel2
  const secondaryTag6 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag6)) // VideoMultiCarousel(First)
  const secondaryTag7 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag7)) // VideoMultiCarousel(Second)
  const secondaryTag8 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag8)) // VideoMultiCarousel(Third)
  const secondaryTag9 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag9)) // VideoMultiCarousel(Fourth)
  const streams = useSelector<RootState, IStream[]>(state => selectMainTagStreams(state, mainTag))
  const hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  const ticker: ITicker | undefined = getTicker(mainTag)
  const carouselLimit: number = 12
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])

  if (!hasLoaded) return (
    <div className="container">
      <Spinner />
    </div>
  )

  return (<div>
    {
      hasLoaded && mainTag !== undefined && streams !== undefined &&
      <>
        <TagSeoHead mainTag={mainTag} />

        {/* Ticker */}
        {ticker && ticker.tickerMessage &&
          <Ticker text={ticker.tickerMessage.toUpperCase()} link={ticker.tickerLink} />
        }

        {/* Video Single Carousel */}
        <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag2} uuidIndex={uuidIndex} />

        {/* Temporary solution until Video Multi Carousel Mobile is created */}

        <div className="hide-large">
          {/* Video Multi Carousel (Upcoming) */}
          <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} />
        </div>

        <div className="hide-large">
          {/* Video Multi Carousel (Upcoming) */}
          <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} />
        </div>

        <div className="show-large">
          {/* Video Single Carousel (Upcoming) */}
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} />
        </div>

        <div className="show-large">
          {/*  Video Single Carousel  */}
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} />
        </div>

        {/* Copy Statement */}
        <CopyStatement mainTag={mainTag} parentTag={parentTag} copyStatementIndex={0} />

        {/* Temporary solution until Video Multi Carousel Mobile is created */}

        <div className="hide-large">
          {/*  Video Multi Carousel (Something else?) */}
          <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag8} uuidIndex={uuidIndex} />
        </div>

        <div className="hide-large">
          {/*  Video Multi Carousel (Something else?) */}
          <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag9} uuidIndex={uuidIndex} />
        </div>

        <div className="show-large">
          {/* Video Single Carousel (Upcoming) */}
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag8} uuidIndex={uuidIndex} />
        </div>

        <div className="show-large">
          {/*  Video Single Carousel (Something else?) */}
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag9} uuidIndex={uuidIndex} />
        </div>
      </>
    }
  </div >)
}

export default LatestTemplate
