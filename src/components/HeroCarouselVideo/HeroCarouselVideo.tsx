import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { ITag, IStream } from '../../services/content/tags/models'
import { filterFeaturedStreams, filterStreams } from '../../services/content/tags/selectors'

import SaveStreamButton from '../SaveButtons/SaveStreamButton'
import PremiumContent from '../../components/PremiumContent/PremiumContent'
import { Link } from 'react-router-dom'
import LazyImage from '../LazyImage/LazyImage'
import Glide from '@glidejs/glide'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { truncateString } from '../../utils/utils'

interface IHeroCarouselVideoProps {
  mainTag: ITag | undefined
  streams: IStream[]
  filterTag: ITag | undefined
  limit: number
}

const HeroCarouselVideo: React.FC<IHeroCarouselVideoProps> = (props) => {

  const dispatch = useDispatch();
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0)
  const filteredStreams = filterFeaturedStreams(props.streams, props.limit, props.filterTag)
  //const x = filterFeaturedStreams(props.streams, props.limit, props.filterTag)
  const [heroGlide, setheroGlide]: any = useState(new Glide());

  const mainTag = props.mainTag

  useEffect(() => {
    if (filteredStreams.length > 0) {

      if ((window as any).__NewGlide) {
        const heroCarouselVideoGlide: any = (window as any).__NewGlide(`.hero-carousel-video .glide`, {
          type: 'carousel',
          hoverpause: true,
          perView: 1,
          gap: 0,
          animationTimingFunc: 'ease-in-out',
          animationDuration: 1000,
          dragThreshold: filteredStreams.length > 1 ? true : false,
          peek: {
            before: 0,
            after: filteredStreams.length > 1 ? 140 : 0
          }
        })

        if (heroCarouselVideoGlide) {
          heroCarouselVideoGlide.on(['mount.after', 'run'], function () {
            const index = heroCarouselVideoGlide.index;
            setCurrentStreamIndex(index);
            setheroGlide(heroCarouselVideoGlide)
          });

          heroCarouselVideoGlide.mount()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageClick = (index) => {
    if (heroGlide.index === index)
      dispatch(push(`/play/${filteredStreams[index].eventId}`))
  }

  if (mainTag === undefined || filteredStreams?.length === 0) return <></>

  const cropImageIfMobile = (imageUri: string): string => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    if (toMatch.some((item) => navigator.userAgent.match(item))) {
      return `${imageUri}?width=640&height=360&mode=crop`
    }
    return `${imageUri}?width=2560&height=1440&mode=crop`;
  }
  const renderSlide = (stream: IStream, index: number) => (
    <li className={'glide__slide'} key={index}>
      <div className={'hero-carousel-video__image'} onClick={() => handleImageClick(index)}>
        <LazyImage src={cropImageIfMobile(stream.image ? `${stream.image}` : 'https://via.placeholder.com/2560x1440.png')} alt={stream.name} />
      </div>
      <div className={'hero-carousel-video__content'}>
        <div className={'hero-carousel-video__title'}>
          <Link to={`/play/${stream.eventId}`}><h2>{truncateString(stream.name, 50)}</h2></Link>
        </div>
        <div className={'hero-carousel-video__intro'}>
          <p>{stream.description || ''}</p>
        </div>
        <div className={'hero-carousel-video__video-options'}>

          <div className={'hero-carousel-video__video-options-premium'}>
            <PremiumContent stream={stream} className={'icon'} />
          </div>

          <SaveStreamButton stream={stream} suffix="to My Stream" className={'hero-carousel-video__video-options-toggle'} ></SaveStreamButton>

        </div>
      </div>
      <div className={'hero-carousel-video__date-time'}>
        <p>{moment(stream.startTime).format('ddd Do MMM YYYY - h.mm A')}</p>
      </div>
    </li>
  )


  return (
    <section>
      <div className={'container'}>
        <div className={'hero-carousel-video'}>
          <div className={'hero-carousel-video__label'}>
            <Link to={`${props.filterTag?.path}`}>
              <p>{props.filterTag?.name}</p>
            </Link>
          </div>
          <div className={'hero-carousel-video__slider'}>
            <div className={'glide'}>
              <div className={'glide__track'} data-glide-el={'track'}>
                <ul className={`glide__slides`}>
                  {filteredStreams.map((stream, index) =>
                    renderSlide(stream, index)
                  )}
                </ul>
              </div>
              {filteredStreams.length > 1 &&
                <div data-glide-el="controls" className={'glide__arrows'}>
                  <button data-glide-dir="<" className={'glide__button-prev'}>
                    <svg className={'icon'} role={'presentation'}>
                      <use xlinkHref={'#icon-chevron-left'}></use>
                    </svg>
                    <span className={'screen-reader-text'}>Previous Slide</span>
                  </button>
                  <button data-glide-dir=">" className={'glide__button-next'}>
                    <svg className={'icon'} role={'presentation'}>
                      <use xlinkHref={'#icon-chevron-right'}></use>
                    </svg>
                    <span className={'screen-reader-text'}>Next Slide</span>
                  </button>
                </div>
              }
            </div>
          </div>
          <div className={'hero-carousel-video__counter'}>
            <span className={'hero-carousel-video__counter-current'}> {currentStreamIndex + 1} </span> / <span className={'hero-carousel-video__counter-total'}> {filteredStreams.length} </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCarouselVideo
