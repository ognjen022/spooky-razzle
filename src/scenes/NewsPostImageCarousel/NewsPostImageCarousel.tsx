import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from './NewsPostImageCarousel.module.scss'
import { INewsArticle } from '../../services/content/news/models'
import LazyImage from '../../components/LazyImage/LazyImage'

interface INewsPostImageCarouselProps {
  articles?: INewsArticle[]
}

const NewsPostImageCarousel: React.FC<INewsPostImageCarouselProps> = ({ articles }) => {

  const glideWrapper = styles['news-post-image-carousel'];
  const glideItem = styles['glide'];

  useEffect(() => {
    (window as any).__glide_verses(glideWrapper, glideItem);
  }, [glideWrapper, glideItem]);

  if (articles === undefined || articles.length === 0)
    return null

  return (
    <section>
      <div className="container">
        <div className={glideWrapper}>
          <div className={`glide ${styles['glide']}`}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {articles.length > 0 && articles.map((article, index) =>
                  <li className="glide__slide" key={`news-post-image-carousel__slide-${index}`}>

                    <div className={styles['news-post-image-carousel__slide']}>
                      <div className={styles['news-post-image-carousel__image']}>
                        {article.carousel && article.carousel.length > 0 &&
                          <LazyImage src={article.carousel[0].image} alt={article.carousel[0].name} />
                        }
                      </div>
                      <div className={styles['news-post-image-carousel__content']}>
                        <div className={styles['news-post-image-carousel__image-credit']}>
                          <p>{article.name}</p>
                        </div>

                        <div className={styles['news-post-image-carousel__caption']}>
                          <p>{article.articlePreview}</p>
                        </div>
                      </div>
                    </div>

                  </li>
                )}
              </ul>
            </div>

            <div data-glide-el="controls" className={styles['glide__arrows']}>
              <button data-glide-dir="<" className={styles['glide__button-prev']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-chevron-left"></use>
                </svg>
                <span className="screen-reader-text">Previous Slide</span>
              </button>
              <button data-glide-dir=">" className={styles['glide__button-next']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-chevron-right"></use>
                </svg>
                <span className="screen-reader-text">Next Slide</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

const defaultProps: INewsPostImageCarouselProps = {
  articles: undefined
}

NewsPostImageCarousel.defaultProps = defaultProps

export default NewsPostImageCarousel
