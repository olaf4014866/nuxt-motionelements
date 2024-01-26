<template>
  <div class="app-global-notification sticky-top">
    <!-- FLASH MESSAGE -->
    <template v-if="flash.status">
      <div v-for="(flashMessage, key) in flash.contents"
        :key="key">
        <div class="flash-message alert alert-dismissable rounded-0 mb-0" :class="`alert-${flashMessage.level}`" role="alert">
          <!-- <button type="button" class="close" data-dismiss="alert" aria-hidden="true" @click="closeFlashMessage(flashMessage)">×</button> -->
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <!-- {{ flashMessage.title }} -->
          <div v-html="flashMessage.title"></div>
          <!-- <template v-if="flash.contents.html.url">
            <a :href="flash.contents.html.url">{{ flash.contents.html.title }}</a>
          </template> -->
        </div>
      </div>
    </template>
    <!-- NOTIFICATION MESSAGE -->
    <div class="toast-wrapper" aria-live="polite" aria-atomic="true">
      <div class="p-3">
        <template v-if="alert.status">
          <BaseNotificationItem
            v-for="(notification, key) in alert.contents"
            :key="key"
            :notification="notification"
          ></BaseNotificationItem>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import notificationService from '@motionelements/core/src/services/notification.service.js';

import BaseNotificationItem from '@/components/ui/BaseNotificationItem.vue';

export default {
  name: 'base-notification',
  components: {
    BaseNotificationItem,
  },
  computed: {
    ...mapState({
      // notifications: state => state.notification.notifications,
      flash: state => state.notification.notifications.flash,
      alert: state => state.notification.notifications.alert,
    }),
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    closeFlashMessage(key) {
      notificationService.removeFlashMessage(key);
    },
  },
};
</script>

<style lang="scss" scoped>
  .alert-danger {
    color: #581135;
    background-color:#f27ab7;
    border-color:#eb2388;
  }
  .alert {
    position: relative;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
  }
  // .app-global-notification {
  //   @include media-breakpoint-only(xs) {
  //     &.sticky-top {
  //       top: 100vh;
  //     }
  //   }
  // }

  .toast-wrapper {
    & > div {
      position: absolute;

      @include media-breakpoint-up(sm) {
        top: 0;
        right: 0;
      }
      @include media-breakpoint-only(xs) {
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
</style>
