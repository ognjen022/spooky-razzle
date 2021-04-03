import React, { useEffect } from 'react'

import styles from './LineUpMulti.module.scss'
import { ITag, IStream, ITagIndex } from '../../services/content/tags/models';
import moment from 'moment';
import { filterStreams, getTagsFull } from '../../services/content/tags/selectors';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';

interface ILineUpMultiProps {
  readonly mainTag: ITag
  readonly streams: IStream[]
  readonly limit: number
  readonly filterTag: ITag | undefined
  readonly uuidIndex: ITagIndex[]
}

const LineUpMulti: React.FC<ILineUpMultiProps> = (props: ILineUpMultiProps) => {

  const glideWrapper = styles['verses-carousel'];

  const filteredStreams = filterStreams(props.streams, props.limit, props.filterTag)
  const filteredStreamsWithLineup = filteredStreams.filter((stream: IStream) => stream.lineUpTags.length === 2)

  useEffect(() => {
    const newGlideFunc = (window as any).__NewGlide

    if (filteredStreamsWithLineup && filteredStreamsWithLineup?.length > 0 && newGlideFunc) {
      const lineUpCarouselGlide = newGlideFunc(`.${glideWrapper} .glide`, {
        type: 'carousel',
        hoverpause: true,
        perView: 1
      })
      if (filteredStreamsWithLineup.length > 1) {

        lineUpCarouselGlide.mount();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (filteredStreamsWithLineup?.length === 0) return <></>

  const renderSlide = (stream: IStream, index: number, lineUpTagsFull: ITag[]) => {
    if (!lineUpTagsFull || stream.lineUpTags?.length !== 2) return <li key={index}></li>
    let lineUp1: ITag = lineUpTagsFull[0]
    let lineUp2: ITag = lineUpTagsFull[1]
    return (
      <li className="glide__slide" key={index}>
        <div className={styles['verses']}>
          <div className={styles['verses__inner']}>
            <div className={styles['verses__team']}>
              <div className={styles['verses__team-name']}><Link to={lineUp1.path || '#'}>{lineUp1.name}</Link></div>
              <div className={styles['verses__team-logo']}>
                <LazyImage src={lineUp1.icon} alt="" />
              </div>
            </div>
            <Link to={`/play/${stream.eventId}`}>

              <div className={styles['verses__middle']}>
                <div className={styles['verses__middle-inner']}>
                  <div className={styles['verses__vs']}>VS</div>
                  <div className={styles['verses__date-time']}>
                    {moment(stream.startTime).format('ddd Do MMM')}
                    <br />
                    {moment(stream.startTime).format('h.mm A')}
                  </div>
                </div>
              </div>
            </Link>

            <div className={styles['verses__team']}>
              <div className={styles['verses__team-name']}><Link to={lineUp2.path || '#'}>{lineUp2.name}</Link></div>
              <div className={styles['verses__team-logo']}>
                <LazyImage src={lineUp2.icon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </li>)
  }

  return (
    <section>
      <div className="container">
        <div className={styles['verses-title']}>
          <h2>Match ups</h2>
        </div>
        <div className={glideWrapper}>
          <div className={`glide ${styles.glide}`}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {
                  filteredStreamsWithLineup.map((stream, index) => renderSlide(stream, index, getTagsFull(stream.lineUpTags, props.uuidIndex)))
                }
              </ul>
            </div>
            {
              (filteredStreamsWithLineup && filteredStreamsWithLineup.length > 1) ? (
                <div className={`glide__arrows ${styles['glide__arrows']}`} data-glide-el="controls">
                  <button data-glide-dir="<" className={`glide__button-prev ${styles['glide__button-prev']}`}>
                    <svg className="icon" role="presentation">
                      <use xlinkHref="#icon-chevron-left"></use>
                    </svg>
                    <span className="screen-reader-text">Previous Slide</span>
                  </button>
                  <button data-glide-dir=">" className={`glide__button-next ${styles['glide__button-next']}`}>
                    <svg className="icon" role="presentation">
                      <use xlinkHref="#icon-chevron-right"></use>
                    </svg>
                    <span className="screen-reader-text">Next Slide</span>
                  </button>
                </div>
              ) : (
                  <div >

                  </div>
                )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default LineUpMulti
