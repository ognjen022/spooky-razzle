import React from 'react'
import { ITag, IStream, ITagIndex } from '../../services/content/tags/models'
import VideoSingleCarousel2 from '../VideoSingleCarousel/VideoSingleCarousel2'
import VideoMultiCarouselNew from '../VideoMultiCarouselNew/VideoMultiCarouselNew'

interface VideoCarouselSwitchProps {
  mainTag: ITag | undefined
  streams: IStream[]
  limit: number
  filterTag: ITag | undefined
  uuidIndex: ITagIndex[]
}

const VideoCarouselSwitch: React.FC<VideoCarouselSwitchProps> = (props: VideoCarouselSwitchProps) => {

  const { mainTag, streams, limit, filterTag, uuidIndex } = props;

  if (streams.length >= 4)
    return (
      <>
        <div className="hide-large">
          <VideoMultiCarouselNew mainTag={mainTag} streams={streams} limit={limit} filterTag={filterTag} uuidIndex={uuidIndex} />
        </div>
        <div className="show-large">
          <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={limit} filterTag={filterTag} uuidIndex={uuidIndex} />
        </div>
      </>
    )

  return (
    <VideoSingleCarousel2 mainTag={mainTag} streams={streams} limit={limit} filterTag={filterTag} uuidIndex={uuidIndex} />
  )
}

export default VideoCarouselSwitch
