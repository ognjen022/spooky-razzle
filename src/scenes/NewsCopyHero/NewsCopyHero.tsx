import React from 'react'
import { Link } from 'react-router-dom'

import styles from './NewsCopyHero.module.scss'

import { INewsArticle } from '../../services/content/news/models'
interface INewsCopyHeroProps {
  articles?: INewsArticle[] 
}
  
const NewsCopyHero: React.FC<INewsCopyHeroProps> = ({ articles }) => {

  if (articles === undefined || articles.length === 0)
    return null

  return (
    <section>
      <div className="container">

        <div className={styles['news-copy-hero']}>
          
          {articles.map((article, index) => 
            <div className={
              index === 0 ? styles['news-copy-hero__item-first'] : styles['news-copy-hero__item-second']
            }>
              <div className={styles['news-copy-hero__date']}>TUE 7th jan 2020</div>

              <Link to={`/news/${article.name.replace(/ /g, '_')}`}>
                <h2>
                    {article.name}
                </h2>

                <p>
                  {article.articlePreview}
                </p>
              </Link>
              
              <ul className={styles['news-copy-hero__news-tags']}>
                {article.browseTags && article.browseTags.length > 0 && article.browseTags.map((tag, index) => 
                  <li key={`carousel-news-tag-${index}`} className={styles['news-small-carousel__news-tags-item']}>
                    {tag}
                  </li>
                )}
              </ul>

            </div>
          )}

        </div>

      </div>
    </section>
  )
}

const defaultProps: INewsCopyHeroProps = {
  articles: undefined
}
  
NewsCopyHero.defaultProps = defaultProps

export default NewsCopyHero
