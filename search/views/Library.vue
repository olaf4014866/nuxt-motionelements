<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <Favorites v-if="currentListMode === 'folder'" />
        <History v-if="currentListMode === 'history'"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import audioPlayerMixin from '@/views/library/mixins/audioPlayer.mixin';
import videoPlayerMixin from '@/views/library/mixins/videoPlayer.mixin';

export default {
  name: 'view-library',
  // setup audio and video players here
  mixins: [audioPlayerMixin, videoPlayerMixin],
  components: {
    Sidebar: () => import('@/views/library/Sidebar.vue'),
    Favorites: () => import('@/views/library/ContentFolders.vue'),
    History: () => import('@/views/library/ContentHistory.vue'),
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // playElementId: state => state.audioPlayer.element.id,
      // playStatus: state => state.audioPlayer.playStatus,
      // timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      // timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      // waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    ...mapGetters({
      isMember: 'user/isMember',
      currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      currentListMode: 'library/currentListMode',
    }),
  },
  created() {
    console.log('view-favorites created');
    // this.parseParamsFromUrl();

    // this.getFavoritesInfo();
    // this.$root.$on('getFavoriteContent', () => {
    //   // this.$root.$off('getFavoriteContent');
    //   console.log('caught : getFavoriteContent11');
    //   this.listFolderContent();
    // });

    // this.listFolderContent();
    this.parseParamsFromUrl();
  },
  mounted() {
    /*
    // audio init, to migrate to mixin
    this.$root.$on('doAudioPlayerStop', () => {
      console.log('emit : doAudioPlayerStop');
      this.doAudioPlayerStop();
    });

    this.$root.$on('doVideoPlayerStop', () => {
      console.log('emit : doVideoPlayerStop');
      this.doVideoPlayerStop();
    });

    this.$root.$on('clickAudioPlayButton', (element) => {
      this.clickAudioPlayButton(element);
    });

    this.$root.$on('doAudioPlayerSetPosition', (event) => {
      this.doAudioPlayerSetPosition(event);
    });

    this.$audioPlayer.init();


    // me-modules product wrapper will trigger event when first play
    let currentPlayingElementId = null;
    this.$root.$on('audioPlayerStart', (element) => {
      console.log('emit : audioPlayerStart', element);
      if (currentPlayingElementId !== element.id) {
        currentPlayingElementId = element.id;
        this.$teleport.event('product_previewed', element);
      }
    });

    // me-modules product wrapper will trigger event when first play
    this.$root.$on('videoPlayerStart', (element) => {
      console.log('emit : videoPlayerStart', element);
      if (currentPlayingElementId !== element.id) {
        currentPlayingElementId = element.id;
        this.$teleport.event('product_previewed', element);
      }
    });
    */


    this.$root.$on('getSidebarList', () => {
      console.log('emit : getSidebarList');
      this.refreshSidebarFolders();
    });

    this.$root.$on('getFavoriteContent', () => {
      console.log('emit : getSidebarList');
      this.refreshContent();
    });

    this.$root.$on('doCreateFavoritesFolder', (info) => {
      console.log('emit : doCreateFavoritesFolder');
      this.doCreateFavoritesFolder(info);
    });

    // get member data from api
    // this.$store.dispatch('member/getMember')
    //   .then((result) => {
    //     this.$root.$emit('updateGoogleTagManager', result.data.data);
    //   });

    this.initLibrary();

    if (!this.isMember) {
      this.$store.dispatch('modal/showSignUp');
    }
  },
  methods: {
    /*
    // av player, migrate to mixin
    clickAudioPlayButton(element) {
      console.log('clickAudioPlayButton', element);

      const playStatus = this.$store.getters['audioPlayer/playStatus'];
      console.log('clickAudioPlayButton', playStatus);

      const playingElementId = this.playElementId;
      const clickElementId = element.id;
      const isCurrentElement = (clickElementId === playingElementId) ? true : false;

      if (isCurrentElement) {
        switch (playStatus) {
          case 'playing':
            this.doAudioPlayerPause();
            break;
          case 'paused':
            this.doAudioPlayerResume();
            break;
          default:
            this.doAudioPlayerSetup(element);
            break;
        }
      } else {
        // reset progress bar
        const progress = {
          timeElapsed: 0,
          timeTotal: 0,
        };
        this.$store.dispatch('audioPlayer/setPlayProgress', progress);

        this.doAudioPlayerSetup(element);
      }
    },
    doAudioPlayerStop() {
      this.$audioPlayer.stopAll();
      this.$store.dispatch('audioPlayer/setPlayStatus', '');
    },
    doAudioPlayerPause() {
      this.$audioPlayer.pauseAll();
      this.$store.dispatch('audioPlayer/setPlayStatus', 'paused');
    },
    doAudioPlayerResume() {
      this.$audioPlayer.resumeAll();
      this.$store.dispatch('audioPlayer/setPlayStatus', 'playing');
    },
    doAudioPlayerSetup(element) {
      this.$audioPlayer.stopAll();

      const audioUrl = element.previews.mp3.url;

      let player = this.$audioPlayer.player.getSoundById('soundManagerPlayer');
      if (player === undefined) {
        player = this.$audioPlayer.player.createSound({
          id: 'soundManagerPlayer',
          url: audioUrl,
          whileplaying: () => {
            // console.log('audioPlayer whileplaying');

            const timeElapsed = Math.round(player.position);
            const timeTotal = player.duration;
            const timeEstimated = player.estimatedDuration;

            const progress = {
              timeElapsed: timeElapsed,
              timeTotal: timeTotal,
              timeEstimated: timeEstimated,
            };

            this.$store.dispatch('audioPlayer/setPlayProgress', progress);
          },
          onfinish: () => {
            // console.log('audioPlayer onfinish');
            const progress = {
              timeElapsed: 0,
              timeTotal: 0,
              timeEstimated: 0,
            };
            this.$store.dispatch('audioPlayer/setPlayProgress', progress);
            this.$store.dispatch('audioPlayer/setPlayStatus', '');
            this.$store.dispatch('audioPlayer/setElementInfo', { id: false });
          },
        });
      }

      player.play({
        url: audioUrl,
      });

      this.$store.dispatch('audioPlayer/setInitStatus', true);
      this.$store.dispatch('audioPlayer/setPlayStatus', 'playing');
      this.$store.dispatch('audioPlayer/setElementInfo', element);
    },
    doAudioPlayerSetPosition(info) {
      console.log('doAudioPlayerSetPosition', info);

      const playStatus = this.$store.getters['audioPlayer/playStatus'];
      console.log('doAudioPlayerSetPosition : play status - ', playStatus);

      if (playStatus === '') {
        return;
      }

      const player = this.$audioPlayer.player.getSoundById('soundManagerPlayer');

      const event = info.event;
      const element = info.element;
      const playingElementId = this.playElementId;
      const clickElementId = element.id;
      const isCurrentElement = (clickElementId === playingElementId) ? true : false;

      // when click playing audio's waveform
      if (playStatus && isCurrentElement) {
        player.stop();

        const progress = this.$store.getters['audioPlayer/playProgress'];
        const duration = progress.timeTotal || progress.timeEstimated;
        const waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];
        const clickPositionX = event.offsetX;
        const position = Math.round(clickPositionX * duration / waveformWidth);
        player.setPosition(position);

        player.play();
      }

      // when click other audio's waveform
      if (!isCurrentElement) {
        const progress = {
          timeElapsed: 0,
          timeTotal: 0,
          timeEstimated: 0,
        };
        this.$store.dispatch('audioPlayer/setPlayProgress', progress);

        this.doAudioPlayerSetup(element);
      }
    },
    doVideoPlayerStop() {
      $('.flowplayer').each(function () {
        // console.log(this);
        const id = $(this).attr('id');
        const player = flowplayer(`#${id}`);
        player.pause();
      });
    },
    */

    parseParamsFromUrl() {
      console.log('parseParamsFromUrl');

      // this.$store.dispatch('favorites/resetAllLayout');
      // this.$store.dispatch('favorites/resetFavoritesContentList');

      const isFolderMode = this.$route.name === 'view-favorites-folder';

      const currentFolderId = (_.size(this.$route.params.folderId)) ? this.$route.params.folderId : false;
      this.$store.dispatch('library/setCurrentFolderId', currentFolderId);

      const currentListMode = isFolderMode ? 'folder' : 'history';

      this.$store.dispatch('library/setCurrentListMode', currentListMode);

      // console.log('parseParamsFromUrl mt :', this.$route.query['mt[]']);

      // set filter params : element type
      let selectedElementTypes = [];
      if (_.isString(this.$route.query['mt[]'])) {
        selectedElementTypes.push(this.$route.query['mt[]']);
      }

      if (_.isArray(this.$route.query['mt[]'])) {
        selectedElementTypes = this.$route.query['mt[]'];
      }
      this.$store.dispatch('library/setSelectedElementTypes', selectedElementTypes);
      // console.log(selectedElementTypes);

      // set filter params : download status
      let selectedDownloadStatus = 'all';
      if (_.isString(this.$route.query.downloadable)) {
        selectedDownloadStatus = this.$route.query.downloadable;
      }
      this.$store.dispatch('library/setSelectedDownloadStatus', selectedDownloadStatus);
      // console.log(selectedDownloadStatus);

      const pageNow = (this.$route.query.page) ? this.$route.query.page : 1;
      this.$store.dispatch('library/setCurrentPage', pageNow);
    },
    resetFolderContent() {
      this.$store.dispatch('library/disableMobileSidebar');
      this.$store.dispatch('product/setIsSelectAllElements', false);
      this.$store.dispatch('product/setSelectedElementsId', []);
      this.$scrollToTop();
      this.doAudioPlayerStop();
      this.doVideoPlayerStop();
    },
    refreshContent() {
      if (!this.isMember) {
        console.log('login to getFavoriteContent');
      }

      this.resetFolderContent();

      switch (this.currentListMode) {
        case 'history':
          return this.listHistoryContent();

        default:
          return this.listFolderContent();
      }
    },
    listHistoryContent() {
      const params = {};

      return this.$store.dispatch('library/listHistoryItems', params);
    },
    listFolderContent() {
      const currentFolderId = this.currentFolderId;

      const selectedElementTypes = this.$store.getters['library/selectedElementTypes'];
      const selectedDownloadStatus = this.$store.getters['library/selectedDownloadStatus'];

      const params = {
        id: currentFolderId,
        elementTypes: selectedElementTypes,
        downloadable: selectedDownloadStatus,
      };

      return this.$store.dispatch('library/listFavoritesFolderItems', params);
    },
    initLibrary() {
      console.log('getFavoritesInfo');

      /*
      this.$store.dispatch('site/getTerms')
        .then((result) => {
          // console.log('site/getTerms done: ', result);
          const currencies = result.data.data.currencies;
          this.$store.dispatch('site/setSupportedCurrencies', currencies);

          const mapMediaTypesName = result.data.data.media_types;
          this.tidyMediaTypesName(mapMediaTypesName);
        });
        */


      this.refreshSidebarFolders();

      this.refreshContent();
    },
    refreshSidebarFolders() {
      const isMember = this.isMember;
      console.log('getSidebarList isMember - ', isMember);
      if (!isMember) {
        console.log('getSidebarList not login');
        return;
      }

      const currentFolderId = this.currentFolderId;
      console.log('currentFolderId : ', currentFolderId);

      // const currentFolderInfo = this.$store.getters['favorites/currentFolderInfo'];
      // console.log('mounted : ', currentFolderInfo);

      this.$store.dispatch('library/listFavoritesFolders')
        .then((response) => {
          console.log(response);
        });
    },
    // @deprecate
    tidyMediaTypesName(mapMediaTypesName) {
      // console.log('tidyMediaTypesName', mapMediaTypesName);

      const supportedMediaTypes = this.$store.getters['site/mapMediaTypes'];
      Object.keys(supportedMediaTypes).map((key) => {
        const mediaType = supportedMediaTypes[key].id;

        let info = '';
        switch (mediaType) {
          default:
          case 'ae':
            info = _.find(mapMediaTypesName, { id: 'ae' });
            break;

          case 'ae-preset':
            info = _.find(mapMediaTypesName, { id: 19 });
            break;

          case 'pr':
            info = _.find(mapMediaTypesName, { id: 'pr' });
            break;
          case 'pr-template':
            info = _.find(mapMediaTypesName, { id: 15 });
            break;

          case 'pr-preset':
            info = _.find(mapMediaTypesName, { id: 20 });
            break;

          case 'mg-template':
            info = _.find(mapMediaTypesName, { id: 16 });
            break;

          case 'video':
            info = _.find(mapMediaTypesName, { id: 'video' });
            break;
          case 'video-live':
            info = _.find(mapMediaTypesName, { id: 4 });
            break;

          case 'animation':
            info = _.find(mapMediaTypesName, { id: 3 });
            break;

          case 'video-vr':
            info = _.find(mapMediaTypesName, { id: 12 });
            break;

          case 'music':
            info = _.find(mapMediaTypesName, { id: 6 });
            break;

          case 'image':
            // case 'images':
            info = _.find(mapMediaTypesName, { id: 'image' });
            break;

          case 'photo':
            info = _.find(mapMediaTypesName, { id: 1 });
            break;

          case 'vector':
            info = _.find(mapMediaTypesName, { id: 2 });
            break;

          case 'gif':
            info = _.find(mapMediaTypesName, { id: 14 });
            break;

          case 'sfx':
            info = _.find(mapMediaTypesName, { id: 7 });
            break;

          case 'motion-template':
            info = _.find(mapMediaTypesName, { id: 9 });
            break;

          case '3d-model':
            info = _.find(mapMediaTypesName, { id: 5 });
            break;

          case 'lottie':
            info = _.find(mapMediaTypesName, { id: 21 });
            break;

          case 'collection':
            // info = _.find(mapMediaTypesName, { id: 'collection' });
            info = {
              name: this.$i18n.t('term.collection'),
              name_short: this.$i18n.t('term.collection'),
            };
            break;
        }

        supportedMediaTypes[key].name = info.name;
        supportedMediaTypes[key].nameShort = info.name_short;
      });
      // console.log(supportedMediaTypes);
    },
    doDeleteFavorites(element) {
      console.log('doDeleteFavorites', element);

      this.$store.dispatch('site/deleteFavorites', element).then(() => {
        this.$store.dispatch('site/getFavoritesCount').then((result) => {
          this.$store.dispatch('site/setFavoritesCount', result.data);
          console.log('doDeleteFavorites - done', result.data);
        });
      });
    },
    doCreateFavoritesFolder(info) {
      // console.log('doCreateFavoritesFolder', info);
      $('#favgrp-create').modal('hide');

      this.$store.dispatch('library/doCreateFavoritesFolder', info)
        .then((response) => {
          console.log('doCreateFavoritesFolder done : ', response);

          this.$root.$emit('getSidebarList');

          const notify = this.$store.getters['site/notifyMessages'];
          notify.status = true;
          notify.contents.push({
            name: 'notifyMessages',
            type: 'success',
            title: this.$i18n.t('favorites.folder_created'),
            autohide: true,
            delay: 3000,
          });
          this.$store.dispatch('site/setNotifyMessages', notify);
        })
        .catch((error) => {
          // handle error
          console.log('library/doCreateFavoritesFolder error - ', error);

          const notify = this.$store.getters['site/notifyMessages'];
          notify.status = true;
          notify.contents.push({
            name: 'notifyMessages',
            type: 'warning',
            title: this.$i18n.t('favorites.folder_limited_max'),
            autohide: true,
            delay: 3000,
          });
          this.$store.dispatch('site/setNotifyMessages', notify);
        });
    },
  },
  watch: {
    $route(to, from) {
      console.log('route parameter changed: ', from, to);

      this.parseParamsFromUrl();
      // console.log('emit getFavoriteContent');
      // this.$root.$emit('getFavoriteContent');
      this.refreshContent();
    },
    // currentFolderId() {
    //   this.$root.$emit('getFavoriteContent');
    //   //
    //   // this.getFavoriteContent();
    // },
  },
  metaInfo() {
    return {
      meta: [
        { vmid: 'robots', name: 'robots', content: 'noindex nofollow' },
      ],
    };
  },

};
</script>
