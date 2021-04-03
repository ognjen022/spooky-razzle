
/* ==========================================================================
   Video Player
   ========================================================================== */

function isMobile() {

  var toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  return toMatch.some(function (item) {
    return navigator.userAgent.match(item);
  });
}

function isIos() {
  
  var toMatch = [
    /iPhone/i,
    /iPad/i,
    /iPod/i
  ];
  return toMatch.some(function (item) {
    return navigator.userAgent.match(item);
  });
}
var player = null;
var progressSlider = null;
var volumeSlider = null;

var VideoPlayer = function () {
  this.controls = {
    play: document.querySelector('.play'),
    pause: document.querySelector('.pause'),
    volume: document.querySelector('.volume'),
    volumeSlider: document.querySelector('.video-player__controls-volume-slider'),
    mute: document.querySelector('.mute'),
    seek: document.querySelector('.seek'),
    fullscreen: document.querySelector('.full-screen'),
    exitFullscreen: document.querySelector('.exit-full-screen'),
    liveIndicator: document.querySelector('.live-indicator'),
    spinner: document.querySelector('.video-player__loader .spinner'),
    bigPlay: {
      wrapper: document.querySelector('.video-player__play-big'),
      button: document.querySelector('.video-player__loader .big-play'),
    },
    docElement: document.documentElement
  };

  this.videoPlayerContainer = document.querySelector('.video-player');

  this.isPlaying = false;
  this.isLive = false;
  this.controlsFadeTimeout = -1;
  this.volumeSliderFadeTimeout = -1;
  this.overrideTimeUpdate = false;
}

VideoPlayer.prototype.secondsToHms = function (d) {
  d = Number(d < 0 ? d * -1 : d);
  // var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var mDisplay = m < 10 ? "0" + m : m;
  var sDisplay = s < 10 ? "0" + s : s;
  return `-&nbsp;${mDisplay}:${sDisplay}`;

}

