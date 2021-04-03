import React from 'react'
import styles from '../SignUp/SignUp.module.scss' // from SignUp as it is the same styles
import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'

const SignUpSuccessful = () => {
  return (
    <LayoutDefault>
      <section>
        <div className="container">
          <div className={styles['signup']}>
            <div className={styles['signup__intro']}>
              <h1>Welcome to Sideline.live</h1>
              <hr />
              <p>
                Please sign in. Watch a selection of past games, save your favourites to ‘My Streams’, and purchase this
                weekend’s Super Eight Rugby games. We appreciate your help with finding any bugs that we need to fix.
              </p>
            </div>
            <div className={styles['signup__content']}>
              <div className={styles['signup__form-header']}>
              </div>
              <div className={styles['signup__form-container']}>
                <div className={styles['signup__form-join']}>
                  <p>Thanks. Sign up successful. Please log in below.</p>
                  <p>
                    <Button variant="secondary" color="success" label="Log in" size="full" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutDefault>
  )
}

export default SignUpSuccessful
