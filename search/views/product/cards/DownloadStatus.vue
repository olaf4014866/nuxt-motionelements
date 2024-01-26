<template>
  <div class="card flex-grow-1 rounded overflow-hidden">
    <div class="card-body p-5 position-relative d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-center">
      <div class="mr-lg-5">
        <font-awesome-icon
          :icon="['fal','check-circle']"
          size="10x"
          class="text-success"
        />
      </div>
      <div>
        <h2>
          {{ $t('download.success_heading') }}
        </h2>
        <p class="lead text-success font-weight-bold">
          {{ $t('download.{product}_in_download_box', { product: name }) }}
        </p>
        <p>
          {{ $t('download.you_may_download_for_{number}_year', { number: 1}) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'credit-artist',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    element() {
      return this.product.object === 'element' ? this.product : null;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : null;
    },
    name() {
      let name = _.get(this.product, 'name', '');
      if (name.length === 0) {
        name = this.product.id;
      }
      return name;
    },
  },
};
</script>
