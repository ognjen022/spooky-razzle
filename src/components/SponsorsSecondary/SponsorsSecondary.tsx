import React from 'react'
import LazyImage from '../LazyImage/LazyImage'

import styles from '../SponsorsPrimary/SponsorsPrimary.module.scss'

interface ISponsorsItems {
  name: string;
  image: any
}

interface ISponsorsSecondaryProps {
  items: ISponsorsItems[];
}

const SponsorsSecondary: React.FC<ISponsorsSecondaryProps> = (props) => {
  return (
    <section>
      <div className="container">
        <div className={`${styles['sponsors']} ${styles['sponsors--secondary']}`}>
          <div className={`${styles['sponsors__label']} ${styles['sponsors__title']}`}>
            <p>Secondary</p>
          </div>
          <div className={styles['sponsors__group']}>
            <SponsorsItems items={props.items} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorsSecondary

const SponsorsItems: React.FC<ISponsorsSecondaryProps> = (props) => {
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
