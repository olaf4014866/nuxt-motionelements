<template>
  <ul class="nav nav-tabs border" role="tablist">
    <li v-for="(tab, index) in tabs" :key="index" class="nav-item">
      <router-link
        :class="tabClass(tab, index)"
        :id="`${_.camelCase(tab.name)}-tab`"
        :to="tab.url"
        :aria-controls="`category-${_.camelCase(tab.name)}`"
        class="nav-link"
      >
        {{ tab.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'button-tab-custom',
  props: {
    tabs: Array,
  },
  computed: {
    tabClassByIndex() {
      var activeByIndex = true;
      this.tabs.forEach((tab) => {
        if (tab.active) {
          activeByIndex = false;
        }
      });
      return activeByIndex;
    },
  },
  methods: {
    tabClass(tab, index) {
      var classList = '';
      if (this.tabClassByIndex) {
        classList = index === 0 ? 'active' : 0;
      } else {
        classList = tab.active ? 'active' : 0;
      }
      return classList;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-tabs {
  padding: map-get($spacers,2);
  border-radius: $border-radius-lg;

  .nav-item {
    margin: 0;
  }

  .nav-link {
    &.active {
      background: $primary;
    }
    &:hover {
      border-color: $transparent;
    }
  }
}

.btn-group.btn-group-toggle {
  padding: map-get($spacers,2);
  border-radius: $border-radius-lg;

  .btn {
    cursor: pointer;
    border-radius: $border-radius;

    &:not(:first-child) {
      margin-left: map-get($spacers,1);
    }

    &:not(:last-child) {
      margin-right: map-get($spacers,1);
    }

    &:not(.active) {
      border-color: $transparent;
    }
  }
}

// COLORS
.nav-tabs {
  .nav-link {
    &.active {
      color: $white;
      border-radius: $border-radius;
    }
  }
}
.btn-group.btn-group-toggle {
  border: $border-width solid $border-color;

  .ui-dark & {
    border: $border-width solid $border-color-dark;
  }

  .btn {
    &:not(.active) {
      color: $link-color;
      background: $transparent;

      &:hover {
        background: $light;
      }

      .ui-dark & {
        color: $link-color-dark;

        &:hover {
          background: $black;
        }
      }
    }
  }
}

</style>
