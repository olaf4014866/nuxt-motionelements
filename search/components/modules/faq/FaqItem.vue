<template>
  <div class="d-flex mb-2">
    <p class="faq-toggle faq-toggle-icon">
      <a
        @click="isExpanded = !isExpanded"
      >
        <font-awesome-layers class="fa-stack">
          <font-awesome-icon
            :icon="['fas','minus']"
          />
          <font-awesome-icon
            :icon="['fas','minus']"
            :class="!isExpanded ? 'fa-rotate-270' : ''"
          />
        </font-awesome-layers>
      </a>
    </p>
    <div class="faq-content flex-grow-1">
      <p class="faq-toggle mb-2">
        <a @click="isExpanded = !isExpanded"
          class="faq-question"
        >
          <slot name="question">
          </slot>
        </a>
      </p>
      <div
        :class="isExpanded ? 'show' : ''"
        class="faq-answer small">
        <slot name="answer">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'faq-item',
  props: {
    expand: {
      type: Boolean,
      required: false,
    },
  },
  data: function () {
    return {
      isExpanded: false,
    };
  },
  computed: {
  },
  watch: {
    expand: {
      handler(value) {
        this.isExpanded = value;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.faq-toggle-icon {
  line-height: 1;
}
.fa-minus {
  transition: transform .3s ease-in-out;
}
.faq-answer {
  display: none;
  // overflow: hidden;
  // max-height: 0;
  // transition: max-height .3s ease-out;

  &.show {
    display: block;
    // max-height: 500px;
    // transition: max-height .3s ease-in;
  }
}
</style>
