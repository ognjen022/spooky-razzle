import React, { useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { ITag, IStream, ITicker, ITagIndex, ICopyStatement } from '../../services/content/tags/models'
import LineUpMulti from '../../components/LineUpMulti/LineUpMulti'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectMainTag, selectParentTag, selectTag, selectMainTagStreams, selectHasLoaded, filterStreams } from '../../services/content/tags/selectors'
import Ticker from '../../components/Ticker/Ticker'
import TagHero from '../../components/TagHero/TagHero'
import Schedule from '../../scenes/Schedule/Schedule'
import VideoSingleCarousel2 from '../../components/VideoSingleCarousel/VideoSingleCarousel2'
import CopyStatement from '../../components/CopyStatement/CopyStatement'
import VideoCarouselSwitch from '../../components/VideoCarouselSwitch/VideoCarouselSwitch'
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel'
import TagSubMenu from '../../components/TagSubMenu/TagSubMenu'
import Spinner from '../../components/Spinner/Spinner'
import TagSeoHead from '../../components/SeoHead/TagSeoHead'

export interface ITournamentTemplateProps {
  readonly mainTag: ITag
}

const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
  if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
  return mainTag.ticker[0]
}

const TournamentTemplate: React.FC<ITournamentTemplateProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Selecrt data page needs from state
  // const tagIndex = useSelector<RootState, ITagIndex | undefined>(state => selectPathTagIndex(state))
  const mainTag = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))
  const parentTag = useSelector<RootState, ITag | undefined>(state => selectParentTag(state, mainTag?.id))
  const secondaryTag1 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag1)) // HeroCarouselVideo
  const secondaryTag2 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag2)) // VideoSingleCarousel2
  // const secondaryTag3 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag3)) // Calendar
  const secondaryTag4 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag4)) // Schedule
  const secondaryTag5 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag5)) // LineUp
  const secondaryTag6 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag6)) // VideoMultiCarousel(First)
  const secondaryTag7 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag7)) // VideoMultiCarousel(Second)

  // const secondaryTag8 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag8))
  // const secondaryTag9 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag9))
  // const secondaryTag10 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag10))

  const streams = useSelector<RootState, IStream[]>(state => selectMainTagStreams(state, mainTag))
  const hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  const ticker: ITicker | undefined = getTicker(mainTag)
  const heroCarouselLimit: number = 4
  const carouselLimit: number = 12
  const scheduleLimit: number = 100;
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])

  const liveStreams: IStream[] = streams?.filter(stream => (
    moment(stream.startTime).isBetween(moment().add(-2, 'hours'), moment().add(2, 'hours'))
  ))
  const featuredStreams = filterStreams(streams, carouselLimit, secondaryTag1);

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
          <Ticker text={ticker?.tickerMessage?.toUpperCase()} link={ticker?.tickerLink} />

        {/* Tag Hero */}
        <TagHero mainTag={mainTag} sideLabelTag={parentTag} />

        {/* <div className="container">
          <TagSubMenu name={mainTag.name} items={[{ text: 'schedule', href: '#schedule' }]} />
        </div> */}

        {/* Live Now */}
        <VideoSingleCarousel2 mainTag={mainTag} streams={liveStreams} limit={carouselLimit} filterTag={secondaryTag2} uuidIndex={uuidIndex} />

        {/* Featured */}
        {streams.length >= 4 && featuredStreams.length >= 2 &&
          <HeroCarousel mainTag={mainTag} streams={streams} limit={heroCarouselLimit} filterTag={secondaryTag1} />
        }
        {streams.length >= 4 && featuredStreams.length === 1 &&
          <VideoSingleCarousel2 mainTag={mainTag} streams={featuredStreams} limit={heroCarouselLimit} filterTag={secondaryTag1} uuidIndex={uuidIndex} />
        }

        {/* Schedule */}
        {streams.length >= 4 &&
          <Schedule mainTag={mainTag} limit={scheduleLimit} streams={streams} filterTag={secondaryTag4} uuidIndex={uuidIndex} />
        }

        {/* Video Single Carousel */}
        {/* <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag2} uuidIndex={uuidIndex} /> */}

        {/* Copy Statement */}
        <CopyStatement mainTag={mainTag} parentTag={parentTag} copyStatementIndex={0} />

        {/* Temporary solution until Video Multi Carousel Mobile is created */}

        {/* Upcoming */}
        <VideoCarouselSwitch mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} />

        {/* Lineup */}
        {streams.length >= 1 &&
          <LineUpMulti mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag5} uuidIndex={uuidIndex} />
        }

        {/* Latest */}
        <VideoCarouselSwitch mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} />
      </>
    }
  </div >)
}

export default TournamentTemplate
