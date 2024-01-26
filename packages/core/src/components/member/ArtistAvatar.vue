<template>
  <a
      :class="heroLevel ? `artist-hero-${heroLevel}` : ''"
      :href="url"
      :style="`background-image: ${backgroundImageUrls};`"
      class="artist-avatar bg-light rounded-circle position-relative"
  >
    <img
        v-if="heroLevel > 0"
        :src="getHeroBadgeImageUrl(`artist-hero-${heroLevel}.svg`)"
        class="artist-hero-badge"
    >
  </a>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'artist-avatar',
  props: {
    // artist: Object,
    member: Object,
  },
  computed: {
    // ...mapGetters({
    //   avatarUrl: 'user/getAvatarUrl',
    // }),
    heroLevel() {
      return _.get(this.member, 'heroLevel', _.get(this.member, 'hero_level')) || null;
    },
    url() {
      const url = _.get(this.member, 'html.url');
      return url ? this.$link(url).url() : null;
    },
    avatarImageUrl() {
      return _.get(this.member, 'avatar.url') || null;
    },
    gravatarImageUrl() {
      return _.get(this.member, 'gravatar.url') || null;
    },
    backgroundImageUrls() {
      if (this.gravatarImageUrl) {
        return `url('${this.avatarImageUrl}'), url('${this.gravatarImageUrl}')`;
      }
      return `url('${this.avatarImageUrl}')`;
    },
  },
  methods: {
    // getBgImgUrl(url) {
    //   if (!url) {
    //     return;
    //   }
    //   if (url.startsWith('http')) {
    //     return url;
    //   }
    //   // eslint-disable-next-line
    //   return require(`@/assets-mockup/img/${url}`);
    // },
    // getAvatarUrl(url) {
    //   if (!url) {
    //     return;
    //   }
    //   if (!url.startsWith('http')) {
    //     // return url;
    //     return this.$siteUrl(`/artists/${url}`).url();
    //   }
    //   return url;
    // },
    getHeroBadgeImageUrl(url) {
      return url ? `https://static.motionelements.com/img/artists/hero/badges/${url}` : '';
    },
    // setAvatarAsBg(url) {
    //   return `background: url('${this.getBgImgUrl(url)}');`;
    // },
  },
};
</script>

<style lang="scss" scoped>
.artist-avatar {
  display: block;
  padding-bottom: 100%;

  background-size: cover !important;
  background-repeat: no-repeat;
  background-position: center;

  @include box-shadow($box-shadow-sm);
  transition: box-shadow 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000);

  &:hover {
    @include box-shadow($box-shadow);
  }
}

.artist-hero-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30%;
  height: auto;
  border-radius: 50%;
  @include box-shadow($box-shadow-sm);
}

</style>
