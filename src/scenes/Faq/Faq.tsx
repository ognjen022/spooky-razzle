import React from 'react';
import styles from './Faq.module.scss'
import DOMPurify from 'dompurify'
import InlinePost from '../../components/InlinePost/InlinePost';
import InlinePostGroup from '../../components/InlinePost/InlinePostGroup';

interface AboutProps {
}

  const faqContent = [
  {
    question: "Where can I watch Sideline.Live?",
    answer: "You can watch anywhere, at any anytime, on any device.<br /><br />"
          + "Simply sign in to Sideline.Live with your email address and instantly watch all past games on-demand. "
          + "Watch from your personal computer or on any internet-connected device. "
          + "We recommend that you use a chrome browser for the best viewing experience."
  },
  {
    question: "How much does Sideline.Live cost?",
    answer: "At Sideline.Live we make all past games on the platform available to our subscribers to watch on-demand.<br /><br />"
          + "Watch all games live with a Monthly Subscription of $9.95 per month, purchase a single game for $4.95, "
          + "or follow competition games live by purchasing a Season Pass.<br /><br />"
          + "Monthly Subscription will be billed once a month on the date that you originally signed up."
  },
  {
    question: "How do I cancel my monthly subscription?",
    answer: "With Sideline.Live there are no fixed-term contracts. "
          + "You can easily cancel your monthly subscription by emailing <a href='mailto:support@sideline.live'>support@sideline.live</a>. "
          + "There are no cancellation fees – start or stop your account at any time.<br /><br />"
          + "If you cancel your monthly subscription, you'll still have access until the end of the period you've paid for."
  },
  {
    question: "How does a club or school benefit from Sideline.Live?",
    answer: "We don’t think it’s right that media companies buy the rights to grassroots sports, "
          + "then decide how many games get shown, and when. So we put clubs and schools in control of their own content.<br /><br />"
          + "We work with the clubs and schools to create their own livestreaming channels. "
          + "And every time you pay to watch a game on Sideline.Live, we give a portion of the proceeds directly to grassroots sports. "
          + "That way, you get to see more of the teams you love."
  },
  {
    question: "How can a club or school work with Sideline.Live?",
    answer: "If you’d like to know more about how Sideline.Live can benefit your club or school, "
          + "please email <a href='mailto:info@sideline.live'>info@sideline.live</a>"
  },
  {
    question: "How can I Chromecast with Sideline.Live to the big screen?",
    answer: "Yes, Sideline.Live supports Chromecast to cast live games directly to any Chromecast TV or device. "
          + "We recommend using a Chrome browser and to use the instructions supplied by Google."
  }
];

const About: React.FC<AboutProps> = (props: AboutProps) => {

  

  return (
    <section>
      <div className={'container'}>
        <div className={styles['faq-wrapper']}>
          
          <InlinePostGroup data={faqContent} />
          {/* {faqContent.map(({ question, answer }) =>
            <InlinePost title={question}>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }} />
            </InlinePost>
          )} */}
        </div>
      </div>
    </section>
  )
}

export default About