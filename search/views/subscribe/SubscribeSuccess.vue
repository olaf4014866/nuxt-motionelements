<template>
  <div>
    <div>
      <div class="container py-5">
        <div class="row">
          <div class="col-12">
            <h1>
              <span class="badge badge-pill badge-info shadow">
                <i class="fas me-bmt icon-lightning"></i>
              </span><br />
              {{ $t('subscribe.your_{name}_subscription_is_now_active', { name: $t('subscription_plan.unlimited') })}}
            </h1>
            <p>
              {{ $t('subscribe.thanks_{name}', { name: friendlyName }) }}
              {{ $t('subscribe.please_enjoy_your_unlimited_downloads')}}
            </p>
          </div>
        </div>
      </div>

      <div class="container py-5 border rounded mb-5 bg-light lt">
        <SvgGradientFill :color="'primary'" />
        <h2 class="h4 text-center">
          {{ $t('subscribe.start_searching_now') }}
        </h2>
        <hr class="hr-short">
        <div class="row">
          <div class="col-12">
            <div class="card-mediatypes d-flex flex-row flex-wrap justify-content-center">

              <router-link v-for="mediaType in mediaTypes"
                 :key="mediaType"
                 :to="$link('/search/' + mediaType.replace('_', '-')).param('subscription', 1).param('sort', 'popular').fullPath()"
                class="card text-center shadow-sm border-0 mb-3">
                <div class="card-body">
                  <p>
                    <ProductIcon
                      :productType="mediaType"
                      size="lg"
                      class="text-gradient-primary"
                    />
                  </p>
                  <p v-html="$term('mediaType', mediaType).html()"
                    class="text-dark"
                  >
                  </p>
                </div>
                <!-- <div class="card-footer bg-transparent border-top-0 pt-0">
                  <small class="font-weight-bold text-muted">21,013</small>
                </div> -->
              </router-link>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'subscribe-success',
  components: {
    SvgGradientFill: () => import('@/components/modules/common/SvgGradientFill.vue'),
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
  },
  data() {
    return {
      mediaTypes: ['video', 'music', 'ae', 'pr', 'fcp', 'resolve', 'image', 'sfx', '3d', 'lottie'],
    };
  },
  computed: {
    friendlyName() {
      return this.$store.getters['user/friendlyName'];
    },
  },
};
</script>

<style lang="scss" scoped>
  .hr-short {
    width: 4rem;
    border-width: .0625rem;
    border-color: $primary;
    border-radius: .125rem;

    &.hr-left {
      margin-left: 0;
      margin-right: auto;
    }
    &.hr-right {
      margin-right: 0;
      margin-left: auto;
    }
  }

  .card-mediatypes {
    .card {
      margin-left: $spacer;
      margin-right: $spacer;

      transition: box-shadow .2s ease;

      &:hover {
        box-shadow: $box-shadow !important;
      }
    }

    p {
      margin-bottom: 0;
    }
  }
</style>
