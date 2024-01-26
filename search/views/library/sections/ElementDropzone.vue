<template>
  <div
    ref="dropzone"
    class="dropzone-wrapper"
    :class="{ 'bg-light' : isDragEnter }"
  >
    <slot></slot>
    <div
      class="dropzone"
      :class="{ 'active' : isDraggingElement }"
    ></div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'element-dropzone',
  props: {
    list: Object,
  },
  data() {
    return {
      isDragEnter: false,
    };
  },
  computed: {
    ...mapState({
      isDraggingElement: state => state.product.isDraggingElement,
    }),
    ...mapGetters({
      // isMember: 'user/isMember',
      // currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      currentListMode: 'library/currentListMode',
    }),
  },
  created() {
  },
  mounted() {
    this.$refs.dropzone.addEventListener('dragover', this.dragOver, false);
    this.$refs.dropzone.addEventListener('dragenter', this.dragEnter, false);
    this.$refs.dropzone.addEventListener('dragleave', this.dragLeave, false);
    this.$refs.dropzone.addEventListener('drop', this.drop, false);
  },
  methods: {
    dragOver(event) {
      // console.log('event : dragOver ', event.target);
      event.preventDefault();
    },
    dragEnter(event) {
      console.log('event : dragEnter ', event);

      if (event.target.className === 'dropzone active') {
        this.isDragEnter = true;
      }
    },
    dragLeave(event) {
      console.log('event : dragLeave ', event);

      if (event.target.className === 'dropzone active') {
        this.isDragEnter = false;
      }
    },
    drop(event) {
      console.log('event : drop ', this.list);

      event.preventDefault();

      const isDropToFolder = (event.target.className === 'dropzone active') ? true : false;
      if (!isDropToFolder) {
        return;
      }

      this.isDragEnter = false;

      // this.$root.$emit('doAudioPlayerSetPosition', info);

      const currentFolderId = this.currentFolderId;
      const targetFolderId = this.list.id;


      const isDraggingGroup = this.$store.getters['product/isDraggingGroup'];

      const elements = [];

      if (!isDraggingGroup) {
        const draggingElementId = this.$store.getters['product/draggingElementId'];

        elements.push(draggingElementId);
      }

      if (isDraggingGroup) {
        const selectedElementsId = this.$store.getters['product/selectedElementsId'];

        Object.keys(selectedElementsId).map((key) => {
          const elementId = selectedElementsId[key];
          elements.push(elementId);
        });
      }

      const currentListMode = this.currentListMode;
      const isCopyMode = currentListMode === 'history';
      const isMoveMode = currentListMode === 'folder';

      console.log('ENNNDD DRAG', currentListMode);

      if (isCopyMode) {
        const info = {
          // fromFolderId: currentFolderId,
          folderId: targetFolderId,
          skus: elements,
        };

        console.log('drop : copy to folder - ', info);

        this.$store.dispatch('library/doCopyFavorites', info).then((response) => {
          console.log('doCopyFavorites done : ', response);

          this.$root.$emit('getSidebarList');
          this.$root.$emit('getFavoriteContent');

          const notify = this.$store.getters['site/notifyMessages'];
          notify.status = true;
          notify.contents.push({
            name: 'notifyMessages',
            type: 'success',
            title: this.$i18n.t('favorites.element_copied'),
            autohide: true,
            delay: 3000,
          });
          this.$store.dispatch('site/setNotifyMessages', notify);
        });
      }

      if (isMoveMode) {
        const info = {
          fromFolderId: currentFolderId,
          toFolderId: targetFolderId,
          elements: elements,
        };

        console.log('drop : move to folder - ', info);

        this.$store.dispatch('library/doMoveFavorites', info).then((response) => {
          console.log('doMoveFavorites done : ', response);

          this.$root.$emit('getSidebarList');
          this.$root.$emit('getFavoriteContent');

          const notify = this.$store.getters['site/notifyMessages'];
          notify.status = true;
          notify.contents.push({
            name: 'notifyMessages',
            type: 'success',
            title: this.$i18n.t('favorites.element_moved'),
            autohide: true,
            delay: 3000,
          });
          this.$store.dispatch('site/setNotifyMessages', notify);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropzone {
  position: absolute;

  &.active {
    width: 100%;
    height: 100%;
    top:0;
    left:0;
  }
}
</style>
