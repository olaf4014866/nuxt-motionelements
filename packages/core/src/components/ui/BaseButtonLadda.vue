<!--
  BUTTON LADDA description @stev HOW TO USE:

  1. pass Promise funtion into ButtonLadda
  in the parent component, use `methods` and `return` function,
  so the parent funtion can thourgh props into ButtonLadda.

  2. catch Promise function return to parent
  ButtonLadda will emit event `handle-click` to parent
  please catch event @handle-click in parent component

  3. loading and disabled status
  if pass function is Promise, ButtonLadda can handle the loading status
  if you want to control loading and disable status from parent
  please pass props call `buttonDisabled` and `buttonLoading`
  as default, when button loading, button status is disabled.

  4. demo pages
  search/src/views/Demo.vue
  pages/src/views/signup/Signup.vue
  pages/src/views/Login.vue

-->
<template>
  <button :class="buttonClass" ref="ladda" @click="clickEvent" :disabled="buttonDisabled || buttonLoading || selfLoading" :title="title">
    <font-awesome-icon v-if="(!buttonLoading || !selfLoading) && showIcon" :icon="icon" fixed-width></font-awesome-icon>
    <font-awesome-icon v-if="buttonLoading || selfLoading" :icon="['fas','circle-notch']" fixed-width spin class="text-muted"></font-awesome-icon>
    <!-- <LoaderSpin v-if="selfLoading" :size="'sm'" :grayscale="true" :grayscaleInvert="true" /> -->
    <slot>
      Submit
    </slot>
  </button>
</template>

<script>
import throttle from 'lodash/throttle';
// import LoaderSpin from '@/components/modules/common/LoaderSpin.vue';
export default {
  name: 'button-ladda-function',
  // components: {
  //   LoaderSpin,
  // },
  props: {
    buttonClass: {
      type: String,
      default: 'btn btn-light',
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
    buttonLoading: {
      type: Boolean,
      default: false,
    },
    click: {
      required: false,
      type: [Function, Promise],
    },
    title: {
      type: String,
    },
    icon: {
      type: Array,
      default() {
        return ['fas', 'me-search'];
      },
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    throttleInterval: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      selfLoading: false,
    };
  },
  methods: {
    // button ladda throttle
    clickEvent() {
      const component = this;
      throttle(function () {
        this.handleClick();
      }, this.throttleInterval).call(component);
    },
    async handleClick() {
      // console.log('handleClick', typeof this.click);
      this.selfLoading = true;
      // use try catch to detect if props click is or not promise
      try {
        await this.click().then((data) => {
          if (data) {
            console.log('function success, has data');
            this.$emit('handle-click', data);
          }
        }).catch((error) => {
          console.error('function return error: ', error);
          this.$emit('handle-click', error);
        });
      } catch (error) {
        console.log('no then, function executed');
        this.$emit('handle-click', 'clicked');
      } finally {
        this.selfLoading = false;
      }
    },
  },
};
</script>
