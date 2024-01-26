<template>
  <div class="parther-hero-wrapper d-flex align-items-center justify-content-between py-5 py-md-7 position-relative"
    :class="getBackgroundClass"
    :style="getBackgroundStyles">
    <img :src="data.image.url" />
    <p>{{ data.description }}</p>
    <!-- <p>{{ data.name }}</p> -->
    <h5>{{ data.cta.heading }}</h5>
    <p>{{ data.cta.description }}</p>
    <a :href="data.cta.url">{{ data.cta.label }}</a>
  </div>
</template>

<script>
export default {
  name: 'parther-hero-wrapper',
  props: {
    data: Object,
  },
};
</script>
