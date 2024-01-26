/* eslint-disable */
// remember to expose flowplayer function want to use.
// if update this file, need refrash browser

const videoPlayer = (function () {
  let container = '#player';
  let playerEl;
  let videoEl;

  // let settings = {
  //   loop: true,
  //   autoplay: false,
  //   speed: 1,
  //   cuepoints: [],
  // };

  // detect browser support webM
  const supportsVideoType = (type) => {
    let videoDetector;

    // Allow user to create shortcuts, i.e. just "webm"
    const formats = {
      ogg: 'video/ogg; codecs="theora"',
      h264: 'video/mp4; codecs="avc1.42E01E"',
      webm: 'video/webm; codecs="vp8, vorbis"',
      vp9: 'video/webm; codecs="vp9"',
      hls: 'application/x-mpegURL; codecs="avc1.42E01E"',
    };

    if (!videoDetector) {
      videoDetector = document.createElement('video');
    }

    return videoDetector.canPlayType(formats[type] || type);
  };

  const isWebm = () => (supportsVideoType('webm') ? true : false);

  const videoFilter = (el) => {
    if (typeof el === 'object') {
      const sources = [];

      if (el.previews.webm) {
        sources.push({
          type: 'video/webm',
          src: el.previews.webm.url,
        });
      }
      if (el.previews.mp4) {
        sources.push({
          type: 'video/mp4',
          src: el.previews.mp4.url,
        });
      }
      return sources;
    }
    return {
      sources: [{
        type: el.match('webm') ? 'video/webm' : 'video/mp4',
        src: el,
      }],
    };
  };

  /**
   * @param {String} dom
   * @param {any} el
   */
  const init = (dom, el) => {
    // console.log('loop: ', settings.loop);
    // console.log('autoplay: ', settings.autoplay);
    if (dom) {
      container = dom;
    }
    if (el) {
      videoEl = el;
    }
    playerEl = flowplayer(container, {
      engine: 'html5',
      key: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? process.env.VUE_APP_FLOWPLAYER_KEY : '',
      debug: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? false : true,
      // cuepoints: set.cuepoints,
      aspectRatio: '16:9',
      preload: 'auto',
      loop: true,
      splash: true,
      autoplay: false,
      muted: false,
      share: false,
      clip: videoFilter(videoEl),
    });
    // .on('ready', function (e, api) {
    //   console.log('[FP] player is ready', e, api);
    //   // update speed setting when init
    //   api.speed(settings.speed);
    //   // console.log('ready api', api);
    //   // update curpoint
    //   if (settings.cuepoints.length) {
    //     console.log('[FP] set cuepoints', e, settings.cuepoints);
    //     api.setCuepoints([{time: settings.cuepoints[0], type: 'in'}, {time: settings.cuepoints[1], type: 'out'}]);
    //     // api.addCuepoints([{time: settings.cuepoints[0], type: 'in'}, {time: settings.cuepoints[1], type: 'out'}]);
    //     if (settings.cuepoints[0] > 0) {
    //       // resume issue
    //       // https://github.com/flowplayer/flowplayer/issues/1411
    //       // api.resume().seek(settings.cuepoints[0]);
    //       api.seek(settings.cuepoints[0]);
    //     }
    //   }
    // }).on('cuepoint', function(e, api, cuepoint) {
    //   console.log('[FP] cuepoint', e, cuepoint);
    //   if (cuepoint.type == 'out') {
    //     // api.resume().seek(api.cuepoints[0].time);
    //     api.seek(api.cuepoints[0].time);
    //   }
    // }).on('cuepoints', function(e, api) {
    //   console.log('[FP] cuepoints', e);
    // }).on('cuepointstart', function(e, api) {
    //   console.log('[FP] cuepointstart', e);
    // }).on('cuepointend', function(e, api) {
    //   console.log('[FP] cuepointend', e);
    // });

    // if (!settings.autoplay) {
    //   stop();
    // } else {
    //   play();
    // }
    // stop();
    if (playerEl) {
      stop();
    }
  };

  const play = () => {
    playerEl.load();
    playerEl.play();
  };

  const stop = () => playerEl.stop();

  const pause = () => playerEl.pause();

  /**
   * @param {Number} level
   */
  const volume = (level = 0) => playerEl.volume(level);

  /**
   * @param {Boolean} toggle
   */
  const muted = (toggle = false) => playerEl.muted = toggle;

  /**
   * @param {Number} sec;
   */
  const seek = (sec) => {
    playerEl.seekTo(sec);
  };

  /**
   * @param {Number} markIn;
   * @param {Number} markOut;
   */

  // const setCuePoints = (markIn, markOut) => {
  //   // playerEl.removeCuepoint();
  //   console.log('FP', 'setCuePoints', markIn, markOut);
  //   // playerEl.setCuepoints([{time: markIn, type: 'in'}, {time: markOut, type: 'out'}]);
  //   playerEl.addCuepoint([markIn, markOut]);
  //   console.log('FP', 'IN', playerEl.cuepoints[0].time);
  //   console.log('FP', 'OUT', playerEl.cuepoints[1].time);
  //   // console.log('FP', 'setCuePoints', playerEl.addCuepoint([markIn, markOut]));
  //   // playerEl.emit((
  //   //   flowplayer.event.CUEPOINTS,
  //   //   { cuepoints: playerEl.cuepoints.concat({start: markIn, end: markOut}) }
  //   // ));
  // }

  /**
   *
   * @param {Number} s
   */
  const speed = (s) => {
    // settings.speed = s;
    playerEl.speed(s);
  };

  /**
   *
   * @param {Boolean} toggle
   */
  // const loop = (toggle) => {
  //   settings.loop = toggle;
  // };

  /**
   *
   * @param {Boolean} toggle
   */
  // const autoplay = (toggle) => {
  //   settings.autoplay = toggle;
  // };

  const unload = () => playerEl.unload();

  const shutdown = () => playerEl.shutdown();

  /**
   *
   * @param {Object} payload
   */
  // const updateSettings = (payload) => {
  //   console.log('[FP] update settings: ', payload);
  //   settings = payload;
  //   console.log('[FP] player settings: ', settings);
  // };


  return {
    init,
    play,
    stop,
    pause,
    volume,
    muted,
    seek,
    // setCuePoints,
    speed,
    // loop,
    // autoplay,
    unload,
    shutdown,
    // updateSettings,
  };
}());

export default videoPlayer;
