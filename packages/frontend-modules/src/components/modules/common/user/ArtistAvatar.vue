<template>
  <a
    class="artist-avatar bg-light rounded-circle position-relative"
    :class="`artist-hero-${artist.heroLevel}`"
    :href="getAvatarUrl(artist.url)"
    :style="setAvatarAsBg(artist.avatar)">
    <img
      v-if="artist.heroLevel > 0"
      :src="getAvatarImgUrl(`artist-hero-${artist.heroLevel}.svg`)"
      class="artist-hero-badge"
    >
  </a>
</template>

<script>
export default {
  name: 'artist-avatar',
  props: {
    img: String,
    artist: Object,
  },
  methods: {
    getBgImgUrl(url) {
      if (url.startsWith('http')) {
        return url;
      }
      // eslint-disable-next-line
      return require(`@/assets/img-mockup/${url}`);
    },
    getAvatarUrl(url) {
      if (url.startsWith('http')) {
        return url;
      }
      return this.$siteUrl(`/artists/${url}`).url();
    },
    getAvatarImgUrl(url) {
      // eslint-disable-next-line
      // return url ? require(`@/assets/img/artist-hero/badges/${url}`) : '';
      return url ? `https://static.motionelements.com/img/artists/hero/badges/${url}` : '';
    },
    setAvatarAsBg(url) {
      return `background: url('${this.getBgImgUrl(url)}');`;
    },
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
