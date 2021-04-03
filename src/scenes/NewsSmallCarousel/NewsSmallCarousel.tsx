import React from 'react'
import { Link } from 'react-router-dom'

import styles from './NewsSmallCarousel.module.scss'

import { INewsArticle } from '../../services/content/news/models'
import LazyImage from '../../components/LazyImage/LazyImage'

interface INewsSmallCarouselProps {
  featureArticle?: INewsArticle
}

const NewsSmallCarousel: React.FC<INewsSmallCarouselProps> = ({ featureArticle }) => {

  if (featureArticle === undefined)
    return null

  return (
    <section>
      <div className="container">
        <div className={styles['news-small-carousel']}>
          <div className={styles['news-small-carousel__slide']}>
            <div className={styles['news-small-carousel__content']}>
              <div className={styles['news-small-carousel__date']}>TUE 7th jan 2020</div>

              <Link to={`/news/${featureArticle.name.replace(/ /g, '_')}`}>
                <h2>
                  <span className="line-clamp-2">
                    {featureArticle.name}
                  </span>
                </h2>
                <p className="line-clamp-3">
                  {featureArticle.articlePreview}
                </p>
              </Link>

              <ul className={styles['news-small-carousel__news-tags']}>
                {featureArticle.browseTags && featureArticle.browseTags.length > 0 && featureArticle.browseTags.map((tag, index) =>
                  <li key={`carousel-news-tag-${index}`} className={styles['news-small-carousel__news-tags-item']}>
                    {tag}
                  </li>
                )}
              </ul>
            </div>
            <div className={styles['news-small-carousel__image']}>
              <div className="aspect-ratio-16-9">
                {featureArticle.carousel && featureArticle.carousel.length > 0 &&
                  <LazyImage src={featureArticle.carousel[0].image} alt={featureArticle.carousel[0].name} />
                }
              </div>

              <a href="/#" className={styles['news-small-carousel__play-icon']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-play"></use>
                </svg>
              </a>
              <ul className={styles['news-small-carousel__news-tags-mobile']}>
                <li className={styles['news-small-carousel__news-tags-item']}>Tag01</li>
                <li className={styles['news-small-carousel__news-tags-item']}>Tag02</li>
                <li className={styles['news-small-carousel__news-tags-item']}>Tag03</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const defaultProps: INewsSmallCarouselProps = {
  featureArticle: undefined
}

NewsSmallCarousel.defaultProps = defaultProps

export default NewsSmallCarousel
