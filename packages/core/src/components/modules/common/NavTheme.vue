<template>

  <div
    @click.stop.prevent="changeTheme"
    class="d-flex justify-content-between align-items-center">
    <div>
      <font-awesome-icon :icon="['fas','moon']" fixed-width/>
      {{ $t('search.ui_mode_dark') }}
    </div>
    <div class="custom-control custom-switch">
      <label
        :class="isDarkMode ? 'active' : ''"
        class="custom-control-label custom-control-label-theme"
      />
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'nav-theme',
  data() {
    return {
      // isDarkMode: false,
    };
  },
  computed: {
    ...mapState({
      uiMode: state => state.user.preferences.ui.mode,
    }),
    isDarkMode() {
      return this.uiMode === 'dark';
    },
  },
  mounted() {
  },
  methods: {
    changeTheme() {
      const currentMode = this.isDarkMode ? 'dark' : 'light';
      this.$store.dispatch('user/changeUiMode', currentMode === 'light' ? 'dark' : 'light');
      // if (currentMode === 'light') {
      //   this.$store.dispatch('user/changeUiMode', 'dark');
      //   // this.$root.$emit('darkMode', true);
      // } else if (currentMode === 'dark') {
      //   this.$store.dispatch('user/changeUiMode', 'light');
      //   // this.$root.$emit('darkMode', false);
      // }
    },
  },

};
</script>

<style lang="scss" scoped>
.custom-control-label-theme {
  &:before, &:after {
    cursor: pointer;
  }

  &.active {
    &:before {
      color: $black;
      background-color: $custom-control-indicator-checked-bg;
      border-color: $custom-control-indicator-checked-border-color;

      .ui-dark & {
        color: $black;
        background-color: $custom-control-indicator-checked-bg-dark;
        border-color: $custom-control-indicator-checked-border-color-dark;
      }
    }

    &:after {
      transform: translateX(0.9375rem);
      background-color: $white;

      .ui-dark & {
        background-color: $black;
      }
    }
  }
}
</style>
