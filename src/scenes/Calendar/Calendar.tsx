import React, { useState, useEffect } from 'react'
import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import MiniCalendar from 'react-calendar'
import { indexOf } from 'lodash';
import moment, { now } from 'moment'
import styles from './Calendar.module.scss'
import { IStream, ITag, ITagIndex } from '../../services/content/tags/models'
import { filterStreams, getTagsFull } from '../../services/content/tags/selectors'
import { v4 as uuidv4 } from 'uuid';
import Glide from '@glidejs/glide'
import SaveStreamButton from '../../components/SaveButtons/SaveStreamButton'
import PremiumContent from '../../components/PremiumContent/PremiumContent'
import PlayButton from '../../components/PlayButton/PlayButton'
import LineUpIcon from '../../components/LineUpIcon/LineUpIcon'
import { Link } from 'react-router-dom';
import LazyImage from '../../components/LazyImage/LazyImage';
import VideoPlayerDefault from '../../components/VideoPlayer/VideoPlayerDefault';
import { truncateString } from '../../utils/utils';

interface CalendarProps {
  mainTag: ITag | undefined
  streams: IStream[]
  limit: number
  filterTag: ITag | undefined
  uuidIndex: ITagIndex[]
}

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {

  const { streams, limit, filterTag, uuidIndex } = props


  const filteredStreams = filterStreams(streams, limit, filterTag)

  let startAt: number = 0
  let foundNext: boolean = false
  filteredStreams?.forEach((stream: IStream, index: number) => {
    if (!foundNext) {
      if (moment(stream.startTime).isSameOrAfter(now())) {
        startAt = index
        foundNext = true
      } else {
        startAt = index
      }
    }
  })


  const [currentStreamIndex, setCurrentStreamIndex] = useState(startAt)
  const glideInstanceId = "glide-id_" + uuidv4();
  const glideInstanceClassName = `.${glideInstanceId} .glide`
  let [calendarGlide, setCalendarGlide]: any = useState(new Glide());

  /* eslint-disable */
  useEffect(() => {
    if (filteredStreams?.length > 0) {
      if ((window as any).__NewGlide) {
        calendarGlide = (window as any).__NewGlide(glideInstanceClassName, {
          type: 'carousel',
          startAt: startAt,
          hoverpause: true,
          perView: 1,
          gap: 0,
          animationDuration: 600,
          peek: {
            before: 0,
            after: 120
          },
          breakpoints: {
            768: {
              peek: {
                before: 0,
                after: 0
              }
            }
          }
        })
        if (calendarGlide) {
          calendarGlide.on(['mount.after', 'run'], function () {
            const index = calendarGlide.index;
            setCurrentStreamIndex(index);
            setCalendarGlide(calendarGlide);
          });
          calendarGlide.mount()
        }
      }
    }
  }, []);

  useEffect(() => {
    setStream(filteredStreams[currentStreamIndex])
    setDateValue(new Date(filteredStreams[currentStreamIndex].startTime))
  }, [currentStreamIndex]);
  /* eslint-enable */

  const [visible, setVisible] = useState(true);
  const [calendarTableVisible, setCalendarTableVisible] = useState(true);
  const [dateValue, setDateValue] = useState<Date>();
  const [stream, setStream] = useState<IStream | undefined>(filteredStreams[currentStreamIndex]);
  const [calendarView, setCalendarView] = useState('month');
  const [hideDays, setHideDays] = useState(false)

  const handleClick = () => {
    setVisible(!visible);
  }

  const handleClickDay = (value) => {
    setDateValue(value);
    let selectedDayStream = filteredStreams?.find(
      str => moment(str.startTime).format("MMM Do YYYY") === moment(value).format("MMM Do YYYY")
    );
    const indexOfStream = indexOf(filteredStreams, selectedDayStream);
    try {
      calendarGlide.go(`=${indexOfStream}`)
      setStream(selectedDayStream)
    } catch (error) {
      console.log('Calendar.tsx error', error)
    }

  }

  if (filteredStreams === undefined || filteredStreams?.length === 0) return (<></>)

  const streamDates = filteredStreams.map(stream => moment(stream.startTime).format("MMMM Do YYYY"))
  const streamYears = filteredStreams.map(stream => moment(stream.startTime).format("YYYY"))

  const renderSlide = (stream: IStream, index: number, lineUpTagsFull: ITag[]) => (
    <li className={'glide__slide'} key={index}>
      <div key={index} className={'calendar-video'}>

        <ImageVideoSwitch stream={stream} />

        <div className={'calendar-video__content'}>
          <Link to={`/play/${stream.eventId}`}><h2>{stream && truncateString(stream.name, 50)}</h2></Link>
          <div className={'calendar-video__wrapper'}>
            <p>
              {stream && stream.description}
            </p>
            {stream && lineUpTagsFull && lineUpTagsFull.length >= 2 &&
              <ul className={styles['teams-vs-list']}>
                <li className={styles['teams-vs-list__images']}>
                  <LineUpIcon
                    stream={stream}
                    className={styles['teams-vs-list__image']}
                    orderNumber={0}
                    lineUpTagsFull={lineUpTagsFull}
                  />
                  <LineUpIcon
                    stream={stream}
                    className={styles['teams-vs-list__image-overlap']}
                    orderNumber={1}
                    lineUpTagsFull={lineUpTagsFull}
                  />
                </li>
                <li className={styles['teams-vs-list__names']}>
                  <span><Link to={lineUpTagsFull[0].path || '#'}>{lineUpTagsFull[0].name}</Link></span>
                  <div className={styles['teams-vs-list__versus-span']}>Vs</div>
                  <span><Link to={lineUpTagsFull[1].path || '#'}>{lineUpTagsFull[1].name}</Link></span>
                </li>
              </ul>}
          </div>
        </div>

      </div >
    </li >
  )

  return (
    <LayoutDefault>
      <section>
        <div className="container">
          <div className={styles['calendar']}>
            <div className={`${styles['calendar__date']} ${visible ? styles['is-active'] : ''}`}>
              <span className={`${styles['calendar__date__text']}`}>
                {moment(stream?.startTime).format("YYYY")}
              </span>
            </div>

            <div className={`${styles['calendar__date']} ${visible ? styles['is-active'] : ''}`}>
              <span className={`${styles['calendar__date__text']}`}>
                {moment(stream?.startTime).format("MMMM")}
              </span>
            </div>

            <div className={`${styles['calendar__date']} ${styles['calendar__date-table']} ${!visible ? styles['is-active'] : ''} ${styles['mobile-active']}`
            }>

              <MiniCalendar
                className={`${styles['calendar__table']}`}
                prevLabel={null}
                prev2Label={null}
                nextLabel={null}
                next2Label={null}
                view={calendarView}
                onClickDay={(value) => handleClickDay(value)}
                onClickYear={() => setCalendarView('year')}
                onClickMonth={() => setCalendarView('month')}
                navigationLabel={({ date, view }) => {
                  let label = ''
                  if (view === 'month')
                    label = date.toLocaleDateString('default', { month: 'short', year: 'numeric' })
                  else if (view === 'year')
                    label = date.toLocaleDateString('default', { year: 'numeric' })
                  else
                    label = 'Year'
                  return <div className={styles['calendar__table__flex-wrapper']}>
                    {
                      label
                    }
                    <svg
                      onClick={(e) => {
                        e.stopPropagation();
                        if (calendarView !== 'month')
                          setCalendarView('month');
                        else
                          setCalendarView('decade');
                      }} className={styles['calendar__icons-down']} role="presentation">
                      <use xlinkHref="#icon-chevron-down"></use>
                    </svg>

                    {!calendarTableVisible &&
                      <div className={styles['calendar__icons-mobile-container']}>

                        <svg className={styles['calendar__icons-mobile']} role="presentation">
                          <use xlinkHref="#icon-calendar-day-active"></use>
                        </svg>
                        <svg className={styles['calendar__icons-mobile']} role="presentation">
                          <use xlinkHref="#icon-calendar-month-inactive"></use>
                        </svg>
                      </div>
                    }
                    {calendarTableVisible &&
                      <svg onClick={(e) => {
                        e.stopPropagation();
                        setHideDays(!hideDays)
                      }} className={styles['calendar__icons-mobile']} role="presentation">
                        <use xlinkHref="#icon-calendar-month-active"></use>
                      </svg>
                    }
                  </div>
                }}
                formatShortWeekday={(locale, date) => {
                  if (hideDays)
                    return ''
                  else return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
                }}
                minDetail="decade"
                onViewChange={({ activeStartDate }) => {
                  setDateValue(activeStartDate);
                  setCalendarTableVisible(true)
                }}
                tileClassName={({ date, view }) => {
                  let tileClass: string = '';
                  const currentDate = moment(date).format("MMMM Do YYYY")
                  if (view === 'month') {
                    if (currentDate === moment(dateValue).format("MMMM Do YYYY"))
                      tileClass += `${styles['calendar__table__selected']} `;

                    if (moment(date).format("MMM") !== moment(dateValue).format("MMM"))
                      tileClass += `${styles['calendar__table__greyed']} `;

                    if (streamDates.includes(currentDate)) {
                      const tomorrow = moment(currentDate, "MMMM Do YYYY").add(1, 'day').format("MMMM Do YYYY")
                      const yesterday = moment(currentDate, "MMMM Do YYYY").add(-1, 'day').format("MMMM Do YYYY")
                      if (streamDates.includes(tomorrow) && streamDates.includes(yesterday))
                        tileClass += `${styles['calendar__table__highlighted-full']}`
                      else if (streamDates.includes(tomorrow))
                        tileClass += `${styles['calendar__table__highlighted-left']}`
                      else if (streamDates.includes(yesterday))
                        tileClass += `${styles['calendar__table__highlighted-right']}`
                      else
                        tileClass += `${styles['calendar__table__highlighted']}`
                    }
                  }
                  else if (view === 'decade') {
                    const tileYear = moment(date).format("YYYY")
                    if (!streamYears.includes(tileYear))
                      tileClass += `${styles['calendar__table__disabled']}`
                  }
                  if (hideDays)
                    tileClass = `${styles['calendar__table__disabled']}`
                  return tileClass;
                }}
                tileDisabled={({ date, view }) => {
                  const currentDate = moment(date).format("MMMM Do YYYY")
                  const tileYear = moment(date).format("YYYY")
                  if (view === 'month')
                    return !streamDates.includes(currentDate);
                  else if (view === 'decade')
                    return !streamYears.includes(tileYear)
                  else return;
                }}
                onChange={setDateValue}
                value={dateValue}
                activeStartDate={dateValue}
              />
            </div>

            <div className={`${styles['calendar__date']} ${styles['calendar__date-last']} ${visible ? styles['is-active'] : ''}`}>
              <span className={`${styles['calendar__date__text']}`}>
                {moment(stream?.startTime).format("dddd Do")}
              </span>
            </div>

            <div className={`${styles['calendar-carousel-video']} ${glideInstanceId}`}>
              <div className={'hero-carousel-video__slider'}>
                <div className={'glide'}>
                  <div className={'glide__track'} data-glide-el={'track'}>
                    <ul className={`glide__slides`}>
                      {filteredStreams.map((stream, index) =>
                        renderSlide(stream, index, getTagsFull(stream.lineUpTags, uuidIndex))
                      )}
                    </ul>
                  </div>
                  <div data-glide-el="controls" className={'calendar-video__arrows-container'}>
                    <button data-glide-dir="<" className={`calendar-video__icon-left ${styles['glide__button-prev']}`}>
                      <svg className={'icon'} role={'presentation'}>
                        <use xlinkHref={'#icon-chevron-left'}></use>
                      </svg>
                      <span className={'screen-reader-text'}>Previous Slide</span>
                    </button>
                    <button data-glide-dir=">" className={`calendar-video__icon-right ${styles['glide__button-next']}`}>
                      <svg className={'icon'} role={'presentation'}>
                        <use xlinkHref={'#icon-chevron-right'}></use>
                      </svg>
                      <span className={'screen-reader-text'}>Next Slide</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['calendar__icons']} onClick={handleClick}>
            <svg className={styles[`calendar__icons-month-inactive`]} role="presentation">
              <use xlinkHref={`#icon-calendar-month-${visible ? 'inactive' : 'active'}`}></use>
            </svg>
          </div>
        </div>
      </section>
    </LayoutDefault >
  )
}