VideoPlayer.prototype.init = function (isLive, updateValueNow, updateRailSize) {
  var self = this;

  self.isLive = isLive;
  self.controls.docElement.ariaValueNow = 'window';
  if (self.isLive) {
    self.controls.docElement.classList.add('live-stream');
  }
  self.controls.docElement.addEventListener('fullscreenchange', function (e) {
    // coming from window mode
    self.controls.docElement.classList.toggle('window');
    self.controls.docElement.classList.toggle('fullscreen');


    if (self.controls.docElement.ariaValueNow === 'window') {
      self.controls.docElement.ariaValueNow = 'fullscreen';
      self.controls.fullscreen.style.display = 'none';
      self.controls.exitFullscreen.style.display = 'block';
      updateRailSize();
    }
    else {
      self.controls.docElement.ariaValueNow = 'window';
      self.controls.fullscreen.style.display = 'block';
      self.controls.exitFullscreen.style.display = 'none';
      updateRailSize();
    }
  })
  var fadeOutControls = function () {
    if (self.isPlaying) {
      document.querySelector('.video-player__logo').classList.add('fade-out');
      document.querySelector('.video-player__logo').classList.remove('fade-in');
      document
        .querySelector('.video-player__controls')
        .classList.add('fade-out');
      document
        .querySelector('.video-player__controls')
        .classList.remove('fade-in');

      if (isIos()) {

        document
          .querySelector('.video-player__top-controls')
          .classList.add('fade-out');
        document
          .querySelector('.video-player__top-controls')
          .classList.remove('fade-in');
      }
    }
  }

  if (document.querySelector('#theoPlayerChromeless') !== null) {
    // eslint-disable-next-line no-undef
    this.theOPlayer = new THEOplayer.ChromelessPlayer(this.videoPlayerContainer, {
      libraryLocation: 'https://cdn.myth.theoplayer.com/8cc4421d-4ada-4a2c-8477-341e25036483',
      autoPlay: !isIos()
    });
    this.theOPlayer.addEventListener('timeupdate', function (e) {
      if (!self.overrideTimeUpdate) {
  
        // console.log(e, self.theOPlayer);
        if (e.currentTime > 0) {
          document.querySelector('.video-player__loader')
            .style.display = 'none';
  
          document.querySelector('.video-player__controls-counter-time').innerHTML = self.secondsToHms((self.theOPlayer.duration !== 'Infinity' ? 0 : self.theOPlayer.duration) - e.currentTime);
  
        }
  
        var isLive = self.theOPlayer.duration === Infinity;
        if (!isLive) {
          var elapsedTime =
            (self.theOPlayer.currentTime / self.theOPlayer.duration) * 100;
          self.controls.seek
            .style
            .left = elapsedTime + '%';
  
          if (isIos()) {
            self.controls.seek
              .style
              .top = '0';
          }
          if (!isNaN(self.theOPlayer.duration)) {
            updateValueNow(elapsedTime)
          }
        } else {
          self.controls.seek
            .style
            .left = '100%';
        }
      }
  
  
      if (isIos()) {
        document.querySelector('.video-player__top-controls').style.display = 'flex';
        self.controls.fullscreen.style.display = 'none';
        updateRailSize();
      }
    });
  } else {
    
    // eslint-disable-next-line no-undef
    this.theOPlayer = new THEOplayer.Player(this.videoPlayerContainer, {
      libraryLocation: 'https://cdn.myth.theoplayer.com/8cc4421d-4ada-4a2c-8477-341e25036483',
      autoPlay: !isIos()
    });

    var svg = document.querySelector('#bigPlay svg')
      
    var old = document.querySelector('.theo-big-play-button-svg-container > svg')
    document.querySelector('.theo-big-play-button-svg-container')
      .replaceChild(svg, old);
  }

  if (this.controls.volumeSlider !== null) {
    this.controls.volumeSlider.addEventListener('mousemove', function (e) {
      clearTimeout(self.volumeSliderFadeTimeout);
      // console.log('mouse')
      self.volumeSliderFadeTimeout = setTimeout(function () {
        // console.log('close')
        self.controls.volumeSlider
          .classList.remove('fade-in');
        self.controls.volumeSlider
          .classList.add('fade-out');
      }, 2000);
    });
  }

  this.videoPlayerContainer.addEventListener('mousemove', function (e) {
    if (self.isPlaying) {
      // cancel the old timeout

      clearTimeout(self.fadeOutTimeout);

      if (document.querySelector('.video-player__controls.fade-in') === null) {
        document
          .querySelector('.video-player__controls')
          .classList.add('fade-in');
        document
          .querySelector('.video-player__controls')
          .classList.remove('fade-out');
      }
      if (document.querySelector('.video-player__logo.fade-in') === null) {
        document.querySelector('.video-player__logo').classList.add('fade-in');
        document
          .querySelector('.video-player__logo')
          .classList.remove('fade-out');
      }

      if (isIos()) {
        if (document.querySelector('.video-player__top-controls.fade-in') === null) {
          document
            .querySelector('.video-player__top-controls')
            .classList.add('fade-in');
          document
            .querySelector('.video-player__top-controls')
            .classList.remove('fade-out');
        }
      }
      self.fadeOutTimeout = setTimeout(function () {
        fadeOutControls();
      }, 5000);
    }
  });

}

VideoPlayer.prototype.open = function (sourceVideo) {

  var self = this;
  if (document.querySelector('#theoPlayerChromeless') === null) {
    if (sourceVideo !== null) {
      
      self.theOPlayer.source = {
        sources : [{
          src : sourceVideo,
          type : 'application/x-mpegurl' // sets type to HLS
        }]
      };
      if (!isIos()) {
        self.onPlay();
      } 
    }
  }
  else {
    if (sourceVideo !== null) {
      self.theOPlayer.src = sourceVideo;

      if (!isIos()) {
        this.controls.spinner.style.display = 'block'
        console.log('auto play on none ios device');
        self.onPlay();
      } else {
        this.controls.bigPlay.button.style.display = 'block';
        this.controls.bigPlay.wrapper.style.display = 'block';
        this.controls.spinner.style.display = 'none'
      }
    }
  }
  
}

VideoPlayer.prototype.volumeSliderMouseMove = function () {
  this.controls.volumeSlider.dispatchEvent(new Event(
    'mousemove', { detail: 'Example of an event' }
  ));
}

