import React from 'react'
import LazyImage from '../LazyImage/LazyImage'

import styles from './SponsorsPrimary.module.scss'

interface ISponsorsItems {
  name: string;
  image: any
}

interface ISponsorsPrimaryProps {
  items: ISponsorsItems[];
}

const SponsorsPrimary: React.FC<ISponsorsPrimaryProps> = (props) => {
  return (
    <section>
      <div className="container">
        <div className={styles['sponsors']}>
          <div className={`${styles['sponsors__label']} ${styles['sponsors__title']}`}>
            <p>Primary</p>
          </div>
          <div className={styles['sponsors__group']}>
            <SponsorsItems items={props.items} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorsPrimary

const SponsorsItems: React.FC<ISponsorsPrimaryProps> = (props) => {
  return (
    <>
      {props.items && props.items.map(item =>
        <div className={styles['sponsors__item']}>
          <div className={styles['sponsors__logo']}>
            <LazyImage src={item.image} alt={item.name} />
          </div>
          <div className={styles['sponsors__label']}>
            <p>{item.name}</p>
          </div>
        </div>
      )}
    </>
  )
}
