import React from 'react';
import styles from './About.module.scss'
import Button from '../../components/Button/Button'
import LazyImage from '../../components/LazyImage/LazyImage';

interface AboutConversionLeadProps {
}

const AboutConversionLead: React.FC<AboutConversionLeadProps> = (props: AboutConversionLeadProps) => {
  return (
    <section>
      <div className={'container'}>
        <div className={styles['about-image']}>
          <LazyImage src={process.env.PUBLIC_URL + '/images/Rugby_2019-2.png'} alt="" />
        </div>

        <div className={styles['about-list']}>
          <div className={styles['about-list__heading-wrapper']}>
            <h1 className={styles['about-list__heading']}>Never miss a game</h1>
          </div>
          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>01</div>

            <div className={styles['about-list__short-text']}>
              Pay for a game.<br /> Or subscribe for the season.
          </div>

            <div className={styles['about-list__long-text']}>
              We want as many supporters as possible to connect with the teams they love. With affordable and varied pricing, you can decide how much you watch, and when. Watch a one-off game for the price of a coffee, sign up for a whole season, or subscribe monthly – it’s up to you.
          </div>
          </div>

          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>02</div>

            <div className={styles['about-list__short-text']}>
              Watch anytime,<br /> live and on-demand.<br /> Watch anywhere, on any device.
          </div>

            <div className={styles['about-list__long-text']}>
              Every game we live-stream is also available on demand - so you can watch when it suits you. And you can watch on any internet connected device. So you can tune in whenever you’re online, wherever you are in the world.
          </div>
          </div>

          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>03</div>

            <div className={styles['about-list__short-text']}>
              Follow your school,<br /> your club, your team.
          </div>

            <div className={styles['about-list__long-text']}>
              We want to make it easy for you to follow the teams your love - not the ones a broadcaster decides to show you. So we’ve built a platform for everyone, not just the clubs or schools big enough to sign broadcasting contracts. And we have journalists dedicated to covering grassroots sport, so you’ll never miss a story about your game.
          </div>
          </div>
          <div className={styles['about-list__buttons-wrapper']}>
            <div className={styles['about-list__buttons']}>
              <Button className={styles['about-list__button']} variant="secondary" color="success" label="Join Us" />
              <Button className={styles['about-list__button']} variant="secondary" label="Browse Games" />
            </div>
          </div>
        </div>

        <div className={styles['about-image']}>
          <LazyImage src={process.env.PUBLIC_URL + '/images/Rugby_2019-3.png'} alt="" />
        </div>

        <div className={styles['about-list']}>
          <div className={styles['about-list__heading-wrapper']}>
            <h1 className={styles['about-list__heading']}>We believe in grassroot sport</h1>
          </div>
          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>01</div>

            <div className={styles['about-list__short-text']}>All sports, all teams.<br /> Not just big ones. <br />All games. <br />Not just finals.</div>

            <div className={styles['about-list__long-text']}>
              That’s why we work with clubs and schools to livestream the games that matter to them - not the ones traditional networks decide to broadcast. We support all clubs, teams and schools, not just the big ones. And we stream all sports, not just rugby. That means more teams, more games, and more of the action supporters want to see.
          </div>
          </div>

          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>02</div>

            <div className={styles['about-list__short-text']}>
              Be there for your team.<br /> Even when you can’t be on the sideline.
          </div>

            <div className={styles['about-list__long-text']}>
              We know how hard it is to make it to the sideline every week. Whether you’re a family member, a selector, or a supporter overseas, you never have to miss a game. And with games available on-demand as well as live-streamed, players and coaches can watch the action back whenever they want.
          </div>
          </div>

          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>03</div>

            <div className={styles['about-list__short-text']}>
              We believe in all the people who make it happen.
          </div>

            <div className={styles['about-list__long-text']}>
              And we want to celebrate all the unsung heroes. We tell the behind-the-scenes stories traditional platforms overlook. It’s our way of saying thank you to everyone - the coaches, the administrators, the refs and half-time orange choppers - who keep the games we love alive, week after week.
          </div>
          </div>
          <div className={styles['about-list__buttons-wrapper']}>
            <div className={styles['about-list__buttons']}>
              <Button className={styles['about-list__button']} variant="secondary" color="success" label="Join Us" />
              <Button className={styles['about-list__button']} variant="secondary" label="Browse Games" />
            </div>
          </div>
        </div>

        <div className={styles['about-image']}>
          <LazyImage src={process.env.PUBLIC_URL + '/images/Rugby_2019-1.png'} alt="" />
        </div>

        <div className={styles['about-list']}>
          <div className={styles['about-list__heading-wrapper']}>
            <h1 className={styles['about-list__heading']}>We grow the local game</h1>
          </div>
          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>01</div>

            <div className={styles['about-list__short-text']}>
              Every time you pay, you pay it forward for your team.
          </div>

            <div className={styles['about-list__long-text']}>
              Without all the coaches, the refs, and the mums and dads sizzling sausages outside Bunnings, there wouldn’t be grassroots sport. To help them keep doing what they love, we share the proceeds from our platform with the organisations who stream on it. So every time you pay, you’re paying it forward for your team.
          </div>
          </div>

          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>02</div>

            <div className={styles['about-list__short-text']}>
              We put clubs and schools in control of their own content.
          </div>

            <div className={styles['about-list__long-text']}>
              We don’t think it’s right that media companies buy the rights to grassroots sport, then decide how many games get shown, and when. We put clubs and schools in control of their own content. We also work with them to create their own live-streaming channels. That way, you get to see more of the teams you love.
          </div>
          </div>

          <div className={styles['about-list__item']}>
            <div className={styles['about-list__number']}>03</div>

            <div className={styles['about-list__short-text']}>
              We reconnect grassroots sports with their communities.
          </div>

            <div className={styles['about-list__long-text']}>
              It wasn’t so long ago that local games and rivalries brought local people together. We want to reconnect communities with their clubs and schools - and show that great sporting moments happen and future stars emerge on fields right around the country, every week.
          </div>
          </div>
          <div className={styles['about-list__buttons-wrapper']}>
            <div className={styles['about-list__buttons']}>
              <Button className={styles['about-list__button']} variant="secondary" color="success" label="Join Us" />
              <Button className={styles['about-list__button']} variant="secondary" label="Browse Games" />
            </div>
          </div>
        </div>

        <div className={styles['about']}>
          <div className={styles['about__year']}>
            2020
        </div>
          <div className={styles['about__about-us']}>
            <div className={styles['about__about-us__wrapper']}>

              <p>About Us</p>
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
            <p>For a long time, grassroots sports was the glue that held local communities together: the club matches, the school finals, the local rivalries that brought supporters to the sidelines every weekend and nurtured the next generation of Kiwi sporting stars</p>
            <p>
              The professional sports era has done a lot of great things for New Zealand, raising the profiles and ambitions of our sportspeople on the global stage. But the connection between communities and their local clubs, schools and teams has started to be lost.
            </p>
          </div>
        </div>
        <div className={styles['about-slider']}>

          <img className={styles['about-slider__image']} src={process.env.PUBLIC_URL + '/images/Rugby_2019-4.png'} alt="" />

          <span className={styles['about-slider__image-credit']}></span>
          <span className={styles['about-slider__image-text']}>Thank you to all the photographers who have contributed to Sideline.Live. Your great photos help us capture all the energy and excitement of grassroots sport from around New Zealand. We'd love to have photos for every team we've had on Sideline.Live, past and present. So if you're a photographer who has taken photos of past competitions, or you're working with your club or school, please get in touch! We'd love to hear from you, and let you know how we can work together. Thanks to all the photographers on the sidelines each weekend!</span>

          <div className={styles['about-slider__icons']}>
            <svg className={styles['about-slider__chevron-icon']} role="presentation">
              <use xlinkHref={'#icon-chevron-left'}></use>
            </svg>
            <svg className={styles['about-slider__chevron-icon']} role="presentation">
              <use xlinkHref={'#icon-chevron-right'}></use>
            </svg>
          </div>
        </div>


        <div className={styles['about-content']}>
          <div className={styles['about-content__year-empty']}>
          </div>
          <div className={styles['about-content__text']}>
            <h1 className={styles['about-content__text__heading']}>We are here to make it better</h1>
            <h1 className={styles['about-content__text__mobile-heading']}>We want to fix it</h1>
            <p>At Sideline.Live, we reconnect supporters to the grassroots sports taking place in their communities every week. When you can’t make it to the sideline, you can watch on our platform, live or on-demand, wherever you are in the world, on any device. Unlike the big traditional networks, we show all teams and games, not just the big ones. And we show all codes, not just rugby.</p>

            <p>We know that the health of our sports - and our communities - depends on building support from the bottom up, rather than the top-down. New Zealanders love sport. This is our way of showing our love for the grassroots heroes who keep our games alive on fields around New Zealand, week after week, season after season.</p>
          </div>

        </div>

        <div className={styles['about-image']}>
          <LazyImage src={process.env.PUBLIC_URL + '/images/Rugby_2019-5.png'} alt="" />
        </div>
      </div>
    </section >
  )
}

export default AboutConversionLead