VideoPlayer.prototype.onPlay = function () {
  var self = this;
  var urlParams = new URLSearchParams(window.location.search)
  var eventId = urlParams.get('eventId');
  var videoId = urlParams.get('videoId');

  if (!this.theOPlayer.src) {
    Ajax(
      GetBaseUrl() + '/v1/videostream/videos/' + eventId + (videoId === null || videoId === undefined ? '' : '/' + videoId),
      'get',
      function (videos) {
        if (!videos.success) {
          document.querySelector('.video-player__loader > #message')
            .innerHTML = 'Unable to load video. ' + videos.statusCode;
          return;
        }
        Ajax(GetBaseUrl() + '/v1/videostream/token/playback', 'get', function (token) {
          var param =
            '?timestamp=' +
            token.data.timestamp +
            '&token=' +
            token.data.token +
            '&clientId=' +
            token.data.client_id;

          if (videos.data.vods.data.length > 0) {
            player.open(videos.data.vods.data[0].data.m3u8 + param);
          } else if (videos.data.live !== null) {
            player.open(videos.data.live.m3u8 + param)
          }
        },
          function (err) {
            document.querySelector('.video-player__loader > #message')
              .innerHTML = err;
          }
        );
      },
      function (err) {
        document.querySelector('.video-player__loader > #message')
          .innerHTML = err;
      }
    );
  } else {
    if (isIos()) {

      this.controls.bigPlay.button.style.display = 'none';
      this.controls.bigPlay.wrapper.style.display = 'none';
      this.controls.spinner.style.display = 'block'
    }
    this.theOPlayer.play();
    if (document.querySelector('#theoPlayerChromeless') !== null)  {
      
      this.isPlaying = true;
      this.controls.play.style.display = 'none';
      this.controls.pause.style.display = 'block';
    }

  }
}

VideoPlayer.prototype.onPause = function () {
  this.theOPlayer.pause();
  this.isPlaying = false;
  this.controls.play.style.display = 'block';
  this.controls.pause.style.display = 'none';
}

VideoPlayer.prototype.onSkip = function () {
  var toSeek = this.theOPlayer.duration * (1 / 100);
  this.theOPlayer.currentTime = toSeek + this.theOPlayer.currentTime;
}

VideoPlayer.prototype.onToggleVolume = function () {
  if (this.theOPlayer.muted) {
    this.controls.mute.style.display = 'none';
    this.controls.volume.style.display = 'block';
    volumeSlider.moveSliderTo(100)
  }
  else {

    volumeSlider.moveSliderTo(0)
    this.controls.mute.style.display = 'block';
    this.controls.volume.style.display = 'none';
  }
  this.theOPlayer.muted = !this.theOPlayer.muted;
}

VideoPlayer.prototype.onStop = function () {
  this.theOPlayer.stop();
  this.isPlaying = false;
  this.controls.play.style.display = 'block';
  this.controls.pause.style.display = 'none';

  document.querySelector('.video-player__controls-counter-time').innerHTML = '00:00:00';
}

VideoPlayer.prototype.onFullscreen = function () {
  var self = this;

  if (self.videoPlayerContainer.requestFullscreen) {
    /* Enter fullscreen */
    self.controls.docElement.requestFullscreen();
  } else if (self.videoPlayerContainer.mozRequestFullScreen) {
    /* Firefox */
    self.videoPlayerContainer.mozRequestFullScreen();
  } else if (self.videoPlayerContainer.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    self.videoPlayerContainer.webkitRequestFullscreen();
  } else if (self.videoPlayerContainer.msRequestFullscreen) {
    /* IE/Edge */
    self.videoPlayerContainer.msRequestFullscreen();
  }

}

VideoPlayer.prototype.onExitFullscreen = function () {

  if (isIos()) {
    window.history.back();
  } else {
    var self = this;
    if (self.videoPlayerContainer.exitFullscreen ||
      self.controls.fullscreen.ariaValueNow === 'fullscreen') {
      self.videoPlayerContainer.exitFullscreen();
    } else if (self.videoPlayerContainer.webkitExitFullscreen ||
      self.controls.fullscreen.ariaValueNow === 'fullscreen') {
      self.videoPlayerContainer.webkitExitFullscreen();
    } else if (self.videoPlayerContainer.mozCancelFullScreen ||
      self.controls.fullscreen.ariaValueNow === 'fullscreen') {
      self.videoPlayerContainer.mozCancelFullScreen();
    } else if (self.videoPlayerContainer.msExitFullscreen ||
      self.controls.fullscreen.ariaValueNow === 'fullscreen') {
      self.videoPlayerContainer.msExitFullscreen();
    }
  }
}

/*  ==========================================================================
    Slider
    ========================================================================== */

