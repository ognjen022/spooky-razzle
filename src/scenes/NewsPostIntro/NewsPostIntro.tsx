import React from 'react'
import DOMPurify from 'dompurify'

import styles from './NewsPostIntro.module.scss'
import { INewsArticle } from '../../services/content/news/models'
import LazyImage from '../../components/LazyImage/LazyImage'

interface INewsPostIntroProps {
  article?: INewsArticle
}

const NewsPostIntro: React.FC<INewsPostIntroProps> = ({ article }) => {

  if (article === undefined)
    return null

  return (
    <section>
      <div className="container">

        <div className={styles['news-post-intro']}>

          <div className={styles['news-post-intro__image']}>
            {article.carousel && article.carousel.length > 0 &&
              <LazyImage src={article.carousel[0].image} alt={article.carousel[0].name} />
            }
          </div>

          <div className={styles['news-post-intro__group']}>
            <div className={styles['news-post-intro__date']}>
              TUE 7th jan 2020
            </div>

            <ul className={styles['news-post-intro__news-tags']}>
              {article.browseTags && article.browseTags.length > 0 && article.browseTags.map((tag, index) =>
                <li key={`carousel-news-tag-${index}`} className={styles['news-small-carousel__news-tags-item']}>
                  {tag}
                </li>
              )}
            </ul>

            <div className={styles['news-post-intro__socials']}>
              <a href="/#" className={styles['news-post-intro__social-link']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-social-facebook-circle"></use>
                </svg>
                <span className="screen-reader-text">Facebook</span>
              </a>

              <a href="/#" className={styles['news-post-intro__social-link']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-social-twitter-circle"></use>
                </svg>
                <span className="screen-reader-text">Twitter</span>
              </a>
            </div>

            <div className={styles['news-post-intro__teams']}>
              {/* <div className={styles['news-post-intro__teams-item']}>
                <span className={styles['news-post-intro__teams-image']}>
                  <LazyImage src="https://via.placeholder.com/70x70" alt="" />
                </span>
                <span className={styles['news-post-intro__teams-name']}>
                  Francis Douglas Memorial College
                </span>
              </div>
              <div className={styles['news-post-intro__teams-item']}>
                <span className={styles['news-post-intro__teams-image']}>
                  <LazyImage src="https://via.placeholder.com/70x70" alt="" />
                </span>
                <span className={styles['news-post-intro__teams-name']}>
                  Francis Douglas Memorial College
                </span>
              </div> */}
            </div>

            <div className={styles['news-post-intro__title']}>
              <h2>
                {article.name}
              </h2>
            </div>
            <div className={styles['news-post-intro__content']}>
              <p>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.articleContent) }} />
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const defaultProps: INewsPostIntroProps = {
  article: undefined
}

NewsPostIntro.defaultProps = defaultProps

export default NewsPostIntro
