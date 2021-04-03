import React, { useEffect } from 'react'
import { ITag, IStream, ITicker, ITagIndex } from '../../services/content/tags/models'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectMainTag, selectTag, selectMainTagStreams, selectHasLoaded, isStreamLive } from '../../services/content/tags/selectors'
import Ticker from '../../components/Ticker/Ticker'
import VideoSingleCarousel2 from '../../components/VideoSingleCarousel/VideoSingleCarousel2'
import VideoMultiCarouselNew from '../../components/VideoMultiCarouselNew/VideoMultiCarouselNew'
import VideoStreamer from '../../components/VideoStreamer/VideoStreamer'
import Spinner from '../../components/Spinner/Spinner'
import LiveNow from '../../components/LiveNow/LiveNow'
import TagSeoHead from '../../components/SeoHead/TagSeoHead'

export interface ILiveNowTemplateProps {
  readonly mainTag: ITag
}

const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
  if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
  return mainTag.ticker[0]
}

const LiveNowTemplate: React.FC<ILiveNowTemplateProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Selecrt data page needs from state
  const mainTag = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))
  // const secondaryTag2 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag2)) // VideoSingleCarousel2
  const secondaryTag6 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag6)) // VideoMultiCarousel(First)
  const secondaryTag7 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag7)) // VideoMultiCarousel(Second)
  const secondaryTag10 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag10)) // VideoStreamer ("now" auto-tag)
  const streams = useSelector<RootState, IStream[]>(state => selectMainTagStreams(state, mainTag))
  const filteredStreams = streams.filter(stream => (
    isStreamLive(stream.startTime, stream.duration)
  ))

  const hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  const ticker: ITicker | undefined = getTicker(mainTag)
  const carouselLimit: number = 12
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])
  const refreshKey = useSelector<RootState, string>(state => state.content.tags.refreshKey)

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
        {/*
        <div>LiveNowTemplate streams count: {streams.length}</div>
        <VideoStreamer mainTag={mainTag} streams={streams} filterTag={secondaryTag10} uuidIndex={uuidIndex} />
        */}

        {/* Video Single Carousel */}
        <VideoSingleCarousel2 mainTag={mainTag} streams={filteredStreams} limit={carouselLimit} filterTag={/*secondaryTag2*/ undefined} uuidIndex={uuidIndex} />

        {/* Temporary solution until Video Multi Carousel Mobile is created */}

        <div className="hide-medium">
          {/* Video Multi Carousel (Upcoming)
          <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} /> */}
        </div>

        <div className="hide-medium">
          {/* Video Multi Carousel (Upcoming)
          <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} /> */}
        </div>

        <div className="show-medium">
          {/* Video Single Carousel (Upcoming)
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} /> */}
        </div>

        <div className="show-medium">
          {/*  Video Single Carousel (Something else?)
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} /> */}
        </div>
      </>
    }
  </div >)
}

export default LiveNowTemplate