export default Calendar

interface IImageVideoSwitchProps {
  stream: IStream
}

const ImageVideoSwitch: React.FC<IImageVideoSwitchProps> = ({ stream }) => {
  // const showPlayButton = stream && stream.startTime && moment(stream.startTime) < moment() && stream.videoStreams && stream.videoStreams.length > 0 //isStreamLive(stream.startTime, stream.duration)
  const [displayStream, setDisplayStream] = useState<boolean>(false)

  const openDisplayStream = () => {
    setDisplayStream(true)
  }

  const closeDisplayStream = () => {
    setDisplayStream(false)
  }

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

  return (
    <div className={'calendar-video__image'} id="calendar">
      {displayStream ?
        (
          <>
            <button className={'calendar-video__close-button'} onClick={closeDisplayStream}>
              <svg className="icon" role="presentation">
                <use xlinkHref="#icon-mini-close"></use>
              </svg>
              <span className="screen-reader-text">Close</span>
            </button>
            <div className="aspect-ratio-16-9">
              {/* <iframe
                title="Video Player"
                className={'video-multi-carousel__iframe'}
                src={`/video-player/index.html?eventId=${stream.videoStreams[0].liveStreamEventId}&videoId=${stream.videoStreams[0].liveEventVideoId}`}
                allowFullScreen>
              </iframe> */}
               <VideoPlayerDefault 
                position={0}
                onTimeUpdate={e => {}}
                eventId={stream.videoStreams[0].liveStreamEventId} 
                videoId={stream.videoStreams[0].liveEventVideoId}
                isLive={false} ></VideoPlayerDefault>
            
            </div>
          </>
        )
        :
        (
          <>
            <div className="aspect-ratio-16-9">

              <LazyImage src={cropImageIfMobile(stream?.image ? `${stream?.image}` : 'https://via.placeholder.com/2560x1440.png')} alt="" />
            </div>
            <div className={'calendar-video__purchased'}>
              <PremiumContent stream={stream} className={'calendar-video__purchased-icon'} />
            </div>
            <div className={'calendar-video__date'}>
              {moment(stream?.startTime).format('MMMM Do YYYY')}
            </div>

            <PlayButton
              stream={stream}
              className={'calendar-video__play-icon'}
              playStream={openDisplayStream}
              mobileRedirectUrl={undefined}
            />

            <SaveStreamButton stream={stream} className={'calendar-video__save-indicator'} ></SaveStreamButton>

            <div className={'calendar-video__time'}>
              {stream && moment(stream?.startTime).format('h A')}
            </div>

            <div className={'calendar-video__label'}>
              <span>{stream && moment(stream?.startTime).format('MMMM Do YYYY - h:mm a')}</span>
            </div>
          </>
        )}
    </div >
  )
}
