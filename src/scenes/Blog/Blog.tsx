import React from 'react'

import styles from '../Blog/Blog.module.scss'

import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import Ticker from '../../components/Ticker/Ticker'
import LazyImage from '../../components/LazyImage/LazyImage'

const Blog = () => {
  return (
    <LayoutDefault>
      <Ticker text="NEXT STREAM IS COMING UP IN 3 HOURS. WATCH LIVE HERE NOW." link={undefined} />
      <section>
        <div className="container">
          <article className={styles['blog-post']}>
            <div className={styles['blog-post__image']}>
              <picture>
                <source media="(min-width:740px)" srcSet="http://placekitten.com/g/1636/652" />
                <LazyImage src="http://placekitten.com/g/728/290" alt="" />
              </picture>
            </div>

            <div className={styles['blog-post__title']}>
              <h1>Hastings Highschool Win With Amazing Last Minute Goal.</h1>
              <div className={styles['blog-post__date']}>12/03/20</div>
            </div>

            <div className={styles['blog-post__content']}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor suscipit tellus ut lobortis. Donec elementum dui
                enim, aliquet tempus sem laoreet aliquet. Etiam ut tincidunt diam, eu facilisis metus. Proin vitae urna non diam commodo
                tempus nec at nisl. Nam in quam orci.{' '}
              </p>

              <p>
                Praesent rutrum sit amet sem iaculis venenatis. Proin sem felis, semper et bibendum vitae, hendrerit viverra ligula.
                Vestibulum velit metus, dictum at felis at, ornare varius libero. Proin placerat tortor vel mauris efficitur interdum. Proin
                vitae mattis quam, ac aliquet justo. Phasellus fermentum, nibh non consectetur tincidunt, tortor ipsum porta turpis, a
                pharetra eros justo elementum est. In sollicitudin vel mi a suscipit. Nam feugiat, mauris nec euismod mattis, justo turpis
                dignissim diam, sit amet sollicitudin diam turpis vitae enim.{' '}
              </p>

              <p>
                Aliquam erat volutpat. Donec ornare sit amet purus non ullamcorper. Nulla tellus lectus, eleifend id ante vitae, ullamcorper
                vestibulum neque. Integer ut laoreet purus, tincidunt imperdiet est. Donec facilisis cursus lacus, vel euismod velit aliquet
                at. Mauris egestas id mi eu sodales. Suspendisse semper mattis quam, lacinia luctus massa fermentum ac. Mauris in massa
                mauris. Suspendisse diam dui, semper feugiat dolor sed, venenatis facilisis risus. Aliquam fermentum, neque mattis maximus
                volutpat, augue elit fringilla ipsum, ac sollicitudin magna metus eu arcu. Suspendisse mollis tellus in libero feugiat
                luctus.{' '}
              </p>

              <p>
                Curabitur dolor nibh, placerat ut risus sit amet, semper mollis felis. Pellentesque pretium odio et metus rutrum facilisis.
                Cras vulputate velit massa, nec dictum justo tempor nec. Vestibulum molestie ullamcorper eleifend. Curabitur tristique in
                est vel tristique. Donec vel felis fringilla, iaculis mauris et, elementum risus. Donec imperdiet fringilla viverra. Nulla
                sit amet Leo porta, fringilla sapien a, feugiat arcu. Morbi venenatis porttitor orci, sit amet tristique lorem posuere sit
                amet. Mauris egestas sem vel accumsan volutpat.{' '}
              </p>

              <p>
                Vivamus mattis elit ac quam auctor auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Maecenas rutrum sagittis lacus eget efficitur. Morbi tristique velit ut vulputate tempus. Mauris nec eros vel augue
                vestibulum viverra. Etiam viverra ullamcorper lacinia. Ut eu mi placerat, pharetra tortor a, accumsan enim. Ut neque ante,
                rhoncus et lacus a, maximus sodales arcu. Nam tincidunt convallis nulla, et tincidunt elit lacinia non. Nullam quis nisi vel
                diam viverra semper eu eu urna. Ut nec nulla et dui fringilla dapibus. Nullam ultrices, felis sit amet tincidunt
                ullamcorper, lacus enim vestibulum risus, eu ornare urna mauris eu dui. Duis elementum felis id placerat tincidunt.{' '}
              </p>

              <p>
                Quisque laoreet et enim eu luctus. In vitae leo neque. Ut at pharetra sem. Mauris pellentesque semper interdum. Nam rhoncus
                urna sit amet dignissim tincidunt. Aliquam rhoncus cursus nisi vitae facilisis. In aliquam elit egestas quam iaculis, rutrum
                egestas nunc consectetur. Aenean non diam sit amet turpis malesuada luctus vitae quis massa. Ut non dapibus felis. Proin non
                vestibulum neque. Nulla ac suscipit mauris. Aenean pretium ex nec diam eleifend pulvinar. Nullam fermentum rhoncus nisl.
                Donec dictum tortor at ullamcorper ornare. Pellentesque eu ante aliquet, faucibus est rutrum, auctor erat. In ac odio at
                enim consequat ullamcorper quis a lectus.
              </p>
            </div>
          </article>
        </div>
      </section>
    </LayoutDefault>
  )
}

export default Blog
