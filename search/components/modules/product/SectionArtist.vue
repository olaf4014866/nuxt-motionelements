<template>
  <div class="row mb-3 align-items-center">
    <div class="col-3 col-md-2 pr-0">
      <ArtistAvatar :artist="artist"></ArtistAvatar>
    </div>
    <div class="col">
      <a
        :href="artist.url"
        itemprop="url"
        rel="author"
      >
        <span itemprop="name" class="h6">{{ artist.username }}</span>
      </a>

      <!-- Mediatype Count -->
      <div v-if="artistData.elements">
        <ul class="list-inline" v-if="artistData.elements">
          <a
            v-for="e in artistData.elements"
            :key="e.id"
            class="list-inline-item btn btn-sm btn-simple-secondary"
            :href="$siteUrl(`${e.mediaType}?artist=${artist.username}`).search().url()"
            >
            <i :class="`fas fa-fw me-bmt ${iconMediaType(e.mediaType)}`"></i>
            <span class="badge badge-secondary ml-1">{{ e.total_count }}</span>
          </a>
        </ul>
      </div>
    </div>

    <!-- TODO: Show only for admin members (ie only ME staff) -->
    <div
      v-if="isAdmin"
      class="col-12 mt-3">
      <div class="card border-danger">
        <div class="card-body">
          <h5 class="card-title text-danger">Artist Info for Admin</h5>
          <div class="card-text small">
            <p>
              <span class="badge badge-success mr-1">trusted</span>
              <span class="badge badge-success mr-1">promote</span>
              <span class="badge badge-light mr-1">gcp</span>
            </p>
            <ul class="list-unstyled">
              <li>
               country: Greece
              </li>
              <li>
                ip_country: Greece
              </li>
              <li>
                joined: 11 months ago
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artist-section',
  components: {
    ArtistAvatar: () => import('@/components/modules/common/user/ArtistAvatar.vue'),
  },
  props: {
    artist: Object,
    isAdmin: Boolean,
  },
  created() {
    this.$store.dispatch('site/getArtist', this.artist.username).then((data) => {
      this.artistData = data;
    });
  },
  data() {
    return {
      artistData: {},
    };
  },
  methods: {
    iconMediaType(mt) {
      const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];
      const info = _.find(mapSupportedMediaTypes, { id: mt });
      if (mt.match('3d')) {
        return 'icon-3d-model';
      }
      return info ? info.iconClassSecond : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-artist-mt {
  &:not(:last-child) {
    margin-right: map-get($spacers,1);
  }
}
</style>
