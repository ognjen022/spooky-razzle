import React from 'react'

import styles from './NewsPost.module.scss'

interface INewsPostProps {
  content?: string | React.ReactElement
}

const NewsPost = (props) => {
  return (
    <section>
      <div className="container">

        <div className={styles['news-post']}>

          <div className={styles['news-post__group']}>

            <div className={styles['news-post__teams']}>
            </div>

            {/* <div className={styles['news-post__title']}>
              <h2>Suellen & Ben praise World Championships broadcasters</h2> 
            </div> */}
            <div className={styles['news-post__content']}>
              {props.content}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const defaultProps: INewsPostProps = {
  content: '',
}

NewsPost.defaultProps = defaultProps

export default NewsPost
