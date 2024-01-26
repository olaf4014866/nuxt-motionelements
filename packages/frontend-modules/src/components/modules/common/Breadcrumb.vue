<template>
  <section class="section-breadcrumb breadcrumb-dark d-flex">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="d-none d-md-block col-md-5 pr-0">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
              <li class="breadcrumb-item">
                <router-link :to="$siteUrl('home').router().url()">
                <span>MotionElements</span>
              </router-link>
              </li>
              <li class="breadcrumb-item">
                <span style="color: #bcc1c3">{{ getPageName() }}</span>
                <!-- <span style="color: #bcc1c3">{{ $term('mediaType', this.mediatype).text() || 'Home' }}</span> -->
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-12 col-md-2 text-center">
          <a class="btn btn-block btn-link py-2" title="Back to Top" @click="$scrollTo('#app')">
            <font-awesome-icon :icon="['fas','angle-double-up']" fixed-width size="lg"></font-awesome-icon>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    mediatype: String,
  },
  methods: {
    getPageName() {
      if (this.mediatype.match('free')) {
        return this.$term('mediaType', this.mediatype).text();
      }
      return this.$t(`header.${this.mediatype.replace('_template', '')}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.section-breadcrumb {
  background: map-get(map-get($theme-colors-variants,"black"),"1");
  min-height: 2rem;
}

.breadcrumb {
  flex-wrap: nowrap;

  .breadcrumb-item {
    white-space: nowrap;

    &:last-child {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.breadcrumb-dark {
  a {
    color: $link-color-dark;
  }
}
</style>
