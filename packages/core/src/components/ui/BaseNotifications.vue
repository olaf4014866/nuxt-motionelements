<template>
  <div
      v-if="showFlashMessages || showAlertMessages"
      class="app-global-notification">
    <!-- FLASH MESSAGE -->
    <template v-if="showFlashMessages">
      <div v-for="(message) in currentFlashMessages"
           :key="message.id">
        <div class="flash-message sticky-top alert alert-dismissable rounded-0 mb-0" :class="`alert-${message.level}`" role="alert">
          <!-- <button type="button" class="close" data-dismiss="alert" aria-hidden="true" @click="closeFlashMessage(flashMessage)">×</button> -->
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 v-html="message.title" class="alert-heading"></h5>
          <span v-show="message.detail" v-html="message.detail" class="small"></span>
          <a v-if="_.get(message, 'button.url')"
             :href="message.button.url"
             :class="`btn-${message.level}`"
             class="mx-2 btn btn-sm"
          >
            {{ _.get(message, 'button.label') }}
          </a>
          <!-- <template v-if="flash.contents.html.url">
            <a :href="flash.contents.html.url">{{ flash.contents.html.title }}</a>
          </template> -->
        </div>
      </div>
    </template>
    <!-- NOTIFICATION MESSAGE -->
    <div class="toast-wrapper sticky-top" aria-live="polite" aria-atomic="true">
      <div class="p-3">
        <template v-if="showAlertMessages">
          <BaseNotificationItem
            v-for="(message) in currentAlertMessages"
            :key="message.id"
            :notification="message"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import notificationService from '@motionelements/core/src/services/notification.service.js';

import BaseNotificationItem from '@motionelements/core/src/components/ui/BaseNotificationItem.vue';

export default {
  name: 'base-notifications',
  components: {
    BaseNotificationItem,
  },
  computed: {
    ...mapState({
      // flash: state => state.notification.notifications.flash,
      // alert: state => state.notification.notifications.alert,
    }),
    ...mapGetters({
      flashMessages: 'notification/flashMessages',
      alertMessages: 'notification/alertMessages',
    }),
    showFlashMessages() {
      return Array.isArray(this.currentFlashMessages) && this.currentFlashMessages.length;
    },
    showAlertMessages() {
      return Array.isArray(this.currentAlertMessages) && this.currentAlertMessages.length;
    },
  },
  data() {
    return {
      currentFlashMessages: [],
      currentAlertMessages: [],
    };
  },
  created() {
    // clone
    this.currentFlashMessages = this.flashMessages.slice();
    this.$store.dispatch('notification/clearFlashMessages');

    // clone
    this.currentAlertMessages = this.alertMessages.slice();
    this.$store.dispatch('notification/clearAlertMessages');
  },
  methods: {
    // closeFlashMessage(key) {
    //   notificationService.removeFlashMessage(key);
    // },
  },
  watch: {
    flashMessages(newMessages) {
      if (newMessages.length > 0) {
        this.currentFlashMessages = this.flashMessages.slice();
        this.$store.dispatch('notification/clearFlashMessages');
      }
    },
    alertMessages(newMessages) {
      if (newMessages.length > 0) {
        this.currentAlertMessages = this.alertMessages.slice();
        this.$store.dispatch('notification/clearAlertMessages');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .app-global-notification {
    z-index: $zindex-fixed;
    width: 100%;

    position: fixed;
    @supports (position: sticky) {
      position: sticky;
    }
    top: 0;
  }

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

  .toast-wrapper {
    & > div {
      position: absolute;

      top: 0;
      right: 0;
      @include media-breakpoint-only(xs) {
        left: 0;
      }
    }
  }
</style>