var Slider = function (nodes, mouseUpCallback, clickCallback) {
  
  if (nodes.slider === null && nodes.positioningElement === null) 
    return;

  this.slider = nodes.slider;
  this.positioningElement = nodes.positioningElement
  this.sliderRail = nodes.slider.parentNode;

  this.valueDomNode = false;

  this.sliderDirection = this.slider.ariaOrientation;


  this.railSize = this.sliderDirection === 'vertical' ? this.sliderRail.offsetHeight : this.sliderRail.offsetWidth;
  this.thumbHeight = 6;
  this.thumbWidth = 6;
  this.keyCode = Object.freeze({
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
  });

  this.mouseDownCallback = clickCallback;
  this.mouseUpCallback = mouseUpCallback;

  this.getThumbPosition = function (self) {

    if (self.sliderDirection === 'vertical') {
      // eslint-disable-next-line no-restricted-globals
      return (self.positioningElement.offsetTop) - event.pageY;
    }
    else {
      // eslint-disable-next-line no-restricted-globals
      return parseFloat(event.pageX) - (parseFloat(self.positioningElement.offsetLeft) +
        parseFloat(self.sliderRail.parentElement.parentElement.offsetLeft));
    }
  }
};

Slider.prototype.init = function () {
  if (this.slider === null || this.slider === undefined)
    return;

  if (this.slider.ariaValueMin) {
    this.valueMin = parseFloat(this.slider.ariaValueMin);
  }
  if (this.slider.ariaValueMax) {
    this.valueMax = parseFloat(this.slider.ariaValueMax);
  }
  if (this.slider.ariaValueNow) {
    this.valueNow = parseFloat(this.slider.ariaValueNow);
  }
  this.railSize = this.sliderDirection === 'vertical' ?
    parseFloat(this.sliderRail.clientHeight) : parseFloat(this.sliderRail.clientWidth);

  this.valueDomNode = this.sliderRail.nextElementSibling;

  if (this.slider.tabIndex !== 0) {
    this.slider.tabIndex = 0;
  }

  this.slider.addEventListener('keydown', this.handleKeyDown.bind(this));
  this.slider.addEventListener('mousedown', this.handleMouseDown.bind(this));
  this.slider.addEventListener('focus', this.handleFocus.bind(this));
  this.slider.addEventListener('blur', this.handleBlur.bind(this));
  this.sliderRail.addEventListener('click', this.handleClick.bind(this));
  this.moveSliderTo(this.valueNow);

};

Slider.prototype.updateValueNow = function (valueNow) {
  this.valueNow = valueNow;
  this.slider.ariaValueNow = valueNow;
}

Slider.prototype.updateRailSize = function () {
  this.railSize = this.sliderDirection === 'vertical' ? this.sliderRail.offsetHeight : this.sliderRail.offsetWidth
}

Slider.prototype.moveSliderTo = function (value) {
  if (value > this.valueMax) {
    value = this.valueMax;
  }

  if (value < this.valueMin) {
    value = this.valueMin;
  }

  this.valueNow = value;

  this.slider.ariaValueNow = this.valueNow;

  var pos = parseFloat(0);
  if (this.sliderDirection === 'horizontal') {
    pos = parseFloat(this.railSize) * (parseFloat(value) / parseFloat(100)) - parseFloat(this.thumbWidth) / parseFloat(2);

    if (pos >= this.valueMin) {
      this.slider.style.left = pos + 'px';
    } else {
      this.slider.style.left = '0px';
    }
  }
  else {
    pos = parseFloat(this.railSize) * ((parseFloat(this.valueMax) - parseFloat(value)) / parseFloat(100)) - parseFloat(this.thumbWidth) / parseFloat(2);

    if (pos >= this.valueMin) {
      this.slider.style.top = pos + 'px';
    } else {
      this.slider.style.top = '0px';
    }
  }
};

Slider.prototype.handleKeyDown = function (event) {
  var flag = false;

  switch (event.keyCode) {
    case this.keyCode.left:
    case this.keyCode.down:
      this.moveSliderTo(this.valueNow - 1);
      flag = true;
      break;

    case this.keyCode.right:
    case this.keyCode.up:
      this.moveSliderTo(this.valueNow + 1);
      flag = true;
      break;

    case this.keyCode.pageDown:
      this.moveSliderTo(this.valueNow - 10);
      flag = true;
      break;

    case this.keyCode.pageUp:
      this.moveSliderTo(this.valueNow + 10);
      flag = true;
      break;

    case this.keyCode.home:
      this.moveSliderTo(this.valueMin);
      flag = true;
      break;

    case this.keyCode.end:
      this.moveSliderTo(this.valueMax);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.preventDefault();
    event.stopPropagation();
  }
};

