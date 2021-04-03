import React from 'react'

import { ITag, IStream } from '../../services/content/tags/models'

import HeroCarouselVideo from '../../components/HeroCarouselVideo/HeroCarouselVideo'
import HeroCarouselMobile from '../../components/HeroCarouselMobile/HeroCarouselMobile'


interface IHeroCarouselProps {
  mainTag: ITag | undefined
  streams: IStream[]
  filterTag: ITag | undefined
  limit: number
}

const HeroCarousel: React.FC<IHeroCarouselProps> = (props) => {

  const mainTag = props.mainTag
  const streams = props.streams
  const filterTag = props.filterTag
  const limit = props.limit

  return (
    <>
      <div className="hide-large">
        <HeroCarouselVideo
          mainTag={mainTag}
          streams={streams}
          filterTag={filterTag}
          limit={limit}
        />
      </div>

      <div className="show-large">
        <HeroCarouselMobile
          mainTag={mainTag}
          streams={streams}
          filterTag={filterTag}
          limit={limit}
        />
      </div>
    </>
  )
}

export default HeroCarousel
