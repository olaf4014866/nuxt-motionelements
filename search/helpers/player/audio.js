/* eslint-disable */
// -- soundmanager
// recommended music
// action
// video.mute()
// video.seek(0)
// audio.play() / audio.loop()
// video.play()

// event
// video = pause | finish
// audio.stop()
// OPTIONAL
// audio.seek(5)
// video.seek(5)

// player.mute()
// reload, other tab

// eslint-disable-next-line
const swfUrl = 'https://static.motionelements.com/swf/sm2/2.97a.20170601/xdomain/soundmanager2.swf';

const audioPlayer = (function () {

  const player = window.soundManager;

  const init = () => {
    console.log('do init audio player');

    // if (player && player.ok())
    // {
    //   console.log('audioPlayer already init');
    // }
    // else {
      player.setup({
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
    // }
  };

  // handle legacy
  // const setup = (params) => {
  //   console.log('do init audio player2', params);
  //
  //   player.setup({
  //     // id: 'soundManagerPlayer',
  //     url: swfUrl,
  //     debugMode: false,
  //     useHTML5Audio: true,
  //     flashVersion: 9,
  //     preferFlash: false,
  //     useHighPerformance: true,
  //     onready: function () {
  //       console.log('audioPlayer onready2');
  //     },
  //   });
  // };

  const stopAll = () => player.stopAll();
  const pauseAll = () => player.pauseAll();
  const resumeAll = () => player.resumeAll();

return {
  init,
  player,
  stopAll,
  pauseAll,
  resumeAll,
};
}());

export default audioPlayer;
