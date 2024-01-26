<template>
  <span>
    <small>
        {{ money.getSymbol() }}
    </small>
    {{ money.toFormat('0,0.00') }}
    <small class="text-uppercase">
      {{ money.getCurrency() }}
    </small>
  </span>
</template>

<script>
export default {
  props: {
    // money.js object
    money: Object,
  },
};
</script>
