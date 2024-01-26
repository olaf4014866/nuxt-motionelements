<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Deposit credits
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-lg-row">
            <div class="card card-cta mr-lg-3">
              <div class="card-header">
                Download with credits
              </div>
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <div class="mb-3">

                    <!-- If there are multiple versions of elements -->
                    <template v-if="versionsArray.length > 1">
                      <ul class="nav nav-tabs nav-fill nav-versions" role="tablist">
                        <li
                          v-for="(version, index) in versionsArray"
                          :key="`version-${version}`"
                          class="nav-item"
                        >
                          <a
                            class="nav-link"
                            :class="index === 0 ? 'active' : ''"
                          >{{ version }}</a>
                          <!-- add .active if user selected the version beforehand -->
                        </li>
                      </ul>
                    </template>
                  </div>
                  <!-- Element Thumbnail -->
                  <p class="text-center">
                    <img
                      class="img-fluid rounded"
                      :src="element.thumbnails.jpg.url"
                    >
                  </p>
                  <p class="text-truncate mb-0 text-dark">{{element.name}}</p>
                  <p class="small">33 credits</p>
                </div>
                <div class="text-center">
                  <button
                    class="btn btn-block btn-primary"
                    @click="continuePurchase()"
                  >
                    Buy 33 credits for $33
                  </button>
                </div>
              </div>
            </div>
            <div class="card card-crosssell flex-lg-grow-1">
              <CreditsCoupon></CreditsCoupon>
            </div>
          </div>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-simple-secondary" data-dismiss="modal">Close</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'purchase-modal',
  props: {
    element: Object,
  },
  components: {
    CreditsCoupon: () => import('@/components/modules/product/modals/purchase-cross-sell/CreditsCoupon.vue'),
  },
  computed: {
    versionsArray() {
      if (this.element.versions) {
        return Object.keys(this.element.versions);
      }
      return [];
    },
  },
  methods: {
    continuePurchase() {
      console.log('continue to purchase');
    },
  },
};
</script>

<style lang="scss" scoped>
@include media-breakpoint-up(lg) {
  .card-cta {
    width: 33.33333%;
  }
}

// COLORS

// .nav-versions {
//   .nav-link {
//     &.active {
//       background: $transparent;
//       border-width: .25rem;
//       padding: 0.25rem 0.75rem;
//       border-style: solid;
//       border-color: $primary;
//     }
//   }
// }

.nav-versions {
  .nav-link {
    &.active {
      background: map-get(map-get($theme-colors-variants, 'light'), '1');
    }
  }
}
</style>
