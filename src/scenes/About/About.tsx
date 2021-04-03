import React from 'react';
import styles from './About.module.scss'
import Button from '../../components/Button/Button'
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

interface AboutProps {
}

const About: React.FC<AboutProps> = (props: AboutProps) => {

  const dispatch = useDispatch()

  return (
    <section>
      <div className={'container'}>
        <div className={styles['about-wrapper']}>
          <div className={styles['about']}>
            <div className={styles['about__year']}>
              <span className={styles['label']}>2020</span>
            </div>
            <div className={styles['about__about-us']}>
              <div className={styles['about__about-us__wrapper']}>

                <span className={styles['label']}>About Us</span>
                <div className={styles['about__about-us__icons']}>
                  <a href="https://www.facebook.com/sidelinelivenz" target="_blank" rel="noopener">
                    <svg className={styles['about__about-us__icon']} role="presentation">
                      <use xlinkHref="#icon-social-facebook-circle"></use>
                    </svg>
                    <span className="screen-reader-text">Facebook</span>
                  </a>
                  <a href="https://twitter.com/SidelineLive" target="_blank" rel="noopener">
                    <svg className={styles['about__about-us__icon']} role="presentation">
                      <use xlinkHref="#icon-social-twitter-circle"></use>
                    </svg>
                    <span className="screen-reader-text">Twitter</span>
                  </a>
                  <a href="https://www.instagram.com/sideline.live" target="_blank" rel="noopener">
                    <svg className={styles['about__about-us__icon']} role="presentation">
                      <use xlinkHref="#icon-social-instagram-circle"></use>
                    </svg>
                    <span className="screen-reader-text">Instagram</span>
                  </a>
                </div>
              </div>

              <h1>Good for the Game</h1>
              <p className={styles['large']}>Grassroots sport is the glue that holds local communities together: the club matches, the school finals, and the local rivalries that bring supporters to the sidelines every weekend and nurture the next generation of Kiwi sporting stars.</p>
              <p>
              The professional sports era has done a lot of great things for New Zealand. It’s helped to fulfil the ambitions of our sportspeople, and has given them the chance to excel on the global stage. But we also need to make sure that the connection between communities and their local clubs, schools and teams remains strong.
              </p>
            </div>
          </div>
          <div className={styles['about-slider']}>

            <img className={styles['about-slider__image']} src={process.env.PUBLIC_URL + '/images/Rugby_2019-4.png'} alt="" />

            <span className={styles['about-slider__image-credit']}></span>
            <span className={styles['about-slider__image-text']}>Thank you to all the photographers who have contributed to Sideline.Live. Your great photos help us capture all the energy and excitement of grassroots sport from around New Zealand.</span>

            {/* <div className={styles['about-slider__icons']}>
              <svg className={styles['about-slider__chevron-icon']} role="presentation">
                <use xlinkHref={'#icon-chevron-left'}></use>
              </svg>
              <svg className={styles['about-slider__chevron-icon']} role="presentation">
                <use xlinkHref={'#icon-chevron-right'}></use>
              </svg>
            </div> */}
          </div>


          <div className={styles['about-content']}>
            <div className={styles['about-content__year-empty']}>
            </div>
            <div className={styles['about-content__text']}>
              {/* <h1 className={styles['about-content__text__heading']}>We are here to make it better</h1>
              <h1 className={styles['about-content__text__mobile-heading']}>We want to fix it</h1> */}
              <p>At Sideline.Live, we connect supporters to the grassroots sport taking place in their communities every week. When you can’t make it to the game, you can watch on our platform, live or on demand, wherever you are in the world, on any device. We show all teams and all games. And we show all codes as well. <br/><br/>We believe that the health of our sports - and our communities - depends on building support from the bottom up. New Zealanders love sport. This is our way of showing our love for the grassroots heroes who keep our games alive on fields around the country week after week, season after season.</p>

              {/* <p>We know that the health of our sports - and our communities - depends on building support from the bottom up, rather than the top-down. New Zealanders love sport. This is our way of showing our love for the grassroots heroes who keep our games alive on fields around New Zealand, week after week, season after season.</p> */}
            </div>

          </div>

          <div className={styles['parallax-image']}>

            <div style={{
              background: `url(${process.env.PUBLIC_URL + '/images/Rugby_2019-3.png'}) no-repeat center center fixed`,
            }} />
          </div>

          <div className={styles['about-list']}>
            <div className={styles['about-list__heading-wrapper']}>
              <h1 className={styles['about-list__heading']}>We believe in grassroot sport</h1>
            </div>
            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>01</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p>All sports, all teams. <br />all games. </p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>We work with clubs and schools to livestream the games that matter to them - not just the ones that draw the biggest crowds. We support all clubs, teams and schools, no matter their size. And we stream all sports. That means more teams, more games, and more of the action supporters want to see.</p>
              </div>
            </div>

            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>02</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p>Be there for your team.<br /> Even when you can’t be on the sideline.</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>We know how hard it is to make it to the sideline every week. Whether you’re a family member, a selector, or a supporter overseas, you never have to miss a game. And with games available on demand as well as livestreamed, players and coaches can watch the action back whenever they want.</p>
              </div>
            </div>

            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>03</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p>We believe in all the people who make grassroots sport happen.</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>We want to celebrate all the unsung heroes. We tell the behind-the-scenes stories traditional platforms overlook. It’s our way of saying thank you to everyone - the coaches, the administrators, the refs and half-time orange choppers - who keep the games we love alive, week after week.</p>
              </div>
            </div>
            <div className={styles['about-list__buttons-wrapper']}>
              <div className={styles['about-list__buttons']}>
                <Button className={styles['about-list__button']} color="success" label="Join Us" onClick={() => dispatch(push('/subscribe-now'))} />
                <Button className={styles['about-list__button']} color="ghost-green" label="Browse Games" onClick={() => dispatch(push('/browse'))} />
              </div>
            </div>
          </div>

          <div className={styles['parallax-image']}>

            <div style={{
              background: `url(${process.env.PUBLIC_URL + '/images/Rugby_2019-1.png'}) no-repeat center center fixed`,
            }} />
          </div>


          <div className={styles['about-list']}>
            <div className={styles['about-list__heading-wrapper']}>
              <h1 className={styles['about-list__heading']}>We grow the local game</h1>
            </div>
            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>01</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p>Every time you watch, you pay it forward for your team.</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>Without all the coaches, the refs, and the mums and dads sizzling sausages, there wouldn’t be grassroots sport. To help them keep doing what they love, we share the proceeds from our platform with the organisations who stream on it. So every time you watch, you’re paying it forward for your team.</p>
              </div>
            </div>

            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>02</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p> We put clubs and schools in control of their own content.</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>We don’t think it’s right that clubs and schools struggle to give their supporters access to all the games they want to show. We put them in control of their own content. We also work with them to create their own livestreaming channels. That way, you get to see more of the teams you love.</p>
              </div>
            </div>

            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>03</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p> We connect communities to grassroots sports</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>It wasn’t so long ago that local games and rivalries brought local people together. We want to help connect communities with their clubs and schools - and show that great sporting moments happen and future stars emerge on fields right around the country, every week.</p>
              </div>
            </div>
            <div className={styles['about-list__buttons-wrapper']}>
              <div className={styles['about-list__buttons']}>
                <Button className={styles['about-list__button']} color="success" label="Join Us" onClick={() => dispatch(push('/subscribe-now'))} />
                <Button className={styles['about-list__button']} color="ghost-green" label="Browse Games" onClick={() => dispatch(push('/browse'))} />
              </div>
            </div>
          </div>

          <div className={styles['parallax-image']}>

            <div style={{
              background: `url(${process.env.PUBLIC_URL + '/images/Rugby_2019-2.png'}) no-repeat center center fixed`,
            }} />
          </div>

          <div className={styles['about-list']}>
            <div className={styles['about-list__heading-wrapper']}>
              <h1 className={styles['about-list__heading']}>Never miss a game</h1>
            </div>
            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>01</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p>Watch a game.<br /> Or stay for the season.</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>We want as many supporters as possible to connect with the teams they love. With affordable and varied pricing, you can decide how much you watch, and when. Watch a one-off game for the price of a coffee, sign up for a whole season, or subscribe monthly – it’s up to you.</p>
              </div>
            </div>

            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>02</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p>Watch anytime,<br /> live and on demand.<br /> Watch anywhere, <br /> on any device.</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>You can watch on any internet connected device. So you can tune in whenever you’re online, wherever you are in the world.</p>
              </div>
            </div>

            <div className={styles['about-list__item']}>
              <div className={styles['about-list__number']}>
                <span className={styles['label']}>03</span>
              </div>

              <div className={styles['about-list__short-text']}>
                <p>Follow your school,<br /> your club, your team.</p>
              </div>

              <div className={styles['about-list__long-text']}>
                <p>We want to make it easy for you to follow the teams you love. So we’ve built a platform for everyone, big and small. And we have journalists dedicated to covering grassroots sport, so you’ll never miss a story about your game.</p>
              </div>
            </div>
            <div className={styles['about-list__buttons-wrapper']}>
              <div className={styles['about-list__buttons']}>
                <Button className={styles['about-list__button']} color="success" label="Join Us" onClick={() => dispatch(push('/subscribe-now'))} />
                <Button className={styles['about-list__button']} color="ghost-green" label="Browse Games" onClick={() => dispatch(push('/browse'))} />
              </div>
            </div>
          </div>

          <div className={styles['parallax-image']}>

            <div style={{
              background: `url(${process.env.PUBLIC_URL + '/images/Rugby_2019-5.png'}) no-repeat center center fixed`,
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About