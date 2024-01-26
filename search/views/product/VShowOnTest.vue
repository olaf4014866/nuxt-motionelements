<template>
  <div class="py-6">
    <div class="container">
      <h1><code>v-show-on</code> Test</h1>
    </div>

    <div class="container">
      <div class="row row-demo py-3">

        <v-show-on size="xs" class="col-12 rounded col-index-1 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="xs"</code> This div will only show on 'xs' screens.</p>
        </v-show-on>

        <v-show-on size="sm" class="col-12 rounded col-index-2 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="sm"</code> This div will only show on 'sm' screens.</p>
        </v-show-on>

        <v-show-on size="md" class="col-12 rounded col-index-3 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="md"</code> This div will only show on 'md' screens.</p>
        </v-show-on>

        <v-show-on size="lg" class="col-12 rounded col-index-4 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="lg"</code> This div will only show on 'lg' screens.</p>
        </v-show-on>

        <v-show-on size="xl" class="col-12 rounded col-index-5 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','laptop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="xl"</code> This div will only show on 'xl' screens.</p>
        </v-show-on>

        <v-show-on size="xxl" class="col-12 rounded col-index-6 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','desktop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="xxl"</code> This div will only show on 'xxl' screens.</p>
        </v-show-on>

      </div>

      <hr />

      <div class="row row-demo py-3 justify-content-center">

        <v-show-on size="!xs" class="col-12 rounded col-index-1 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!xs"</code> This div will not show on 'xs' screens.</p>
        </v-show-on>

        <v-show-on size="!sm" class="col-12 rounded col-index-2 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!sm"</code> This div will not show on 'sm' screens.</p>
        </v-show-on>

        <v-show-on size="!md" class="col-12 rounded col-index-3 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!md"</code> This div will not show on 'md' screens.</p>
        </v-show-on>

        <v-show-on size="!lg" class="col-12 rounded col-index-4 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!lg"</code> This div will not show on 'lg' screens.</p>
        </v-show-on>

        <v-show-on size="!xl" class="col-12 rounded col-index-5 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','laptop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!xl"</code> This div will not show on 'xl' screens.</p>
        </v-show-on>

        <v-show-on size="!xxl" class="col-12 rounded col-index-6 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','desktop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!xxl"</code> This div will not show on 'xxl' screens.</p>
        </v-show-on>

      </div>

      <hr />

      <div class="row row-demo py-3 justify-content-center">

        <v-show-on size=">=xs" class="col rounded col-index-1 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size=">=xs"</code> This div will show on screens bigger than or equal to 'xs'.</p>
        </v-show-on>

        <v-show-on size=">=sm" class="col rounded col-index-2 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size=">=sm"</code> This div will show on screens bigger than or equal to 'sm'.</p>
        </v-show-on>

        <v-show-on size=">=md" class="col rounded col-index-3 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size=">=md"</code> This div will show on screens bigger than or equal to 'md'.</p>
        </v-show-on>

        <v-show-on size=">=lg" class="col rounded col-index-4 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size=">=lg"</code> This div will show on screens bigger than or equal to 'lg'.</p>
        </v-show-on>

        <v-show-on size=">=xl" class="col rounded col-index-5 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','laptop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size=">=xl"</code> This div will show on screens bigger than or equal to 'xl'.</p>
        </v-show-on>

        <v-show-on size=">=xxl" class="col rounded col-index-6 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','desktop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size=">=xxl"</code> This div will show on screens bigger than or equal to 'xxl'.</p>
        </v-show-on>

      </div>

      <hr />

      <div class="row row-demo py-3 justify-content-center">

        <v-show-on size="<=xs" class="col-12 rounded col-index-1 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="&lt;=xs"</code> This div will show on screens smaller than or equal to 'xs'.</p>
        </v-show-on>

        <v-show-on size="<=sm" class="col-12 rounded col-index-2 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="&lt;=sm"</code> This div will show on screens smaller than or equal to 'sm'.</p>
        </v-show-on>

        <v-show-on size="<=md" class="col-12 rounded col-index-3 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="&lt;=md"</code> This div will show on screens smaller than or equal to 'md'.</p>
        </v-show-on>

        <v-show-on size="<=lg" class="col-12 rounded col-index-4 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="&lt;=lg"</code> This div will show on screens smaller than or equal to 'lg'.</p>
        </v-show-on>

        <v-show-on size="<=xl" class="col-12 rounded col-index-5 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','laptop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="&lt;=xl"</code> This div will show on screens smaller than or equal to 'xl'.</p>
        </v-show-on>

        <v-show-on size="<=xxl" class="col-12 rounded col-index-6 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','desktop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="&lt;=xxl"</code> This div will show on screens smaller than or equal to 'xxl'.</p>
        </v-show-on>

      </div>

      <hr />

      <div class="row row-demo py-3 justify-content-center">

        <v-show-on size="!>=xs" class="col-12 rounded col-index-1 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!>=xs"</code> This div will not show on screens bigger than or equal to 'xs'.</p>
        </v-show-on>

        <v-show-on size="!>=sm" class="col-12 rounded col-index-2 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!>=sm"</code> This div will not show on screens bigger than or equal to 'sm'.</p>
        </v-show-on>

        <v-show-on size="!>=md" class="col-12 rounded col-index-3 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!>=md"</code> This div will not show on screens bigger than or equal to 'md'.</p>
        </v-show-on>

        <v-show-on size="!>=lg" class="col-12 rounded col-index-4 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!>=lg"</code> This div will not show on screens bigger than or equal to 'lg'.</p>
        </v-show-on>

        <v-show-on size="!>=xl" class="col-12 rounded col-index-5 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','laptop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!>=xl"</code> This div will not show on screens bigger than or equal to 'xl'.</p>
        </v-show-on>

        <v-show-on size="!>=xxl" class="col-12 rounded col-index-6 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','desktop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!>=xxl"</code> This div will not show on screens bigger than or equal to 'xxl'.</p>
        </v-show-on>

      </div>

      <hr />

      <div class="row row-demo py-3 justify-content-center">

        <v-show-on size="!<=xs" class="col rounded col-index-1 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!&lt;=xs"</code> This div will not show on screens smaller than or equal to 'xs'.</p>
        </v-show-on>

        <v-show-on size="!<=sm" class="col rounded col-index-2 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','mobile-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!&lt;=sm"</code> This div will not show on screens smaller than or equal to 'sm'.</p>
        </v-show-on>

        <v-show-on size="!<=md" class="col rounded col-index-3 py-3">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!&lt;=md"</code> This div will not show on screens smaller than or equal to 'md'.</p>
        </v-show-on>

        <v-show-on size="!<=lg" class="col rounded col-index-4 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','tablet-alt']" fixed-width size="2x" :transform="{ rotate: 270 }"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!&lt;=lg"</code> This div will not show on screens smaller than or equal to 'lg'.</p>
        </v-show-on>

        <v-show-on size="!<=xl" class="col rounded col-index-5 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','laptop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!&lt;=xl"</code> This div will not show on screens smaller than or equal to 'xl'.</p>
        </v-show-on>

        <v-show-on size="!<=xxl" class="col rounded col-index-6 py-3 text-white">
          <p class="text-center"><font-awesome-icon :icon="['fas','desktop']" fixed-width size="2x"></font-awesome-icon></p>
          <p class="text-center"><code class="badge badge-white">size="!&lt;=xxl"</code> This div will not show on screens smaller than or equal to 'xxl'.</p>
        </v-show-on>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-show-on-test',
  components: {
    'v-show-on': () => import('@/components/modules/common/ViewportHelper.vue'),
  },
};
</script>

<style lang="scss" scoped>
.row-demo {
    .col-index-1 {
      background: #64cff1;
    }
    .col-index-2 {
      background: #35c0ed;
    }
    .col-index-3 {
      background: #14abdb;
    }
    .col-index-4 {
      background: #1087ac;
    }
    .col-index-5 {
      background: #0b627e;
    }
    .col-index-6 {
      background: #042530;
    }
}
</style>
