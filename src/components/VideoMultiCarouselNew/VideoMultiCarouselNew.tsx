import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { ITag, IStream, ITagIndex } from '../../services/content/tags/models'
import { filterStreams, isStreamLive, getTagsFull } from '../../services/content/tags/selectors';
import SaveStreamButton from '../SaveButtons/SaveStreamButton'
import PremiumContent from '../../components/PremiumContent/PremiumContent'
import LineUpIcon from '../../components/LineUpIcon/LineUpIcon'
import PlayButton from '../../components/PlayButton/PlayButton'
import styles from './VideoMultiCarouselNew.module.scss';
import { Link } from 'react-router-dom'
import { RootState } from '../../services/RootState';
import { truncateString } from '../../utils/utils';

interface IVideoMultiCarouselNewProps {
  mainTag: ITag | undefined
  streams: IStream[]
  limit: number
  filterTag: ITag | undefined
  uuidIndex: ITagIndex[]
}

const VideoMultiCarouselNew: React.FC<IVideoMultiCarouselNewProps> = (props: IVideoMultiCarouselNewProps) => {

  const pathName = useSelector<RootState, any>(state => state.router?.location?.pathname)
  const showSave = pathName !== '/my-streams';

  const filteredStreams = filterStreams(props.streams, props.limit, props.filterTag);

  const numOfPanels: number = 4;
  const [currentStream, setCurrentStream] = useState(filteredStreams[0]);
  const [currentTextStream, setCurrentTextStream] = useState(filteredStreams[0]);
  const [imageArray, setImageArray] = useState(new Array(numOfPanels + 4));
  const [imageIndex, setImageIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showNextSecond, setShowNextSecond] = useState(false);
  const [showNextThird, setShowNextThird] = useState(false);
  const [approveAnimation, setApproveAnimation] = useState(true);
  const imageGroupRef = useRef<HTMLDivElement>(null);
  const imageRef_0 = useRef<HTMLDivElement>(null);
  const imageRef_1 = useRef<HTMLDivElement>(null);
  const imageRef_2 = useRef<HTMLDivElement>(null);
  const imageRef_3 = useRef<HTMLDivElement>(null);
  const imageRef_4 = useRef<HTMLDivElement>(null);
  const imageRef_5 = useRef<HTMLDivElement>(null);
  const image4SizeRef = useRef<HTMLImageElement>(null);
  const image5SizeRef = useRef<HTMLImageElement>(null);
  const imageRefArray = [imageRef_0, imageRef_1, imageRef_2, imageRef_3, imageRef_4, imageRef_5];
  const [images, setImages] = useState<string[]>([]);

  let imageSize: number = 0;

  const calculateTextIndex = (i: number) => {
    return textIndex > 0 ? (textIndex + i) % filteredStreams.length : (filteredStreams.length + textIndex % filteredStreams.length + i) % filteredStreams.length;
  }

  const calculateIndex = (i: number) => {
    return imageIndex > 0 ? (imageIndex + i) % filteredStreams.length : (filteredStreams.length + imageIndex % filteredStreams.length + i) % filteredStreams.length;
  }

  const fillUpImageArray = () => {
    for (let i = 0; i < numOfPanels + 4; ++i)
      if (i === numOfPanels + 1)
        imageArray[i] = filteredStreams[(calculateIndex(0) - 1) < 0 ? filteredStreams.length - 1 : (calculateIndex(0) - 1)];
      else if (i === numOfPanels + 2)
        imageArray[i] = filteredStreams[calculateIndex(i - 1)];
      else if (i === numOfPanels + 3)
        imageArray[i] = filteredStreams[calculateIndex(i - 1)];
      else
        imageArray[i] = filteredStreams[calculateIndex(i)];

    setImageArray(imageArray);
    let images: Array<string> = []

    imageArray.forEach(imgArr => {
      images.push(`${imgArr?.image}?width=640&height=360&mode=crop`);
    })

    setImages(images)
    setCurrentStream(imageArray[0]);
  }

  useEffect(() => {
    if (imageGroupRef && imageGroupRef.current?.style && image4SizeRef && image4SizeRef.current && image5SizeRef && image5SizeRef.current) {
      imageGroupRef.current.style.transform = `translateX(-130px)`;
      // imageGroupRef.current.style.transform = `translateX(${-(image4SizeRef.current.width !== 0 ? image4SizeRef.current.width : image5SizeRef.current.width)}px)`;
    }
    fillUpImageArray();
    // console.log("DUZINA: " + filteredStreams.length);
    // console.log(imageArray);
  }, [])

  useEffect(() => {
    fillUpImageArray();
    // console.log(imageArray);
  }, [imageIndex])

  useEffect(() => {
    setCurrentTextStream(filteredStreams[calculateTextIndex(0)]);
  }, [textIndex])

  const textStyle = {
    transition: 'opacity 0.375s ease-in-out'
  };
  const [textOpacity, setTextOpacity] = useState(1);

  const textAnimate = (move: string) => {
    setApproveAnimation(false);
    setTextOpacity(0.1);
    setTimeout(() => {
      let timer = setInterval(() => {
        setTimeout(() => {
          clearInterval(timer);
        }, 15);
        setTextIndex((move === "next") ? (textIndex + 1) : (move === "nextSecond" ? (textIndex + 2) : (move === "nextThird" ? (textIndex + 3) : (textIndex - 1))));
        setTextOpacity(1);
      }, 15);
    }, 375);
  }

  const imageAnimate = (move: string) => {
    setApproveAnimation(false);
    if (imageGroupRef && imageGroupRef.current?.style)
      imageGroupRef.current.style.transition = "transform 0.75s ease-in-out";

    let activeIndex: number = 0;
    let unactiveIndex: number = 0;

    imageRefArray.forEach((el, i) => {
      if (el && el.current)
        el.current.style.transition = "width 0.75s ease-in-out";
      if (el.current?.classList.contains(`${styles['active']}`)) {
        activeIndex = i;
        move === "next" ? (unactiveIndex = i + 1) : (move === "nextSecond" ? (unactiveIndex = i + 2) : (move === "nextThird" ? (unactiveIndex = i + 3) : (unactiveIndex = imageArray.length - 3)));
      }
    });

    imageRefArray[unactiveIndex].current?.classList.add(`${styles['active']}`);
    imageRefArray[activeIndex].current?.classList.remove(`${styles['active']}`);

    if (image4SizeRef && image4SizeRef.current && image5SizeRef && image5SizeRef.current)
      imageSize = image4SizeRef.current.width !== 0 ? image4SizeRef.current.width : image5SizeRef.current.width;

    if (imageGroupRef && imageGroupRef.current?.style && image4SizeRef && image4SizeRef.current && image5SizeRef && image5SizeRef.current)
      move === "next" ? imageGroupRef.current.style.transform = `translateX(${-imageSize * 2}px)`
        : (move === "nextSecond" ? imageGroupRef.current.style.transform = `translateX(${-imageSize * 3}px)`
          : (move === "nextThird" ? imageGroupRef.current.style.transform = `translateX(${-imageSize * 4}px)`
            : imageGroupRef.current.style.transform = `translateX(0px)`));

    setTimeout(() => {
      if (imageGroupRef && imageGroupRef.current?.style && image4SizeRef && image4SizeRef.current && image5SizeRef && image5SizeRef.current) {
        imageGroupRef.current.style.transition = "none";
        imageGroupRef.current.style.transform = `translateX(${-imageSize}px)`;
      }

      imageRefArray.forEach((el, i) => {
        if (el && el.current)
          el.current.style.transition = "none";
        if (el.current?.classList.contains(`${styles['active']}`)) {
          activeIndex = i;
          move === "next" ? (unactiveIndex = i - 1) : (move === "nextSecond" ? (unactiveIndex = i - 2)
            : (move === "nextThird" ? (unactiveIndex = i - 3) : (unactiveIndex = imageArray.length - i - 3)));
        }
      });

      imageRefArray[activeIndex].current?.classList.remove(`${styles['active']}`);
      imageRefArray[unactiveIndex].current?.classList.add(`${styles['active']}`);

      setImageIndex((move === "next") ? (imageIndex + 1) : (move === "nextSecond" ? (imageIndex + 2) : (move === "nextThird" ? (imageIndex + 3) : (imageIndex - 1))));
      setApproveAnimation(true);
      setShowNextSecond(false);
      setShowNextThird(false);
    }, 750);
  }

  const handleClick = (input: string) => {
    switch (input) {
      case 'next':
        if (approveAnimation) {
          textAnimate("next");
          imageAnimate("next");
        }
        return;
      case 'nextSecond':
        if (approveAnimation) {
          setShowNextSecond(true);
          textAnimate("nextSecond");
          imageAnimate("nextSecond");
        }
        return;
      case 'nextThird':
        if (approveAnimation) {
          setShowNextSecond(true);
          setShowNextThird(true);
          textAnimate("nextThird");
          imageAnimate("nextThird");
        }
        return;
      case 'prev':
        if (approveAnimation) {
          textAnimate("prev");
          imageAnimate("prev");
        }
        return;
    }
  }

  const getLink = (input: number) => {
    let link = getTagsFull(currentStream.lineUpTags, props.uuidIndex)[input]?.path;
    if (link)
      return link.toString();
    return '#';
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
    return `${imageUri}?width=640&height=360&mode=crop`;
  }

  return (
    <section>
      {currentTextStream &&
        <div className={'container'}>
          <div className={`${styles['video-multi-carousel']}`}>
            <div className={`${styles['video-multi-carousel__inner']}`}>
              {/* <div className={`${styles['video-multi-carousel__group']}`}> */}
              <div className={`${styles['video-multi-carousel__label']}`}>

                <div className={`${styles['video-multi-carousel__buttons']}`}>
                  <button
                    onClick={() => handleClick('prev')}
                    className={`${styles['video-multi-carousel__button-prev']}`}
                  >
                    <svg className={`icon`} role="presentation">
                      <use xlinkHref="#icon-chevron-left"></use>
                    </svg>
                    <span className={`${styles['screen-reader-text']}`}></span>
                  </button>
                  <button
                    onClick={() => handleClick('next')}
                    className={`${styles['video-multi-carousel__button-next']}`}
                  >
                    <svg className={`icon`} role="presentation">
                      <use xlinkHref="#icon-chevron-right"></use>
                    </svg>
                    <span className={`${styles['screen-reader-text']}`}></span>
                  </button>
                </div>

                <Link to={`${props.filterTag?.path}`} className={`${styles['video-multi-carousel__label-text']}`}>
                  {props.filterTag?.name}
                </Link>

              </div>

              <div className={`${styles['video-multi-carousel__content']}`} style={{ ...textStyle, opacity: textOpacity }}>
                <h2>
                  <Link to={`/play/${currentTextStream.eventId}`}>
                    <span className="line-clamp-3">
                      {(currentTextStream && currentTextStream.name) ?  truncateString(currentTextStream.name, 50) : ""}
                    </span>
                  </Link>
                </h2>
                <p>
                  <span className="line-clamp-3">
                    {(currentTextStream && currentTextStream.description) ? currentTextStream.description : ""}
                  </span>
                </p>
                <ul className={`${styles['teams-vs-list']}`}>
                  <li className={`${styles['teams-vs-list__item']}`}>
                    <LineUpIcon
                      stream={currentTextStream}
                      className={`${styles['teams-vs-list__image']}`}
                      orderNumber={0}
                      lineUpTagsFull={getTagsFull((currentTextStream && currentTextStream.lineUpTags) ? currentTextStream.lineUpTags : [], props.uuidIndex)}
                    />
                    <span className={`${styles['teams-vs-list__name']}`}>
                      <Link to={() => getLink(0)}>
                        {getTagsFull((currentTextStream && currentTextStream.lineUpTags) ? currentTextStream.lineUpTags : [], props.uuidIndex)[0] ?
                          getTagsFull(currentTextStream.lineUpTags, props.uuidIndex)[0].name : ""}
                      </Link>
                    </span>
                  </li>
                  <li className={`${styles['teams-vs-list__item']}`}>
                    <LineUpIcon
                      stream={currentTextStream}
                      className={`${styles['teams-vs-list__image']}`}
                      orderNumber={1}
                      lineUpTagsFull={getTagsFull((currentTextStream && currentTextStream.lineUpTags) ? currentTextStream.lineUpTags : [], props.uuidIndex)}
                    />
                    <span className={`${styles['teams-vs-list__name']}`}>
                      <Link to={() => getLink(1)}>
                        {getTagsFull((currentTextStream && currentTextStream.lineUpTags) ? currentTextStream.lineUpTags : [], props.uuidIndex)[1] ?
                          getTagsFull(currentTextStream.lineUpTags, props.uuidIndex)[1].name : ""}
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
              {/* </div> */}





              <div className={`${styles['video-multi-carousel__images-container']}`}>
                <div className={`${styles['video-multi-carousel__image-group']}`} ref={imageGroupRef}>
                  <div className={`${styles['video-multi-carousel__outter']}`} ref={imageRef_5}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>

                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <img /*className="lazyload" data- */ src={images[5] ? images[5] : 'https://via.placeholder.com/2560x1440.png'} alt="" ref={image5SizeRef} />
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[5]?.startTime ? moment(imageArray[5].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[5]?.startTime ? moment(imageArray[5]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className={`${styles['video-multi-carousel__outter']} ${styles['active']}`} ref={imageRef_0}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>
                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <Link to={`/play/${currentTextStream.eventId}`}>
                          <img /*className="lazyload" data-*/ src={images[0] ? images[0] : 'https://via.placeholder.com/2560x1440.png'} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[0]?.startTime ? moment(imageArray[0].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[0]?.startTime ? moment(imageArray[0]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className={`${styles['video-multi-carousel__outter']}`} ref={imageRef_1}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>
                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <img /*className="lazyload" data-*/ src={images[1] ? images[1] : 'https://via.placeholder.com/2560x1440.png'} alt="" onClick={() => handleClick('next')} />
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[1]?.startTime ? moment(imageArray[1].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[1]?.startTime ? moment(imageArray[1]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className={`${styles['video-multi-carousel__outter']}`} ref={imageRef_2}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>
                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <img /*className="lazyload" data-*/ src={images[2] ? images[2] : 'https://via.placeholder.com/2560x1440.png'} alt="" onClick={() => handleClick('nextSecond')} />
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[2]?.startTime ? moment(imageArray[2].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[2]?.startTime ? moment(imageArray[2]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className={`${styles['video-multi-carousel__outter']}`} ref={imageRef_3}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>
                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <img /*className="lazyload" data-*/ src={images[3] ? images[3] : 'https://via.placeholder.com/2560x1440.png'} alt="" onClick={() => handleClick('nextThird')} />
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[3]?.startTime ? moment(imageArray[3].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[3]?.startTime ? moment(imageArray[3]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className={`${styles['video-multi-carousel__outter']}`} ref={imageRef_4}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>
                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <img /*className="lazyload" data-*/ src={images[4] ? images[4] : 'https://via.placeholder.com/2560x1440.png'} alt="" ref={image4SizeRef} />
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[4]?.startTime ? moment(imageArray[4].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[4]?.startTime ? moment(imageArray[4]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div>
                  {showNextSecond ? <div className={`${styles['video-multi-carousel__outter']}`}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>
                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <img /*className="lazyload" data-*/ src={images[6] ? images[6] : 'https://via.placeholder.com/2560x1440.png'} alt="" />
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[6]?.startTime ? moment(imageArray[6].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[6]?.startTime ? moment(imageArray[6]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div> : null}
                  {(showNextSecond && showNextThird) ? <div className={`${styles['video-multi-carousel__outter']}`}>
                    <div className={`${styles['video-multi-carousel__image-group-inner']}`}>
                      <div className={`${styles['video-multi-carousel__image']}`}>
                        <img /*className="lazyload" data-*/ src={images[7] ? images[7] : 'https://via.placeholder.com/2560x1440.png'} alt="" />
                      </div>
                    </div>
                    <div className={`${styles['video-multi-carousel__date-time']}`}>
                      <span className={`${styles['video-multi-carousel__date']}`}>
                        {imageArray[7]?.startTime ? moment(imageArray[7].startTime).format('ddd Do MMM YYYY') : ''}&nbsp;-&nbsp;
                    <span className={`${styles['video-multi-carousel__time']}`}>
                          {imageArray[7]?.startTime ? moment(imageArray[7]?.startTime).format('H:MM A') : ''}
                        </span>
                      </span>
                    </div>
                  </div> : null}
                </div>

                <div
                  className={`${styles['video-multi-carousel__premium']}`}
                  style={{ ...textStyle, opacity: textOpacity }}
                >
                  <PremiumContent
                    className={`${styles['video-multi-carousel__premium-icon']}`}
                    stream={currentTextStream}
                  />
                </div>

                {showSave &&
                  <div
                    className={`${styles['video-multi-carousel__save-indicator']}`}
                    style={{ ...textStyle, opacity: textOpacity }}
                  >
                    <SaveStreamButton
                      stream={currentStream}
                      className=''
                      suffix="to my stream"
                    />
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
      }

    </section >
  )
}

export default VideoMultiCarouselNew