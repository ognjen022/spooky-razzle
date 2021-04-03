/* ==========================================================================
   Mobile Menu Button
   ========================================================================== */

if (document.querySelector(".menu-button")) {
  document.querySelector(".menu-button").addEventListener("click", function () {
    document.querySelector(".header-nav").classList.toggle("is-active");
    this.classList.toggle("is-active");
  });
}

/* ==========================================================================
   Schedule Chevron Button
   ========================================================================== */

if (document.querySelector(".schedule__icon-right")) {
  document.querySelector(".schedule__icon-right").addEventListener("click", function () {
    document.querySelector(".schedule__dates").classList.toggle("visible");
    document.querySelector(".schedule__teams").classList.toggle("visible");
    document.querySelector(".schedule__icon-right").classList.toggle("clicked");
  });
}

/* ==========================================================================
   Show Calendar Button
   ========================================================================== */

if (document.querySelector(".calendar__date")) {
  document.querySelector(".calendar__icons-month-inactive").addEventListener("click", function () {
    document.querySelectorAll('.calendar__date').forEach(function (item) {
      item.classList.toggle("is-active");
    });
  });
}

if (document.querySelector(".calendar__table")) {
  document.querySelector(".calendar__icons-down").addEventListener("click", function () {
    document.querySelector(".calendar__table").classList.toggle("calendar-visible");
  });
}


/* ==========================================================================
   Modal
   ========================================================================== */

if (document.querySelector(".js-toggle-modal")) {
  document.querySelectorAll('.js-toggle-modal').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelector(".modal").classList.toggle("is-active");
      console.log("clicked");
    });
  });
}

/* ==========================================================================
   Glide Slider
   ========================================================================== */

if (document.querySelector(".hero-carousel-news")) {
  var glideHeroNewsCarousel = new Glide('.hero-carousel-news .glide', {
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

  glideHeroNewsCarousel.on(['mount.after', 'run'], function () {
    document.querySelector('.hero-carousel-news__counter-current').innerHTML = glideHeroNewsCarousel.index + 1
  })

  glideHeroNewsCarousel.mount()
}

if (document.querySelector(".hero-carousel-video")) {
  var glideHeroVideoCarousel = new Glide('.hero-carousel-video .glide', {
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

  glideHeroVideoCarousel.on(['mount.after', 'run'], function () {
    document.querySelector('.hero-carousel-video__counter-current').innerHTML = glideHeroVideoCarousel.index + 1
  })

  glideHeroVideoCarousel.mount()
}

if (document.querySelector(".video-single-carousel")) {
  var glideVideoSingleCarousel = new Glide('.video-single-carousel__slider .glide', {
    type: 'carousel',
    hoverpause: true,
    perView: 1
  })

  glideVideoSingleCarousel.on(['mount.after', 'run'], function () {
    document.querySelector('.video-single-carousel__counter-current').innerHTML = glideVideoSingleCarousel.index + 1
  })

  glideVideoSingleCarousel.mount()
}

if (document.querySelector(".verses-carousel")) {
  var glideVersesCarousel = new Glide('.verses-carousel .glide', {
    type: 'carousel',
    hoverpause: true,
    perView: 1
  })

  glideVersesCarousel.mount()
}

if (document.querySelector(".payment")) {
  var glidePaymentCarousel = new Glide('.payment .glide', {
    type: 'slider',
    hoverpause: true,
    perView: 4,
    bound: 4,
    gap: 20,
    breakpoints: {
      1025: {
        perView: 2,
        gap: 20
      },
      769: {
        perView: 1,
        gap: 50,
        peek: {
          before: 30,
          after: 30
        }
      }
    }
  })

  glidePaymentCarousel.mount()
}

if (document.querySelector(".news-post-image-carousel")) {
  var glidePostImageCarousel = new Glide('.news-post-image-carousel .glide', {
    type: 'carousel',
    hoverpause: true,
    perView: 1,
    gap: 0,
    animationDuration: 600
  })

  glidePostImageCarousel.mount()
}

if (document.querySelector(".news-post-similar-news")) {
  var glideNewsPostSimilarNewsCarousel = new Glide('.news-post-similar-news .glide', {
    type: 'carousel',
    hoverpause: true,
    perView: 1,
    gap: 0,
    animationDuration: 600,
    breakpoints: {
      769: {
        peek: {
          before: 0,
          after: 100
        }
      }
    }
  })

  glideNewsPostSimilarNewsCarousel.mount()
}

/* ==========================================================================
   Account Accordion
   ========================================================================== */

var accordionControls = document.querySelectorAll('.account__title');

[].forEach.call(accordionControls, el => {
  el.addEventListener('click', accordionClick, false)
})

function accordionClick() {
  [].forEach.call(accordionControls, el => {
    // except for the element clicked, remove active class
    if (el !== this) {
      el.classList.remove('is-active');
      el.nextElementSibling.classList.remove('is-active');
    }
  });
  // toggle active on the clicked button
  this.nextElementSibling.classList.add('is-active');
  this.classList.add('is-active');
}


/* ==========================================================================
   Hero Carousel Accordion Mobile
   ========================================================================== */

var heroAccordionControls = document.querySelectorAll('.hero-carousel-mobile__button');

[].forEach.call(heroAccordionControls, el => {
  el.addEventListener('click', heroAccordionClick, false)
})

function heroAccordionClick() {
  [].forEach.call(heroAccordionControls, el => {
    // except for the element clicked, remove active class
    if (el !== this) {
      el.classList.remove('is-active');
      el.parentNode.classList.remove('is-active');
    }
  });
  // toggle active on the clicked button
  this.parentNode.classList.add('is-active');
  this.classList.add('is-active');
}


/* ==========================================================================
   Inline Post
   ========================================================================== */

if (document.querySelector(".js-toggle-inline-post")) {
  document.querySelectorAll('.js-toggle-inline-post').forEach(function (item) {
    item.addEventListener('click', function () {
      this.classList.toggle("is-active");
      document.querySelector(".inline-post__content").classList.toggle("is-active");
    });
  });
}

/* ==========================================================================
   Multi Carousel
   ========================================================================== */

if (document.querySelector(".video-multi-carousel__button-next")) {
	document.querySelector(".video-multi-carousel__button-next").addEventListener("click", function () {
		document.querySelectorAll('.video-multi-carousel__image-group').forEach(function(element) {
		  element.classList.add("show-next");
		});

	});
}

if (document.querySelector(".video-multi-carousel__button-prev")) {
	document.querySelector(".video-multi-carousel__button-prev").addEventListener("click", function () {
		document.querySelectorAll('.video-multi-carousel__image-group').forEach(function(element) {
		  element.classList.add("show-prev");
		});
	});
}