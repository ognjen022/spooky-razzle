
/* ==========================================================================
   Glide Verses
   ========================================================================== */

window.__glide_verses = function (styleName, styleName2) {

  if (document.querySelector(`.${styleName}`)) {
    var glideVersesCarousel = new Glide(`.${styleName} .glide`, {
      type: 'carousel',
      hoverpause: true,
      perView: 1
    })
    glideVersesCarousel.mount()
  }
}

/* ==========================================================================
   Video Single Carousel
   ========================================================================== */

window.__glide_video_single_carousel = function (styleVideoSingleCarousel, styleVideoSingleCarouselSlider, styleGlide, idVideoSingleCarouselCounterCurrent) {

  if (document.querySelector(`.${styleVideoSingleCarousel}`)) {
    var glideVideoSingleCarousel = new Glide(`.${styleVideoSingleCarouselSlider} .${styleGlide}`, {
      type: 'carousel',
      hoverpause: true,
      perView: 1
    })

    glideVideoSingleCarousel.on(['mount.after', 'run'], function () {
      document.querySelector(`${idVideoSingleCarouselCounterCurrent}`).innerHTML = glideVideoSingleCarousel.index + 1
    })

    glideVideoSingleCarousel.mount()
  }
}

/* ==========================================================================
   Video Multi Carousel
   ========================================================================== */

window.__NewGlide = function (selector, settings) {
  if (document.querySelector(`${selector}`)) {
    let result = new Glide(selector, settings);
    return result;
  }

  return undefined;
};

/* ==========================================================================
   Glide Slider - Hero Carousel Video
   ========================================================================== */

window.__glide_hero_carousel_video = function (styleHeroCarouselVideo, styleHeroCarouselVideoSlider, glideStyle, afterRunFunc) {

  if (document.querySelector(`.${styleHeroCarouselVideo}`)) {

    var glideHeroVideoCarousel = new Glide(`.${styleHeroCarouselVideoSlider} .${glideStyle}`, {
      type: 'carousel',
      hoverpause: true,
      perView: 1,
      gap: 0,
      animationDuration: 600,
      peek: {
        before: 0,
        after: 140
      }
    })

    glideHeroVideoCarousel.on(['mount.after', 'run'], () => afterRunFunc(glideHeroVideoCarousel.index))

    glideHeroVideoCarousel.mount()
  }
}



