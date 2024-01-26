<template>
  <div
    :class="{'is-selected' : isSelectedElement}"
    :style="{ 'opacity': (isDraggingElement && isSelectedElement) ? 0.5 : 1 }"
    draggable="true"
    ondragstart="event.dataTransfer.setData('text/plain', 'dragging')"
    ref="draggable"
    class="draggable"
  >
    <slot></slot>

  <!--
  <script type="text/x-template" id="dragging-background-template">
  </script>
  -->

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'element-draggable',
  props: {
    element: Object,
  },
  data() {
    return {
      isDragging: false,
    };
  },
  computed: {
    ...mapState({
      isDraggingElement: state => state.product.isDraggingElement,
      selectedElementsId: state => state.product.selectedElementsId,
      selectedCount: state => state.product.selectedCount,
    }),
    isSelectedElement() {
      const elementId = this.element.id;
      return (this.selectedElementsId.indexOf(elementId) >= 0) ? true : false;
    },
    dragCounter() {
      return this.isSelectedElement ? this.selectedCount : 1;
    },
  },
  created() {
  },
  mounted() {
    // this.$refs.draggable.addEventListener('drag', this.drag, false);
    this.$refs.draggable.addEventListener('dragstart', this.dragStart, false);
    this.$refs.draggable.addEventListener('dragend', this.dragEnd, false);
  },
  methods: {
    // drag() {
    //   console.log('event : drag');
    // },
    dragStart(event) {
      console.log('event : drag start ', event.target);

      const draggingElementId = this.element.id;
      const selectedElementsId = this.$store.getters['product/selectedElementsId'];

      const isAdd = (selectedElementsId.indexOf(draggingElementId) >= 0) ? true : false;
      if (!isAdd) {
        selectedElementsId.push(draggingElementId);
      }

      this.$store.dispatch('product/setSelectedElementsId', selectedElementsId);

      // Set template for dragImage
      /* eslint-disable */
      var template = `
      <div
        id="icon-dragging-file"
        full-width=""
        class="fa-2x fa-layers"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="file"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="svg-inline--fa fa-file fa-w-12"
        >
          <path
            fill="currentColor"
            d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
            class=""
          ></path>
        </svg>
        <span
          class="text-white bg-primary fa-layers-text"
          style="transform: translate(calc(-50% + 0.375em), calc(-50% + 0.5em)) scale(0.375, 0.375) rotate(0deg);line-height:1;padding:0.5rem 1rem;border-radius:1rem;"
        >
          ${this.dragCounter}
        </span>
      </div>`;
      /* eslint-enable */

      // Create a dummy image for our dragImage
      var dragImage = document.createElement('div');
      dragImage.innerHTML = template;
      dragImage.setAttribute('style', 'position: absolute; left: 0px; z-index: -1');
      document.body.appendChild(dragImage);

      // Assign the dragImage and position it on cursor
      event.dataTransfer.setDragImage(dragImage, 8, 8);

      const isDraggingOne = (!this.isSelectedElement) ? true : false;
      const isDraggingGroup = (this.isSelectedElement) ? true : false;

      console.log('isDraggingOne', isDraggingOne);
      console.log('isDraggingGroup', isDraggingGroup);

      if (isDraggingOne) {
        event.target.style.opacity = 0.5;
        this.$store.dispatch('product/setIsDraggingGroup', false);
      }

      if (isDraggingGroup) {
        // event.target.style.opacity = 0.5;
        this.$store.dispatch('product/setIsDraggingGroup', true);
      }

      this.$store.dispatch('product/setIsDraggingElement', true);

      const elementId = this.element.id;
      this.$store.dispatch('product/setDraggingElementId', elementId);
    },
    dragEnd(event) {
      console.log('event : end drag ', event.target);

      const isDraggingOne = (this.isSelectedElement) ? true : false;
      const isDragGroup = (!this.isSelectedElement) ? true : false;

      if (isDraggingOne) {
        event.target.style.opacity = '';
        this.$store.dispatch('product/setIsDraggingGroup', false);
      }

      if (isDragGroup) {
        event.target.style.opacity = '';
        this.$store.dispatch('product/setIsDraggingGroup', false);
      }

      this.$store.dispatch('product/setIsDraggingElement', false);

      document.getElementById('icon-dragging-file').remove();
    },
  },
};
</script>

<style lang="scss" scoped>
  .draggable {
    display: inline;
    cursor: pointer;
  }
</style>
