import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import Ticker from '../../components/Ticker/Ticker'
import { selectMainTag, selectMainTagStreams, selectHasLoaded, selectParentTag, selectTag, selectTagsChildStreams } from '../../services/content/tags/selectors'
import { RootState } from '../../services/RootState'
import { ITag, IStream, ITagIndex, ITicker } from '../../services/content/tags/models'
import CopyStatement from '../../components/CopyStatement/CopyStatement'
import VideoSingleCarousel2 from '../../components/VideoSingleCarousel/VideoSingleCarousel2'
import TagHero from '../../components/TagHero/TagHero'
import LineUpMulti from '../../components/LineUpMulti/LineUpMulti'
import Calendar from '../../scenes/Calendar/Calendar'
import Schedule from '../../scenes/Schedule/Schedule'
import TagSubMenu from '../../components/TagSubMenu/TagSubMenu';
import TagNoContent from '../../scenes/TagNoContent/TagNoContent'
import LiveNow from '../../components/LiveNow/LiveNow'
import { push } from 'connected-react-router';
import TagSeoHead from '../../components/SeoHead/TagSeoHead';
import VideoCarouselSwitch from '../../components/VideoCarouselSwitch/VideoCarouselSwitch'

export interface IPagetemplateProps {
}


const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
  if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
  return mainTag.ticker[0]
}

const PageTemplate: React.FC<IPagetemplateProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // let tagIndex = useSelector<RootState, ITagIndex | undefined>(state => selectPathTagIndex(state))
  let mainTag = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))

  const dispatch = useDispatch()
  useEffect(() => {
    if (!mainTag) {
      dispatch(push('/404'))
    }
  }, [])

  let parentTag = useSelector<RootState, ITag | undefined>(state => selectParentTag(state, mainTag?.id))
  const secondaryTag1 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag1))
  const secondaryTag2 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag2))
  const secondaryTag3 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag3))
  const secondaryTag4 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag4))

  // const secondaryTag5 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag5))
  const secondaryTag6 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag6))
  const secondaryTag7 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag7))
  // const secondaryTag8 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag8))
  // const secondaryTag9 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag9))
  // const secondaryTag10 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag10))

  const heroCarouselLimit: number = 4
  const carouselLimit: number = 12
  const scheduleLimit: number = 100;
  const calendarLimit: number = 50
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])

  let streams = useSelector<RootState, IStream[]>(state => selectMainTagStreams(state, mainTag))
  const childStreams = useSelector<RootState, IStream[]>(state => selectTagsChildStreams(state, mainTag))
  if(streams.length === 0)
    streams = childStreams
  let hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  const ticker: ITicker | undefined = getTicker(mainTag)

  const liveStreams: IStream[] = streams?.filter(stream => (
    moment(stream.startTime).isBetween(moment().add(-2, 'hours'), moment().add(2, 'hours'))
  ))

  return <div>
    {
      hasLoaded && mainTag !== undefined &&
      <>
        <TagSeoHead mainTag={mainTag} />

        <TagHero mainTag={mainTag} sideLabelTag={parentTag} />

        {/* Live Now */}
        <VideoSingleCarousel2 mainTag={mainTag} streams={liveStreams} limit={carouselLimit} filterTag={secondaryTag2} uuidIndex={uuidIndex} />

        {/* {
          streams.length > 0 ? (
            <div className="container">
              <TagSubMenu name={mainTag.name} items={[{ text: 'schedule', href: '#schedule' }, { text: 'calendar', href: '#calendar' }]} />
            </div>

          ) : (
              <div className="container">
                <TagSubMenu name={mainTag.name} items={[]} />
              </div>

            )
        } */}
      </>
    }
    {
      hasLoaded && streams.length === 0 &&
      <TagNoContent tagName={mainTag?.name || ''} />
    }

    {
      hasLoaded && streams.length > 0 &&
      <HeroCarousel mainTag={mainTag} streams={streams} limit={heroCarouselLimit} filterTag={secondaryTag1} />
    }
    {/* {
      hasLoaded && streams.length > 0 &&
      <Calendar mainTag={mainTag} streams={streams} limit={calendarLimit} filterTag={secondaryTag3} uuidIndex={uuidIndex} />
    } */}
    {
      hasLoaded && streams.length > 0 &&
      <Schedule mainTag={mainTag} limit={scheduleLimit} streams={streams} filterTag={secondaryTag4} uuidIndex={uuidIndex} />
    }

    {
      hasLoaded && streams.length > 0 && mainTag &&
      <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag2} uuidIndex={uuidIndex} />
    }

    {
      hasLoaded && streams.length > 0 && mainTag &&
      <LineUpMulti mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag2} uuidIndex={uuidIndex} />
    }

    {/* Ticker */}
    <Ticker text={ticker?.tickerMessage?.toUpperCase()} link={ticker?.tickerLink} />


    {
      streams.length > 0 &&
      <CopyStatement mainTag={mainTag} parentTag={parentTag} copyStatementIndex={0} />
    }

    <VideoCarouselSwitch mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} />

    <VideoCarouselSwitch mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} />

  </div>
}

export default PageTemplate