Slider.prototype.handleFocus = function (event) {
  this.slider.classList.add('focus');
  this.sliderRail.classList.add('focus');
};

Slider.prototype.handleBlur = function (event) {
  this.slider.classList.remove('focus');
  this.sliderRail.classList.remove('focus');
};

Slider.prototype.handleMouseDown = function (event) {
  var self = this;

  if (typeof self.mouseDownCallback === 'function') {
    self.mouseDownCallback();
  }

  var handleMouseMove = function (event) {

    var diff = self.getThumbPosition(self);
    self.valueNow = parseFloat(
      (parseFloat((self.valueMax - self.valueMin)) * parseFloat(diff)) / parseFloat(self.railSize)
    );
    // console.log(`rail size ${self.railSize}`);
    // console.log(`thumb position ${diff}`);
    // console.log(`value now ${self.valueNow}`);
    self.moveSliderTo(self.valueNow);

    event.preventDefault();
    event.stopPropagation();
  };

  var handleMouseUp = function (event) {

    self.mouseUpCallback(self);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // bind a mousemove event handler to move pointer
  document.addEventListener('mousemove', handleMouseMove);

  // bind a mouseup event handler to stop tracking mouse movements
  document.addEventListener('mouseup', handleMouseUp);

  event.preventDefault();
  event.stopPropagation();
};

// handleMouseMove has the same functionality as we need for handleMouseClick on the rail
Slider.prototype.handleClick = function (event) {
  var self = this, diff;
  diff = this.getThumbPosition(self);
  self.valueNow = parseFloat(
    (parseFloat((self.valueMax - self.valueMin)) * parseFloat(diff)) / parseFloat(self.railSize)
  );
  this.moveSliderTo(this.valueNow);

  self.mouseUpCallback(self);
  event.preventDefault();
  event.stopPropagation();
};

var IsUat = function() {
  return false;
}
var GetBaseUrl = function () {
  switch (window.location.host) {
    case 'localhost:3000':
      return 'https://localhost:5001'
    case 'localhost:3100':
    case 'spookylive.dev-sites.co.nz':
      return 'https://spookylive-api.dev-sites.co.nz'
    case 'localhost:3200':
    case 'sideline.live.bornuat1.co.nz':
      return 'https://sideline-live-api.bornuat1.co.nz'
    case 'sideline.live.bornprod3.co.nz':
      return 'https://sideline-live-api.bornprod3.co.nz'
    case 'sideline.live':
      return 'https://api.sideline.live'
    default:
      return 'https://api.sideline.live'
  }
}

var accessTokenLocalStorageKey = function () {
  let result = 'accessToken'
  for (var i = 0, len = window.localStorage.length; i < len; ++i) {
    let current = window.localStorage.key(i)
    // console.log('accessTokenLocalStorageKey current', current)

    if (current && current.startsWith(`accessToken:`)) {
      // console.log('accessTokenLocalStorageKey found', current)
      result = current;
    }
  }
  // console.log('accessTokenLocalStorageKey result', result);
  return result;
}

var Ajax = function (url, method, success, failed) {

  console.log('Ajax url', url);
  console.log('Ajax method', method);
  console.log('Ajax success', success);
  console.log('Ajax failed', failed);


  var xmlhttp = new XMLHttpRequest();
  console.log('Ajax xmlhttp', xmlhttp);
  xmlhttp.addEventListener('readystatechange', function (ev) {
    console.log('Ajax xmlhttp.addEventListener readystatechange ev', ev);
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      console.log('Ajax xmlhttp.addEventListener xmlhttp.readyState === XMLHttpRequest.DONE');
      if (xmlhttp.status === 200) {
        console.log('Ajax xmlhttp.addEventListener xmlhttp.status === 200 success');
        let parsed = JSON.parse(xmlhttp.response);
        console.log('Ajax xmlhttp.addEventListener parsed', parsed);
        success(parsed);
      }
      else {

        if (xmlhttp.status === 0) {
          console.log('Ajax xmlhttp failed xmlhttp.status', xmlhttp.status);
          failed('Unable to load video. Unauthorized request.')
          document.querySelector('.spinner').style.display = 'none';
        } else {
          console.log('Ajax xmlhttp failed xmlhttp ??? ', xmlhttp);
        }
      }
    }
  })

  console.log('Ajax xmlhttp open method url before');
  xmlhttp.open(method, url);
  console.log('Ajax xmlhttp open method url after');
  console.log('Ajax xmlhttp setRequestHeader before');
  xmlhttp.setRequestHeader('Authorization', 'Bearer ' + localStorage[accessTokenLocalStorageKey()]);
  console.log('Ajax xmlhttp setRequestHeader after');
  console.log('Ajax xmlhttp send before');
  xmlhttp.send()
  console.log('Ajax xmlhttp send after');
}


