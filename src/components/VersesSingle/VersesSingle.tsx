import React, { useEffect } from 'react'
import LazyImage from '../LazyImage/LazyImage';

import styles from './VersesSingle.module.scss'

const VersesSingle: React.FC = () => {

  let styleName = styles['verses-carousel'];
  let styleName2 = styles['glide'];

  useEffect(() => {
    (window as any).__glide_verses(styleName, styleName2);

  }, [styleName, styleName2]);

  return (
    <section>
      <div className="container">
        <div className={styles['verses']}>
          <div className={styles['verses__inner']}>
            <div className={styles['verses__team']}>
              <div className={styles['verses__team-name']}>
                Hasting Boys High
                            </div>
              <div className={styles['verses__team-logo']}>
                <LazyImage src="https://via.placeholder.com/110x110" alt="" />
              </div>
            </div>
            <div className={styles['verses__middle']}>
              <div className={styles['verses__middle-inner']}>
                <div className={styles['verses__vs']}>VS</div>
                <div className={styles['verses__date-time']}>
                  Tue 7th Jan<br /> 4.00 PMs
                                </div>
              </div>
            </div>
            <div className={styles['verses__team']}>
              <div className={styles['verses__team-name']}>Alfriston College</div>
              <div className={styles['verses__team-logo']}>
                <LazyImage src="https://via.placeholder.com/110x110" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VersesSingle
