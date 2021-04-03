import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from './NewsPostSimilar.module.scss'
import { INewsArticle } from '../../services/content/news/models'

interface INewsPostSimilarProps {
  articles?: INewsArticle[]
}

const NewsPostSimilar: React.FC<INewsPostSimilarProps> = ({ articles }) => {

  const glideWrapper = styles['news-post-similar-news__slider'];
  const glideItem = styles['glide'];

  useEffect(() => {
    (window as any).__glide_verses(glideWrapper, glideItem);
  }, [glideWrapper, glideItem]);

  if (articles === undefined || articles.length === 0)
    return null

  return (
    <section>
      <div className="container">
        <div className={styles['news-post-similar-news']}>
            <div className={glideWrapper}>

              <div className={`glide ${styles['glide']}`}>
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">

                    {articles.length > 0 && articles.map((article, index) => 
                      <li className="glide__slide" key={`news-post-similar-news-article-${index}`}>

                          <div className={styles['news-post-similar-news__slide']}>
                              <div className={styles['news-post-similar-news__date']}>
                                Tue 7th Jan 2020
                              </div>

                              <Link to={`/news/${article.name.replace(/ /g, '_')}`}>
                                <h2>
                                    {article.name}
                                </h2>

                                <p>
                                    {article.articlePreview}
                                </p>
                              </Link>
                              
                              <ul className={styles['news-post-similar-news__news-tags']}>
                                {article.browseTags && article.browseTags.length > 0 && article.browseTags.map((tag, index) => 
                                  <li
                                    key={`news-post-similar-news__news-tags-item-${index}`}
                                    className={styles['news-small-carousel__news-tags-item']}>
                                    {tag}
                                  </li>
                                )}
                              </ul>
                          </div>
                      </li>
                    )}
                  </ul>
                </div>

              <div data-glide-el="controls" className={`glide__arrows ${styles['glide__arrows']}`}>
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
            </div>

          </div>

          <div className={styles['news-post-similar-news__label-container']}>
            <div className={styles['news-post-similar-news__label']}>
              <p>Similar</p>
            </div>
            <div className={styles['news-post-similar-news__count']}>
              <p>
                {`1 / ${articles.length}`}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

const defaultProps: INewsPostSimilarProps = {
  articles: undefined
}

NewsPostSimilar.defaultProps = defaultProps

export default NewsPostSimilar