// Initialise Sliders on the page
window.addEventListener('load', function () {

  console.log('addEventListener A');

  var urlParams = new URLSearchParams(window.location.search)
  var eventId = urlParams.get('eventId');
  console.log('addEventListener eventId', eventId);
  var videoId = urlParams.get('videoId');
  console.log('addEventListener videoId', videoId);

  var isLive = urlParams.get('isLive') === 'true' || urlParams.get('islive') === 'true';
  console.log('addEventListener isLive', isLive);

  player = new VideoPlayer();

  console.log('addEventListener player', player);

  progressSlider = new Slider(
    {
      slider: document.querySelector('#progressSlider'),
      positioningElement: document.querySelector('.video-player__controls-progress'),
    },
    function (self) {
      var toSeek = parseFloat(player.theOPlayer.duration) * (parseFloat(self.valueNow) / parseFloat(100));
      player.theOPlayer.currentTime = toSeek;
      player.overrideTimeUpdate = false;
    },
    function () {
      player.overrideTimeUpdate = true;
    }
  )
  volumeSlider = new Slider(
    {
      slider: document.querySelector('#volumeSlider'),
      positioningElement: document.querySelector('.video-player__controls'),
    },
    function (self) {
      player.theOPlayer.volume = self.valueNow / 100;
    }
  )
  console.log('addEventListener progressSlider', progressSlider);

  player.init(isLive, function (vNow) {
    progressSlider.updateValueNow(vNow);
  }, function () {
    progressSlider.updateRailSize();
    volumeSlider.updateRailSize();
  })
  progressSlider.init();
  volumeSlider.init();

  console.log('addEventListener B');

  if (!isMobile()) {

    if ( document.querySelector('.video-player__controls-volume-group') !== null) {
      document.querySelector('.video-player__controls-volume-group')
        .addEventListener('mouseenter', function (e) {
          var slider = document.querySelector('.video-player__controls-volume-slider');

          slider.classList.add('fade-in');
          slider.classList.remove('fade-out');
        })
      document.querySelector('.video-player__controls-volume-group')
        .addEventListener('mouseout', function (e) {
          player.volumeSliderMouseMove();
        })
    }
  }

  console.log('addEventListener C');
  let ajaxUrl = GetBaseUrl() + '/v1/videostream/videos/' + eventId + (videoId === null || videoId === undefined ? '' : '/' + videoId);
  console.log('addEventListener ajaxUrl', ajaxUrl)
  let playbackUrl = GetBaseUrl() + '/v1/videostream/token/playback';
  console.log('addEventListener playbackUrl', playbackUrl)

  player.open('//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8')
  // Ajax(
  //   ajaxUrl,
  //   'get',
  //   function (videos) {
  //     console.log('addEventListener Ajax function videos', videos)
  //     if (!videos.success) {
  //       console.log('addEventListener Ajax function !videos.success return')
  //       return;
  //     }
  //     Ajax(playbackUrl, 'get', function (token) {
  //       console.log('addEventListener Ajax playbackUrl token', token)
  //       var param =
  //         '?timestamp=' +
  //         token.data.timestamp +
  //         '&token=' +
  //         token.data.token +
  //         '&clientId=' +
  //         token.data.client_id;
  //       console.log('addEventListener Ajax playbackUrl param', param)

  //       console.log('addEventListener Ajax playbackUrl videos', videos)

  //       if (videos.data.vods.data.length > 0) {

  //         player.open(videos.data.vods.data[0].data.m3u8 + param);
  //       } else if (videos.data.live !== null) {
  //         player.open(videos.data.live.m3u8 + param)
  //       }
  //     },
  //       function (token) {
  //         // console.log(token);
  //       }
  //     );
  //   },
  //   function (videos) {
  //     // console.log(videos);
  //   }
  // );
});
/*  ==========================================================================
    Video Player END
    ========================================================================== */
