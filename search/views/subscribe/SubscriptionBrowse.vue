<template>
  <div class="container py-6">

    <ContentBox class="text-center">
      <template slot="heading">
        <span class="badge badge-info badge-pill"><i class="fas fa-fw me-bmt icon-lightning"></i></span>
        {{ $t('subscribe.subscription_catalog_heading') }}
      </template>
      <template slot="content">
        {{ $t('subscribe.subscription_catalog_text') }}
        <i18n path="subscribe.elements_available_for_download_are_indicated_with_subscription_{icon}_text" tag="p">
          <template v-slot:icon>
            <span class="badge badge-info badge-pill"><i class="fas fa-fw me-bmt icon-lightning"></i></span>
          </template>
        </i18n>

        <div class="row">
          <div class="col-12 col-sm-4 mb-5">
            <img class="img-fluid mb-3 rounded shadow-sm" src="https://static.moele.me/img/subscribe/search-step-1-en.201008.jpg">
            <p class="text-uppercase text-muted h6 mb-1">
              {{ $t('term.step_{number}', { number: '1'} ) }}
            </p>
            <p class="h6">
              {{ $t('subscribe.search_for_elements') }}
            </p>
          </div>
          <div class="col-12 col-sm-4 mb-5">
            <img class="img-fluid mb-3 rounded shadow-sm" src="https://static.moele.me/img/subscribe/search-step-2-en.201008.jpg">
            <p class="text-uppercase text-muted h6 mb-1">
              {{ $t('term.step_{number}', { number: '2'} ) }}
            </p>
            <p class="h6">
              {{ $t('subscribe.check_subscription_elements') }}
            </p>
          </div>
          <div class="col-12 col-sm-4 mb-5">
            <img class="img-fluid mb-3 rounded shadow-sm" src="https://static.moele.me/img/subscribe/search-step-3-en.201008.jpg">
            <p class="text-uppercase text-muted h6 mb-1">
              {{ $t('term.step_{number}', { number: '3'} ) }}
            </p>
            <p class="h6">
              {{ $t('subscribe.download_your_elements') }}
            </p>
          </div>
        </div>
        <p>
          {{ $t('subscribe.purchase_on_demand_elements_text') }}
        </p>
      </template>
    </ContentBox>

  </div>
</template>


<script>
export default {
  name: 'subscription-browse',
  components: {
    ContentBox: () => import('@/views/subscribe/ContentBox.vue'),
  },
};
</script>
