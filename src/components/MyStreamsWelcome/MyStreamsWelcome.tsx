import React from 'react'

import styles from './MyStreamsWelcome.module.scss'

export interface IMyStreamsWelcomeProps {
  name: string;
  email: string | undefined;
}

const MyStreamsWelcome: React.FC<IMyStreamsWelcomeProps> = (props) => {

  const firstName = props.name.split(" ")[0];

  return (
    <section>
      <div className="container">
        <div className={styles['my-streams-welcome']}>
          <div className={styles['my-streams-welcome__details']}>
            <div>
              <strong>{props.name}</strong>
              {props.email && <div>{props.email}</div>}
            </div>
            <a href="/account" className={styles['my-streams-welcome__details--edit-icon-circle']}>
              <svg className="icon" role="presentation">
                <use xlinkHref="#icon-edit-circle"></use>
              </svg>
            </a>
          </div>
          <div className={styles['my-streams-welcome__greeting']}>
            <h2>Kia'ora {firstName}.</h2>
            <a href="/" className={styles['my-streams-welcome__greeting--edit-icon-circle']}>
              <svg className="icon" role="presentation">
                <use xlinkHref="#icon-edit-circle"></use>
              </svg>
            </a>

          </div>
          <div className={styles['my-streams-welcome__text']}>
            <p>The ‘My Streams’ page makes it easy to follow the games you love.</p>
            <p>Simply toggle the ‘Save’ button to move your school, your club, your team, or a competition to the ‘My Streams’ page. Toggle ‘Save’ to move your favourites or upcoming games to the ‘My Streams’ page - for quick access to watch live or on-demand.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyStreamsWelcome
