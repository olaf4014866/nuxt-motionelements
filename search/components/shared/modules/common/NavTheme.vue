<template>

  <div
    @click.stop.prevent="changeTheme"
    class="d-flex justify-content-between align-items-center">
    <div>
      <font-awesome-icon :icon="['fas','moon']" fixed-width></font-awesome-icon>
      {{ $t('search.ui_mode_dark') }}
    </div>
    <div class="custom-control custom-switch">
      <label
        :class="isDarkMode ? 'active' : ''"
        class="custom-control-label custom-control-label-theme"
      ></label>
    </div>
  </div>

</template>

<script>
export default {
  name: 'nav-theme',
  data() {
    return {
      isDarkMode: false,
    };
  },
  mounted() {
    // initial dark mode cookie
    const cookieSiteUI = this.$cookies.get('ME_SITE_UI_MODE');
    console.log('initial site ui : ', cookieSiteUI);
    if (cookieSiteUI === undefined || cookieSiteUI === 'light') {
      this.$cookies.set('ME_SITE_UI_MODE', 'light', { domain: '.motionelements.com', secure: true });
      this.isDarkMode = false;
    }

    // const isProduction = (window.location.port) ? true : false;

    if (cookieSiteUI === 'dark') {
      this.$cookies.set('ME_SITE_UI_MODE', 'dark', { domain: '.motionelements.com', secure: true });
      document.documentElement.classList.add('ui-dark');
      this.isDarkMode = true;
    }
  },
  methods: {
    changeTheme() {
      // set dark mode cookie
      const cookieSiteUI = this.$cookies.get('ME_SITE_UI_MODE');

      console.log('changeTheme : now is ', cookieSiteUI);

      if (cookieSiteUI === 'light') {
        this.$cookies.set('ME_SITE_UI_MODE', 'dark', { domain: '.motionelements.com', secure: true });
        document.documentElement.classList.add('ui-dark');
        this.isDarkMode = true;
        this.$root.$emit('darkMode', true);
      }

      if (cookieSiteUI === 'dark') {
        this.$cookies.set('ME_SITE_UI_MODE', 'light', { domain: '.motionelements.com', secure: true });
        document.documentElement.classList.remove('ui-dark');
        this.isDarkMode = false;
        this.$root.$emit('darkMode', false);
      }
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
