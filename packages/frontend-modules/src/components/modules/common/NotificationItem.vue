<template>

  <div
    :class="`border-${notification.type}`"
    class="toast border-left"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header justify-content-between">
      <strong
        :class="`text-${notification.type}`"
        class=""
      >
        <font-awesome-icon :icon="['fas',notificationIcon]" size="lg" fixed-width class="mr-2"></font-awesome-icon>
        <span v-if="notification.title">{{ notification.title }}</span>
        <span v-else>{{ notification.type | capitalize }}</span>
      </strong>
      <!-- <small class="text-muted">10s ago</small> -->
      <button
        @click="clickNotificationClose(notification)"
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span class="small" aria-hidden="true">
          <font-awesome-icon :icon="['fal','times']"></font-awesome-icon>
        </span>
      </button>
    </div>
    <div v-if="notification.message" v-html="notification.message" class="toast-body"></div>
  </div>
</template>

<script>
export default {
  name: 'main-notification-item',
  props: {
    notification: {},
  },
  mounted() {
    var options = {
      autohide: this.notification.autohide || false,
    };

    if (options.autohide) {
      Object.assign(options, {
        delay: this.notification.delay || 3000,
      });
    }

    $(this.$el).toast(options);
    $(this.$el).toast('show');
  },
  computed: {
    notificationIcon() {
      if (this.notification.icon) {
        return (this.notification.iconPrefix || '') + this.notification.icon;
      }

      switch (this.notification.type) {
        case 'success':
          return 'thumbs-up';
        case 'warning':
          return 'exclamation-circle';
        case 'danger':
          return 'exclamation-triangle';
        default:
          return 'info';
      }
    },
  },
  methods: {
    clickNotificationClose(notification) {
      // console.log('clickNotificationClose', notification);
      switch (notification.name) {
        default:
          break;
      }
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.toast.border-left {
  border-left-width: 5px !important;
}

@include media-breakpoint-only(xs) {
  .toast {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
