<template>
  <section class="section-breadcrumb breadcrumb-dark d-flex">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="d-none d-md-block col-md-5 pr-0">
          <nav v-if="breadcrumbs && breadcrumbs.length"
              aria-label="breadcrumb">
            <ol class="breadcrumb small">
              <li class="breadcrumb-item">
                  <span>MotionElements</span>
                <!-- <a :href="$link('/').url()"
                  rel="home"
                >
                  <span>MotionElements</span>
                </a> -->
              </li>
              <li v-for="item in breadcrumbs"
                  :key="item.name"
                  class="breadcrumb-item">
                <template v-if="false">
                  <span>{{ item.name }}</span>
                </template>
                <template v-else>
                  {{ item.name }}
                  <!-- <a :href="$link(item.link).fullPath()">
                    {{ item.name }}
                  </a> -->
                </template>
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-12 col-md-2 text-center">
          <a class="btn btn-block btn-link py-2" title="Back to Top" @click="$scrollTo('#app')">
            <font-awesome-icon :icon="['fas','angle-double-up']" fixed-width size="lg"/>
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
    breadcrumbs: {
      type: Array,
      required: false,
    },
  },
  // data() {
  // },
  // computed: {
  // },
  // methods: {
  // },
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

// COLORS

.breadcrumb-dark {
  .breadcrumb-item {
    a {
      color: $link-color-dark;
    }

    &.active {
      color: $text-muted;
    }
  }
}
</style>
