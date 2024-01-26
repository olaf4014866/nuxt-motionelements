<template>
  <div id="button-free-bookmarklet">
    <a class="text-uppercase d-none d-lg-inline-block btn btn-sm bg-gradient-light px-2 no-hover"
      @mouseover="tooltipShow"
      :title="$t('free.drag_this_to_your_bookmark_bar')"
      @click.prevent="e => e.preventDefault()"
      :href="$siteUrl($route.name).www().url()">
      {{$t('term.free_elements')}}
    </a>
    <div class="d-none d-lg-inline-block btn btn-sm bg-gradient-light px-2">
      <font-awesome-icon :icon="['fas','bookmark']" size="lg" fixed-width></font-awesome-icon>
      <span v-html="$t('free.get_{product}_bookmarklet', {product: $t('term.free_elements')})"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'button-free-bookmarklet',
  methods: {
    tooltipShow(event) {
      var $target = $(event.target);
      var text = event.target.title;

      if (text) {
        $target
          .tooltip({
            container: 'body',
            title: text,
            placement: 'bottom',
          })
          .tooltip('show');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  #button-free-bookmarklet {
    position: relative;
  }
  .hover:hover {
    font-display: uppercase;
    vertical-align: middle;
    color: $red;
  }
  .no-hover {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    transition: all .15s;
  }
  .no-hover:hover {
    color: $red;
    opacity: 1;
  }
</style>
