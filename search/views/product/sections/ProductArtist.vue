<template>
  <div class="row mb-3 align-items-center">
    <div class="col-3 col-md-2 pr-0">
      <ArtistAvatar
        v-if="artistData"
        :member="artistData"
      />
    </div>
    <div class="col">
      <a
        :href="artist.html.url"
        itemprop="url"
        rel="author"
      >
        <span itemprop="name" class="h6">{{ artist.username }}</span>
      </a>

      <!-- Mediatype Count -->
      <div v-if="artistData">
        <ul class="list-inline" v-if="artistData.elements">
          <router-link
            v-for="e in artistData.elements"
            :key="e.id"
            class="list-inline-item btn btn-sm btn-simple-secondary"
            :to="$link($siteUrl(`${e.mediaType.replace('_', '-')}?artist=${artist.username}`).search().url()).fullPath()"
            >
            <ProductIcon
              :productType="e.mediaType"
              :square="false"
            />
            <span class="badge badge-secondary ml-1">{{ e.totalCount }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistProfile } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'artist-section',
  components: {
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
    // ArtistAvatar: () => import('@/components/modules/common/user/ArtistAvatar.vue'),
    ArtistAvatar: () => import('@motionelements/core/src/components/member/ArtistAvatar.vue'),
  },
  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
  created() {
    // use props artist as artist data before fetching for more info
    this.artistData = this.artist;
    getArtistProfile(this.artist.username).then((data) => {
      this.artistData = data;
    });
  },
  data() {
    return {
      artistData: null,
    };
  },
  methods: {
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
