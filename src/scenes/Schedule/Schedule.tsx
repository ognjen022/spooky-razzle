import React, { useState, useEffect, memo } from 'react'
import moment from 'moment'
import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import styles from './Schedule.module.scss'
import { IStream, ITag, ITagIndex } from '../../services/content/tags/models'
import { filterStreams, filterStreamsNoLimit, getTagsFull } from '../../services/content/tags/selectors';
import SaveStreamButton from '../../components/SaveButtons/SaveStreamButton'
import _ from 'lodash';
import { Link } from 'react-router-dom'
import LineUpIcon from '../../components/LineUpIcon/LineUpIcon'
import { AutoSizer, List } from 'react-virtualized';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

interface ScheduleProps {
  mainTag: ITag | undefined
  streams: IStream[]
  limit: number
  filterTag: ITag | undefined
  uuidIndex: ITagIndex[]
}

const Schedule: React.FC<ScheduleProps> = (props: ScheduleProps) => {

  const { uuidIndex, limit, filterTag } = props

  const getChildTags = (tag: ITag | undefined): ITag[] | [] => {
    let childTags: ITag[] = [];
    if (!tag || !tag.children)
      return [];

    for (const item of tag.children) {
      childTags.push(item)
      if (item.children && item.children.length > 0) {
        childTags.push(...getChildTags(item))
      }
    }
    return childTags;
  }

  // const getChildStreams = (filterTag: ITag | undefined) => {
  //   let renderStreams: any = [];
  //   const childTags: ITag[] = getChildTags(filterTag);
  //   if (childTags.length === 0)
  //     return

  //   else {
  //     for (let tag of childTags) {
  //       const childTagStreams = filterStreams(props.streams, 100, tag);
  //       renderStreams = [...renderStreams, ...childTagStreams]
  //     }
  //   }
  //   const uniqueRenderStreams = _.uniq(renderStreams)
  //   return uniqueRenderStreams;
  // }

  let filteredStreams: IStream[] = filterStreamsNoLimit(props.streams, filterTag)

  const [streams, setStreams] = useState(filteredStreams)

  let streamDates = filteredStreams.length > 0 ?
    filteredStreams.map(stream => moment(stream.startTime).format("ddd Do MMM YYYY")) :
    streams.map(stream => moment(stream.startTime).format("ddd Do MMM YYYY"))

  streamDates.sort((a, b) => {
    const first = moment(a, 'ddd Do MMM YYYY').format();
    const second = moment(b, 'ddd Do MMM YYYY').format();
    return new Date(first).valueOf() - new Date(second).valueOf()
  })

  const calendarStreamDates = filteredStreams.map(stream => moment(stream.startTime).format("MMMM Do YYYY"))
  const streamYears = filteredStreams.map(stream => moment(stream.startTime).format("YYYY"))

  let streamDatesDict = {};
  streamDates.forEach(date => {
    if (streamDatesDict[date]) {
      ++streamDatesDict[date];
    } else {
      // add new
      streamDatesDict[date] = 1;
    }
  });

  const getDefaultIndex = () => {
    let currentDate = moment().format()
    let defaultIndex = -1;

    let firstNextStream = streams.find(s => moment(currentDate).isSameOrBefore(moment(s.startTime).format()))

    if (!firstNextStream) {
      firstNextStream = streams[streams.length - 1]
    }

    Object.keys(streamDatesDict).forEach((streamDate, index) => {
      if (streamDate === moment(firstNextStream?.startTime).format("ddd Do MMM YYYY")) {
        defaultIndex = index;
      }
    })

    return defaultIndex;
  }

  const [visible, setVisible] = useState(true);
  const [dateHighlightIndex, setDateHighlightIndex] = useState<number>(getDefaultIndex());
  const [tagHighlightIndex, setTagHighlightIndex] = useState<number>(-1);
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [hideDays, setHideDays] = useState(false)

  //if secondaryTag4 is undefined, use mainTag instead
  // const tag = props.filterTag === undefined ? props.mainTag : props.filterTag

  const [streamDatesDictRender, setStreamDatesDictRender] = useState(streamDatesDict)

  useEffect(() => {
    if (window.innerWidth > 768) {
      if (dateHighlightIndex >= 0) {
        const date = Object.keys(streamDatesDict).map((streamDate, index) => {
          if (dateHighlightIndex === index) {
            return streamDate;
          }
        })
        filterStreamByDate(date, dateHighlightIndex)
      }
    }
  }, [])

  let tagNames: string[] = [] //  = getChildTags(tag);
  let tags: ITag[] = []
  filteredStreams.forEach((stream: IStream) => {
    stream.lineUpTags.forEach((tagId: string) => {
      var tagsFull = getTagsFull(stream.lineUpTags, uuidIndex)
      tagsFull.forEach((tag: ITag) => {
        if (!tagNames.includes(tag.name)) {
          tagNames.push(tag.name)
          tags.push(tag)
        }
      })
    })

  })
  tagNames.sort()

  const handleClickArrowIcon = () => {
    setVisible(!visible)
  }

  const filterStreamByTag = (name: string, index: number, uuidIndex: ITagIndex[]) => {
    setTagHighlightIndex(index);

    const tagStreams = filteredStreams.filter(stream => {
      const browseTagsFull = getTagsFull(stream.browseTags, uuidIndex)

      const streamTags = browseTagsFull.map(tag => {
        return _.includes(tag.name.toLowerCase(), name.toLowerCase())
      })
      return streamTags.some(tag => tag === true);
    }
    )
    setStreams(tagStreams);
  }

  const filterStreamByDate = (date, index: number) => {
    setDateHighlightIndex(index);
    setDateValue(new Date(moment(date, "ddd Do MMM YYYY").format()));

    const checkDate = streams.every(stream => (
      moment(stream.startTime).format("ddd Do MMM") === moment(date, "ddd Do MMM YYYY").format("ddd Do MMM")
    ))
    if (checkDate) {
      clearDateFilter();
      setStreamDatesDictRender(streamDatesDict)
      return;
    }

    const dateStreams = filteredStreams.filter(stream => {
      return moment(stream.startTime).format("ddd Do MMM YYYY") === moment(date, "ddd Do MMM YYYY").format("ddd Do MMM YYYY")
    })
    if (!dateStreams.length) {
      setStreams(filteredStreams)
      return;
    }

    setStreams(dateStreams);
  }

  const clearFilter = () => {
    setTagHighlightIndex(-1)
    setStreams(filteredStreams)
  }

  const clearDateFilter = () => {
    setDateHighlightIndex(-1)
    setStreams(filteredStreams)
  }

  const getLabel = () => {
    let label = ''

    if (dateValue && calendarView === 'month')
      label = moment(dateValue).format('ddd Do MMM')
    else if (dateValue && calendarView === 'year')
      label = moment(dateValue).format('YYYY')
    else
      label = 'Year'
    return label;
  }

  const getEventText = () => {
    let text = ''
    if (streamDatesDict[moment(dateValue).format('ddd Do MMM YYYY')] > 1)
      text = `${streamDatesDict[moment(dateValue).format('ddd Do MMM YYYY')]} Events`
    else if (streamDatesDict[moment(dateValue).format('ddd Do MMM YYYY')] === 1)
      text = `${streamDatesDict[moment(dateValue).format('ddd Do MMM YYYY')]} Event`
    return text;
  }

  function dateRowRenderer({
    key,
    index,
    style,
  }) {
    const streamDatesSet = _.uniqBy(streamDates)
    return (
      <div
        key={key}
        style={style}
        className={
          `${styles['schedule__date']} ${dateHighlightIndex === index ? styles['active'] : ''} ${index % 2 === 0 ? styles['even'] : styles['odd']}`
        }
        onClick={() => {
          filterStreamByDate(streamDatesSet[index], index)
        }}
      >
        <span>{streamDatesSet[index]}</span>
        <span>{streamDatesDict[streamDatesSet[index]]} Events</span>
      </div>
    );
  }

  const eventRowRenderer = ({ index, style }) => {
    const lineUpTagsFull = getTagsFull(streams[index]?.lineUpTags, props.uuidIndex)
    if (!streams[index]) return <></>
    return (
      <div
        key={index}
        style={style}
        className={`${styles['schedule__event']} ${index % 2 === 0 ? styles['even'] : styles['odd']}`}
      >
        <div className={styles['schedule__events__date-time']}>
          {moment(streams[index]?.startTime).format('ddd Do MMM YYYY')}
          <span>{streams[index] && moment(streams[index]?.startTime).format('h:mm a')} start</span>
        </div>

        <SaveStreamButton stream={streams[index]} className={styles['schedule__events__save-indicator-mobile']} />

        <h2><Link to={`/play/${streams[index]?.eventId}`}>{streams[index] && streams[index].name}</Link></h2>

        <div className={`${styles['schedule__event__description']} line-clamp-3`}>
          {streams[index] && streams[index]?.description}
        </div>

        {
          streams[index] && lineUpTagsFull && lineUpTagsFull.length >= 2 &&
          <ul className={styles['schedule__events__vs-list']}>
            <li className={styles['schedule__events__team']}>
              <LineUpIcon
                stream={streams[index]}
                orderNumber={0}
                lineUpTagsFull={lineUpTagsFull}
                className={styles['schedule__events__image']}
              />
              <div className={styles['schedule__events__team-name']}>
                <Link to={lineUpTagsFull[0].path || '#'}>{lineUpTagsFull[0].name}</Link>
              </div>
            </li>
            <li className={styles['schedule__events__team']}>
              <LineUpIcon
                stream={streams[index]}
                orderNumber={1}
                lineUpTagsFull={lineUpTagsFull}
                className={styles['schedule__events__image']}
              />
              <div className={styles['schedule__events__team-name']}>
                <Link to={lineUpTagsFull[1].path || '#'}>{lineUpTagsFull[1].name}</Link>
              </div>
            </li>
            <li className={styles['schedule__events__save-indicator-flex-container']}>
              <SaveStreamButton stream={streams[index]} className={styles['schedule__events__save-indicator-desktop']} />
            </li>
          </ul>
        }

      </div>
    );
  }



  // const renderStream = (stream: IStream, index: number, lineUpTagsFull: ITag[]) => (
  //   <div key={index} className={styles['schedule__event']}>
  //     <div className={styles['schedule__events__date-time']}>
  //       {moment(stream?.startTime).format('ddd Do MMM')}
  //       <span>{stream && moment(stream?.startTime).format('h:mm a')} start</span>
  //     </div>

  //     <SaveStreamButton stream={stream} className={styles['schedule__events__save-indicator-mobile']} ></SaveStreamButton>

  //     <div className="line-clamp-2">
  //       <h2>
  //         <Link to={`/play/${stream.eventId}`}>
  //           {stream && stream.name}
  //         </Link>
  //       </h2>
  //     </div>

  //     <p>
  //       {stream && stream?.description}
  //     </p>

  //     {
  //       stream && lineUpTagsFull && lineUpTagsFull.length >= 2 &&
  //       <ul className={styles['schedule__events__vs-list']}>
  //         <li className={styles['schedule__events__team']}>
  //           <LineUpIcon
  //             stream={stream}
  //             orderNumber={0}
  //             lineUpTagsFull={lineUpTagsFull}
  //             className={styles['schedule__events__image']}
  //           />
  //           <div className={styles['schedule__events__team-name']}>
  //             <Link to={lineUpTagsFull[0].path || '#'}>{lineUpTagsFull[0].name}</Link>
  //           </div>
  //         </li>
  //         <li className={styles['schedule__events__team']}>
  //           <LineUpIcon
  //             stream={stream}
  //             orderNumber={1}
  //             lineUpTagsFull={lineUpTagsFull}
  //             className={styles['schedule__events__image']}
  //           />
  //           <div className={styles['schedule__events__team-name']}>
  //             <Link to={lineUpTagsFull[1].path || '#'}>{lineUpTagsFull[1].name}</Link>
  //           </div>
  //         </li>
  //       </ul>
  //     }

  //     <div className={styles['schedule__events__save-indicator-flex-container']}>
  //       <SaveStreamButton stream={stream} className={styles['schedule__events__save-indicator-desktop']} ></SaveStreamButton>
  //     </div>
  //   </div >
  // )

  if (filteredStreams === undefined || filteredStreams?.length === 0) return (<></>)

  return (
    <LayoutDefault>
      <section>
        <div className="container" id="schedule">

          <div className={styles['schedule-wrapper']}>
            <div className={styles['schedule']}>

              <div className={styles['schedule__title']}>
                <h2>Schedule</h2>
              </div>

              {/*<div className={styles['calendar-navigation']}>
                <div className={styles['calendar-navigation__flex-container']}>
                  <h2 onClick={(e) => {
                    e.stopPropagation();
                    if (hideDays) return

                    else {
                      if (calendarView !== 'month')
                        setCalendarView('month');
                      else
                        setCalendarView('decade')
                    }
                  }}
                  >
                    {getLabel()}
                  </h2>
                  <div>
                    {getEventText()}
                  </div>

                </div>
                <svg onClick={(e) => {
                  e.stopPropagation();
                  setHideDays(!hideDays)
                }} className={styles['calendar__table__icons-down']} role="presentation">
                  <use xlinkHref="#icon-chevron-down"></use>
                </svg>
              </div>

              <MiniCalendar
                className={styles['calendar__table']}
                prevLabel={null}
                prev2Label={null}
                nextLabel={null}
                next2Label={null}
                view={calendarView}
                onClickDay={(value) => filterStreamByDate(value, -2)}
                onClickYear={() => setCalendarView('year')}
                onClickMonth={() => setCalendarView('month')}
                showNavigation={false}
                formatShortWeekday={(locale, date) => {
                  if (hideDays)
                    return ''
                  else return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
                }}
                onViewChange={({ activeStartDate }) => {
                  setDateValue(activeStartDate);
                }}
                tileClassName={({ date, view }) => {
                  let tileClass: string = '';
                  const currentDate = moment(date).format("MMMM Do YYYY")
                  if (view === 'month') {
                    if (currentDate === moment(dateValue).format("MMMM Do YYYY"))
                      tileClass += `${styles['calendar__table__selected']} `;

                    if (moment(date).format("MMM") !== moment(dateValue).format("MMM"))
                      tileClass += `${styles['calendar__table__greyed']} `;

                    if (calendarStreamDates.includes(currentDate)) {
                      const tomorrow = moment(currentDate, "MMMM Do YYYY").add(1, 'day').format("MMMM Do YYYY")
                      const yesterday = moment(currentDate, "MMMM Do YYYY").add(-1, 'day').format("MMMM Do YYYY")
                      if (calendarStreamDates.includes(tomorrow) && calendarStreamDates.includes(yesterday))
                        tileClass += `${styles['calendar__table__highlighted-full']}`
                      else if (calendarStreamDates.includes(tomorrow))
                        tileClass += `${styles['calendar__table__highlighted-left']}`
                      else if (calendarStreamDates.includes(yesterday))
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
                    return !calendarStreamDates.includes(currentDate);
                  else if (view === 'decade')
                    return !streamYears.includes(tileYear)
                  else return;
                }}
                onChange={setDateValue}
                value={dateValue}
                activeStartDate={dateValue}
              />*/}

              <div className={styles['schedule__label']}>
                <span className={styles['schedule__text']}>Schedule</span>

                <button onClick={handleClickArrowIcon} className={styles['schedule-filter-button']}>
                  <span>Filter by {filterTag ? `${filterTag.name}` : 'Line-up'}</span>
                  <svg
                    className={`${styles['icon']} ${!visible ? styles['clicked'] : ''}`}
                    role="presentation"
                  >
                    <use xlinkHref="#icon-chevron-right"></use>
                  </svg>
                </button>
                <span className={styles['schedule__label__clear']} onClick={clearFilter}>Clear</span>
              </div>

              <div className={`${styles['schedule__teams-mobile']} ${!visible ? styles['visible'] : ''}`}>
                <div className={styles['schedule__teams-wrapper']}>
                  <span>{filterTag ? `${filterTag.name}` : 'Team'}</span>
                  <span
                    className={styles['schedule__teams-mobile__clear-desktop']}
                    onClick={clearFilter}
                  >
                    Clear Filter
                  </span>
                </div>
                <div className={styles['schedule__teams-mobile__tags-container']}>
                  {tagNames.map((name: string, index: number) => (
                    <span
                      onClick={() => filterStreamByTag(name, index, props.uuidIndex)}
                      key={`schedule_span_${index}`}
                      style={{ cursor: "pointer" }}
                      className={tagHighlightIndex === index ? styles['highlight'] : ''}
                    >
                      {name}
                    </span>
                  )
                  )}
                </div>
                <div className={styles['schedule__teams-mobile__shadow']}></div>
              </div>

              <div className={styles['schedule__wrapper']}>
                <div className={`${styles['schedule__dates']} ${visible ? styles['visible'] : ''}`}>
                  <div className="hide-medium">
                    {window.innerWidth > 768 &&
                      <List
                        className={styles['schedule__events-list']}
                        height={670}
                        rowCount={Object.keys(streamDatesDictRender).length}
                        rowHeight={150}
                        rowRenderer={dateRowRenderer}
                        width={420}
                        overscanRowCount={3}
                        scrollToIndex={dateHighlightIndex + 2}
                      />
                    }
                  </div>
                  {/* {Object.keys(streamDatesDictRender).map((streamDate, index) => (
                    <div
                      key={index}
                      className={
                        `${styles['schedule__date']} ${dateHighlightIndex === index ? styles['active'] : ''}`
                      }
                      onClick={() => {
                        filterStreamByDate(streamDate, index)
                      }}
                    >
                      <div className={styles['schedule__date__flex-container']}>
                        <span>{moment(streamDate, 'ddd Do MMM YYYY').format('ddd Do MMM YYYY')}</span>
                        <span>
                          {streamDatesDict[streamDate]}&nbsp;
	                        {streamDatesDict[streamDate] > 1 ? 'Events' : 'Event'}
                        </span>
                      </div>
                      <svg className={styles['schedule__icon-down']} role="presentation">
                        <use xlinkHref="#icon-chevron-down"></use>
                      </svg>
                    </div>
                  ))} */}

                </div>

                <div className={`${styles['schedule__teams']} ${!visible ? styles['visible'] : ''}`}>
                  <div className={styles['schedule__teams-wrapper']}>
                    <span>Team</span>
                    <span onClick={clearFilter}>Clear Filter</span>
                  </div>
                  <div className={styles['schedule__teams__tags-container']}>
                    {tagNames.map((name: string, index: number) => (
                      <span
                        onClick={() => filterStreamByTag(name, index, props.uuidIndex)}
                        key={`schedule_span_${index}`}
                        style={{ cursor: "pointer" }}
                        className={tagHighlightIndex === index ? styles['highlight'] : ''}
                      >
                        {name}
                      </span>
                    )
                    )}
                  </div>
                </div>
              </div>

              {window.innerWidth <= 768 &&
                <div className={styles['schedule__events']}>
                  <VirtualizeSwipeableViews
                    style={{ paddingRight: "70px" }}
                    slideCount={streams.length}
                    slideRenderer={eventRowRenderer}
                    hysteresis={0.1}
                    resistance={true}
                  />
                  {/*
                    <FixedSizeList
                      className={styles['schedule__events-list']}
                      height={400}
                      itemCount={streams.length}
                      itemSize={window.innerWidth - 50}
                      layout="horizontal"
                      width={window.innerWidth}
                    >
                      {eventRowRenderer}
                    </FixedSizeList>
                  */}
                </div>
              }

              {window.innerWidth > 768 &&
                <div className={styles['schedule__events']}>
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        className={styles['schedule__events-list']}
                        height={height}
                        rowCount={streams.length}
                        rowHeight={300}
                        rowRenderer={eventRowRenderer}
                        width={width}
                        rowWidth={width}
                        overscanRowCount={3}
                      />
                    )}
                  </AutoSizer>

                  {/* {window.innerWidth <= 768 && streams.map((stream, index) => (
                  renderStream(stream, index, getTagsFull(stream.lineUpTags, props.uuidIndex))
                ))} */}
                </div>
              }

            </div>
          </div>
        </div>
      </section>
    </LayoutDefault >
  )
}

export default memo(Schedule)
