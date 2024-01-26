<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content overflow-hidden">
        <!--
        <div class="modal-header">
          <h5 class="modal-title">Just to confirm</h5>
        </div>
        -->
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="clearfix pt-3 text-center">
            <p>
              <font-awesome-icon
                :icon="['fas', warningIcon]"
                :class="`text-${type}`"
                size="4x" fixed-width
              ></font-awesome-icon>
              <!--
              <i
                :class="`fa-${warningIcon} text-${type}`"
                class="fas fa-4x fa-fw"
              ></i>
              -->
            </p>
            <h4>
              {{ $t('favorites.confirm_remove_{count}_items_text', { count: selectedElementsCount }) }}
            </h4>
            <p>
              {{ $t('favorites.you_cannot_undo_this_action') }}
            </p>
          </div>
        </div>
        <div class="modal-footer p-0 row no-gutter m-0">
          <button
            type="button"
            class="btn btn-light m-0 rounded-0 col-6"
            data-dismiss="modal"
          >
            {{ $t('cta.no') }}
          </button>
          <button
            @click="doDeleteFavorites()"
            :class="`btn btn-${type} m-0 rounded-0 col-6`"
            type="button"
          >
            {{ $t('cta.yes') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'favorites-modal-delete-element',
  props: {
    type: String,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
    }),
    warningIcon() {
      switch (this.type) {
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
    selectedElementsCount() {
      const selectedElementsId = this.$store.getters['product/selectedElementsId'];
      return (_.size(selectedElementsId) > 0) ? _.size(selectedElementsId) : 0;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    doDeleteFavorites() {
      $('#deleteElementWarning').modal('hide');

      const currentFolderId = this.$store.getters['library/currentFolderId'];
      const selectedElementsId = this.$store.getters['product/selectedElementsId'];
      // console.log(currentFolderId);
      // console.log(selectedElementsId);

      const info = {
        fromFolderId: currentFolderId,
        elements: selectedElementsId,
      };

      console.log('doDeleteFavorites', info);

      this.$store.dispatch('library/doDeleteFavorites', info).then((response) => {
        console.log('doDeleteFavorites done : ', response);

        this.$root.$emit('getSidebarList');
        this.$root.$emit('getFavoriteContent');


        const notify = this.$store.getters['site/notifyMessages'];
        notify.status = true;
        notify.contents.push({
          name: 'notifyMessages',
          type: 'success',
          title: this.$i18n.t('favorites.element_deleted'),
          autohide: true,
          delay: 3000,
        });
        this.$store.dispatch('site/setNotifyMessages', notify);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
