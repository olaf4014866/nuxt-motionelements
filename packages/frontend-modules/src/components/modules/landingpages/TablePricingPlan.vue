<template>
  <div class="pricing-plan d-flex flex-grow-1 flex-column m-2 bg-white rounded shadow-sm text-center p-3">
    <div class="plan-header">
      <div class="plan-name h4 font-weight-bold mb-0">{{ plan.name }}</div>
      <ul v-if="plan.icons" class="list-inline">
        <li
          v-for="icon in plan.icons" :key="icon.index"
          class="list-inline-item text-muted">
          <i
          :class="`me-bmt icon-${icon}`"
          class="fas fa-fw"
        ></i>
        </li>
      </ul>
    </div>
    <div class="plan-price py-2">
      <p>
        <span class="plan-price-cost"><span class="plan-price-currency">{{ plan.currency }}</span><span class="plan-price-amount text-gradient-info">{{ plan.amount }}</span></span>/ 月<br />
        <span class="small"><strong>{{ plan.downloads }}</strong> ダウンロード</span>
      </p>
    </div>
    <div class="plan-items small mb-3 flex-grow-1">
      <ul class="list-group list-group-flush">
        <li v-for="item in plan.items" :key="item.index" class="list-group-item">

          <template v-if="item.isButton && item.link">
            <button
              :href="item.link"
              class="btn btn-sm btn-simple-info font-weight-bold">
              {{ item.text }}
            </button>
          </template>

          <template v-if="!item.isButton && item.link">
            <a :href="item.link" class="font-weight-normal">
              <font-awesome-icon
                v-if="item.icon"
                :icon="['fas',`me-${item-icon}`]" fixed-width></font-awesome-icon>
              {{ item.text }}
              <font-awesome-icon
                v-if="item.link" :icon="['fas','info-circle']"></font-awesome-icon>
            </a>
          </template>

          <template v-if="!item.link">
              <font-awesome-icon
                v-if="item.icon"
                :icon="['fas',`me-${item-icon}`]" fixed-width></font-awesome-icon>
              {{ item.text }}
          </template>

        </li>
      </ul>
    </div>
    <div class="plan-cta">
      <a :href="plan.link" class="btn btn-block btn-info text-white" rel="nofollow">購読する</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plan: Object,
  },
};
</script>

<style lang="scss" scoped>
.plan-price {

  .plan-price-cost {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.5;
  }
  .plan-price-currency {
    font-size: 1rem;
    font-weight: normal;
    color: $body-color !important;
    vertical-align: super;
    margin-right: map-get($spacers,1);
  }
}

</style>
