<template>
  <div :id="id" class="stepper">
    <a
      class="stepper-step d-flex flex-row mb-3 rounded"
      :class="{
        active: isExpanded || isEditable,
        editable: isEditable,
      }"
      @click.prevent="selectCurrentStep()"
    >
      <div class="stepper-step-step">
        <font-awesome-layers class="fa-2x" full-width>
          <font-awesome-icon :icon="['fas','circle']"/>

          <font-awesome-layers-text class="text-white" transform="shrink-8" :value="step" />

          <!--
          <template v-if="activeStep <= step || !editable">
            <font-awesome-layers-text class="text-white" transform="shrink-8" :value="step" />
          </template>

          <template v-if="activeStep > step && editable">
            <font-awesome-icon class="text-white" :icon="['fas','pencil']" transform="shrink-8"/>
          </template>
          -->
        </font-awesome-layers>
      </div>

      <div class="stepper-step-label flex-grow-1 d-flex align-items-center">
        <!-- <p class="stepper-step-step">
          Step {{ step }}
        </p> -->
        <slot name="label">
          <h3 class="h6">
            Title
          </h3>
        </slot>
        <font-awesome-icon v-if="isEditable" class="ml-2" :icon="['fas','pencil']"/>
      </div>

    </a>
    <div class="stepper-content-wrapper border-left">
      <div ref="stepperContent" class="stepper-content collapse">

        <slot name="content">
        </slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stepper-step',
  data() {
    return {};
  },
  props: {
    id: String,
    step: Number,
    activeStep: Number,
    editable: {
      type: Boolean,
      default: true,
    },
    scrollTo: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isExpanded() {
      return this.activeStep === this.step;
    },
    isEditable() {
      return this.editable && this.activeStep > this.step;
    },
  },
  methods: {
    toggleContent() {
      const $target = $(this.$refs.stepperContent);
      if (this.isExpanded === true) {
        $target.collapse('show');
      } else {
        $target.collapse('hide');
      }
    },
    selectCurrentStep() {
      if (this.isEditable) {
        this.$emit('switch-step', this.step);
      }
    },
  },
  mounted() {
    this.toggleContent();
    const $target = $(this.$refs.stepperContent);
    $target.on('shown.bs.collapse', () => {
      // scroll to the right position after expansion
      if (this.scrollTo && this.step > 1 && this.id) {
        this.$scrollTo(`#${this.id}`);
      }
    });
  },
  updated() {
  },
  watch: {
    isExpanded: function () {
      this.toggleContent();
    },
  },
};
</script>

<style lang="scss" scoped>
  .stepper {
    margin-bottom: $spacer;

    .stepper-step {
      margin: -$spacer;
      padding: $spacer;

      &:not(.active) {
        opacity: .5;
      }

      &:not(.editable) {
        cursor: default;
      }
    }

    .stepper-step-step {
      flex: 0 0 ($spacer * 3);  // flex-basis to be fixed width
      height: 2rem;             // avoid weird height issues with fixed height
    }

    .stepper-step-step {
      margin-bottom: 0;
    }

    .stepper-step-label::v-deep {
      h1, h2, h3, h4, h5, h6, p,
      .h1, .h2, .h3, .h4, .h5, .h6 {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .stepper-content-wrapper {
      margin-top: -$spacer;
      margin-left: $spacer;
      padding: $spacer $spacer;
      padding-left: $spacer * 2;
    }
  }

  // COLORS

  .stepper-step {
    &.editable {
      &:hover {
        background: map-get(map-get($theme-colors-variants,"light"),"1");

        .ui-dark & {
          background: map-get(map-get($theme-colors-variants,"dark"),"-1");
        }
      }
    }
  }
</style>
