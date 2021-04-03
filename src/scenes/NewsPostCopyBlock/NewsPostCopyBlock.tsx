import React from 'react'

import styles from './NewsPostCopyBlock.module.scss'

const NewsPostCopyBlock = () => {
    return (
        <section>
            <div className="container">
                <div className={styles['news-post-copy-block']}>
                    <div className={styles['news-post-copy-block__content']}>
                        <p><strong>Lorem ipsum set dolor.</strong></p>

                        <p>Sed efficitur viverra libero id molestie. Donec in egestas urna. Aliquam laoreet lacus condimentum, fermentum urna sed, dictum Leo. Nullam lobortis es quis mi id aliquam. Aenean porta ligula id pulvinar bibendum. Mauris consectetur quam nisi, porttitor malesuada massa dictum sit amet. Aliquam ornare condimentum purus eget efficitur. Phasellus fermentum pulvinar elit sit amet malesuada. Aenean quis lacus at sapien tempor imperdiet nec eu ipsum. Morbi erat ante, suscipit eget pretium quis, mollis ac ante. Vestibulum tortor neque, tincidunt eu ipsum eu, pretium elementum urna. </p>

                        <p>Suspendisse maximus, dolor ut euismod consequat, odio velit dictum Leo, et finibus urna elit non augue. Lorem ipsum dolor sit amet, consecteturefd adipiscing elit. Duis ultricies urna non ligula posuere egestas. Etiam luctus sodales lectus, non maximus tortor finibus vitae. Phasellus sit amet oft mos scelerisque risus, sed sagittis felis. Aenean a volutpat diam. Nullam ut ex accumsan lorem vestibulum volutpat id ut sapien. Donec odio massa, mollisef nec leo a, volutpat semper leo. Etiam porta tincidunt nunc commodo commodo. Vestibulum in urna nec elit fermentum fermentum. Etiam sodales arcu vitae nisi vestibulum tempor. Sed a maximus ligula. Ut scelerisque congue eros, a feugiat velit. Duis sit amet augue felis. In ultricies, nibh interdum faucibus bibendum, neque velit eleifend justo, non fermentum lacus elit vel diam.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsPostCopyBlock
