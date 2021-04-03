import React, { useEffect } from 'react'
import moment from 'moment'
import { ITag, IStream, ITagIndex } from '../../services/content/tags/models'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectMainTag, selectTag, selectMainTagStreams, selectHasLoaded } from '../../services/content/tags/selectors'
import Calendar from '../../scenes/Calendar/Calendar'
import Schedule from '../../scenes/Schedule/Schedule'
import Spinner from '../../components/Spinner/Spinner'
import TagSeoHead from '../../components/SeoHead/TagSeoHead'
import VideoCarouselSwitch from '../../components/VideoCarouselSwitch/VideoCarouselSwitch'

export interface IUpcomingTemplateProps {
  readonly mainTag: ITag
}

const UpcomingTemplate: React.FC<IUpcomingTemplateProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Selecrt data page needs from state
  const mainTag = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))
  const secondaryTag3 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag3)) // Calendar
  const secondaryTag6 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag6)) // VideoMultiCarousel(First)
  const secondaryTag7 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag7)) // VideoMultiCarousel(Second)
  const secondaryTag8 = useSelector<RootState, ITag | undefined>(state => selectTag(state, mainTag?.secondaryTag8)) // VideoMultiCarousel(Third)
  const streams = useSelector<RootState, IStream[]>(state => selectMainTagStreams(state, mainTag))
  const hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  const carouselLimit: number = 12
  const scheduleLimit: number = 100
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])

  const futureStreams = streams.filter(st => moment().isSameOrBefore(st.startTime));

  if (!hasLoaded) return (
    <div className="container">
      <Spinner />
    </div>
  )

  return <div>
    {
      hasLoaded && mainTag !== undefined && streams.length > 0 &&
      <>
        <TagSeoHead mainTag={mainTag} />

        {/* Calendar */}
        {/* <Calendar mainTag={mainTag} streams={streams} limit={calendarLimit} filterTag={secondaryTag3} uuidIndex={uuidIndex} /> */}

        <VideoCarouselSwitch mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag6} uuidIndex={uuidIndex} />

        <VideoCarouselSwitch mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag7} uuidIndex={uuidIndex} />

        <VideoCarouselSwitch mainTag={mainTag} streams={streams} limit={carouselLimit} filterTag={secondaryTag8} uuidIndex={uuidIndex} />

        {/* Schedule */}
        <Schedule mainTag={mainTag} streams={futureStreams} limit={scheduleLimit} filterTag={secondaryTag3} uuidIndex={uuidIndex} />
      </>
    }
  </div >
}

export default UpcomingTemplate
