import React from 'react';
import styles from './TagNoContent.module.scss'
import Button from '../../components/Button/Button'
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import LazyImage from '../../components/LazyImage/LazyImage';

interface ITagNoContentProps {
  readonly tagName: string
}

const TagNoContent: React.FC<ITagNoContentProps> = (props) => {

  const dispatch = useDispatch()

  let imgSrc = 'https://sidelineapp.bornuat1.co.nz/media/3554/sideline_rugby_condor-regional_18oct19jc8_1229-2x.jpg'

  switch (window.location.host) {
    case 'localhost:3000':
    case 'localhost:3100':
    case 'spookylive.dev-sites.co.nz':
      imgSrc = 'https://dev.sidelineapp.bornuat1.co.nz/media/2172/sideline_rugby_condor-regional_18oct19jc8_1229-2x.jpg'
    case 'localhost:3200':
    case 'sideline.live.bornuat1.co.nz':
    case 'sideline.live.bornprod3.co.nz':
    case 'sideline.live':
      imgSrc = 'https://sidelineapp.bornuat1.co.nz/media/3554/sideline_rugby_condor-regional_18oct19jc8_1229-2x.jpg'
  }

  return (
    <section>
      <div className={`container`}>

        <div className={styles['error-image']}>
          <LazyImage src={imgSrc} alt="" />
        </div>

        <div className={styles['error-content']}>
          <div className={styles['error-content__number']}>{props.tagName}</div>
          <div className={styles['error-content__label']}>No content found</div>
          <div className={styles['error-content__button-container']}>
            <Button className={styles['content__button']} variant="secondary" color="success" label="Browse" onClick={() => dispatch(push('/browse'))} />
          </div>
          <div className={styles['error-content__text']}>
            <h1>NOTHING TO SEE HERE YET - CLICK ON BROWSE TO FIND SOMETHING TO WATCH</h1>
          </div>
        </div>
      </div>

    </section>


  )
}

export default TagNoContent