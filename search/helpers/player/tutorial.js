/* eslint-disable */
const tutorialPlayer = (function () {
  let container = '#player';
  let playerEl;
  let videoEl;

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
      aspectRatio: '16:9',
      preload: 'auto',
      loop: true,
      splash: true,
      autoplay: false,
      muted: true,
      clip: videoFilter(videoEl),
    });
    stop();
  };

  return {
    init,
  };
}());

export default tutorialPlayer;
