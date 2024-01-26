/* eslint-disable */
let container = '#player';
// eslint-disable-next-line
export const audioPlayer = window.soundManager;

const swfUrl = 'https://static.motionelements.com/swf/sm2/2.97a.20170601/xdomain/soundmanager2.swf';

export const supportsVideoType = (type) => {
  let video;

  // Allow user to create shortcuts, i.e. just "webm"
  const formats = {
    ogg: 'video/ogg; codecs="theora"',
    h264: 'video/mp4; codecs="avc1.42E01E"',
    webm: 'video/webm; codecs="vp8, vorbis"',
    vp9: 'video/webm; codecs="vp9"',
    hls: 'application/x-mpegURL; codecs="avc1.42E01E"',
  };

  if (!video) {
    video = document.createElement('video');
  }

  return video.canPlayType(formats[type] || type);
};

export const isWebm = () => (supportsVideoType('webm') ? true : false);

/**
 * @param {String} dom
 */
export const settingContainer = (dom) => {
  container = dom;
};

export const initAudioPlayer = () => {
  console.log('do init audio player');

  audioPlayer.setup({
    // id: 'soundManagerPlayer',
    url: swfUrl,
    debugMode: false,
    useHTML5Audio: true,
    flashVersion: 9,
    preferFlash: false,
    useHighPerformance: true,
    onready: function () {
      console.log('audioPlayer onready');
    },
  });
};

export const generatePlaylist = (playlist) => {
  const arr = [];
  playlist.forEach((element) => {
    arr.push(isWebm() ? element.previews.webm.url : element.previews.mp4.url);
  });
  return arr;
};
