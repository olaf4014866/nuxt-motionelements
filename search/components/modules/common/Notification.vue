<template>
<div class="toast-wrapper sticky-top" aria-live="polite" aria-atomic="true">
  <div class="p-3">

    <!--
    <template v-if="notifySearchBeta.status">
      <NotificationItem
        v-for="(notification, key) in notifySearchBeta.contents"
        :key="key"
        :notification="notification"
      ></NotificationItem>
    </template>
    -->

    <template v-if="notifyMessages.status">
      <NotificationItem
        v-for="(notification, key) in notifyMessages.contents"
        :key="key"
        :notification="notification"
      ></NotificationItem>
    </template>

  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import NotificationItem from '@/components/modules/common/NotificationItem.vue';

export default {
  name: 'main-notification',
  components: {
    NotificationItem,
  },
  computed: {
    ...mapState({
      notifyMessages: state => state.site.notify.messages,
    }),
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.toast-wrapper {
  @include media-breakpoint-only(xs) {
    &.sticky-top {
      top: 100vh;
    }
  }

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
