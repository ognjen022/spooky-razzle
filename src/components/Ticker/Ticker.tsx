import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactTicker from 'react-ticker'
import styles from './Ticker.module.scss'
import { selectTagByName } from '../../services/content/tags/selectors'
import { RootState } from '../../services/RootState'
import { ITag, ITicker } from '../../services/content/tags/models'

interface ITickerProps {
  text: string | undefined
  link: any
}

const getTicker = (tag: ITag | undefined): ITicker | undefined => {
  if (!tag || !tag.ticker || tag.ticker.length === 0) return undefined
  return tag.ticker[0]
}

const Ticker: React.FC<ITickerProps> = ({ text, link }: ITickerProps) => {

  const homeTag = useSelector<RootState, ITag | undefined>(state => selectTagByName(state, 'home'));
  const defaultTicker: ITicker | undefined = getTicker(homeTag)
  const defaultText = defaultTicker?.tickerMessage;

  return (
    <section>
      <div className="container">
        <div className={styles['ticker']}>
          <a href={link?.url ? link?.url : '#'}>
            <div className={styles['ticker__content']}>
              <ReactTicker speed={20} mode="smooth">
                {() => (
                  <div className={styles['ticker__text-group']}>
                    {text ? text : defaultText}
                  </div>
                )}
              </ReactTicker>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Ticker
