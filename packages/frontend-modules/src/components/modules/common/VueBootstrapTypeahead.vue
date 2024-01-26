<template>
  <div>
    <div :class="sizeClasses">
      <div ref="prependDiv" v-if="$slots.prepend || prepend" class="input-group-prepend">
        <slot name="prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </slot>
      </div>

      <input
        :class="`form-control ${inputClass}`"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :value="inputValue"

        @input="handleInput($event.target.value)"

        @focus="handleFocus"
        @blur="handleBlur"

        @keydown.up="handleUp"
        @keydown.down="handleDown"
        @keydown.enter="handleEnter"
        @keydown.esc="handleEsc"

        ref="input"
        type="search"
        autocomplete="off"
      />

      <div v-if="$slots.append || append" class="input-group-append">
        <slot name="append">
          <span class="input-group-text">{{ append }}</span>
        </slot>
      </div>

    </div>

    <vue-bootstrap-typeahead-list
      class="vbt-autcomplete-list"
      ref="list"
      v-show="isFocused && data.length > 0"
      :query="inputValue"
      :data="formattedData"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      :maxMatches="maxMatches"
      :minMatchingChars="minMatchingChars"
      @hit="handleHit"
    >
      <!-- pass down all scoped slots -->
      <template v-for="(slot, slotName) in $scopedSlots" :slot="slotName" slot-scope="{ data, htmlText }">
        <slot
          :name="slotName"
          v-bind="{ data, htmlText }"
        ></slot>
      </template>
      <!-- below is the right solution, however if the user does not provide a scoped slot, vue will still set $scopedSlots.suggestion to a blank scope
      <template v-if="$scopedSlots.suggestion" slot="suggestion" slot-scope="{ data, htmlText }">
        <slot name="suggestion" v-bind="{ data, htmlText }" />
      </template>-->
    </vue-bootstrap-typeahead-list>

  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';
import VueBootstrapTypeaheadList from '@/components/modules/common/VueBootstrapTypeaheadList.vue';

export default {
  name: 'VueBootstrapTypehead',
  components: {
    VueBootstrapTypeaheadList,
  },
  props: {
    size: {
      type: String,
      default: null,
      validator: size => ['lg', 'sm'].indexOf(size) > -1,
    },
    value: {
      type: String,
    },
    data: {
      type: Array,
      required: true,
      validator: d => d instanceof Array,
    },
    serializer: {
      type: Function,
      default: d => d,
      validator: d => d instanceof Function,
    },
    backgroundVariant: String,
    textVariant: String,
    inputClass: {
      type: String,
      default: '',
    },
    maxMatches: {
      type: Number,
      default: 10,
    },
    minMatchingChars: {
      type: Number,
      default: 2,
    },
    placeholder: String,
    prepend: String,
    append: String,
  },
  data() {
    return {
      isFocused: false,
      inputValue: '',
      activeMenu: false,
    };
  },
  computed: {
    sizeClasses() {
      return this.size ? `input-group input-group-${this.size}` : 'input-group';
    },

    formattedData() {
      if (!(this.data instanceof Array)) {
        return [];
      }

      return this.data.map((d, i) => ({
        id: i,
        data: d,
        text: this.serializer(d),
      }));
    },
  },
  mounted() {
    const filter = this.$store.getters['search/allSearchFilter'];
    this.inputValue = filter.searchKeyword;

    this.$refs.input.focus();

    // bind a event let other component can call
    // this.$root.$on('onVueTypeahead', (event) => {
    //   this.onDrop(event);
    // });

    this.$_ro = new ResizeObserver(() => {
      this.resizeList(this.$refs.input);
    });

    this.$_ro.observe(this.$refs.input);
    this.$_ro.observe(this.$refs.list.$el);
  },
  beforeDestroy() {
    this.$_ro.disconnect();
  },
  methods: {
    resizeList(el) {
      // console.log(el);

      const rect = el.getBoundingClientRect();
      const listStyle = this.$refs.list.$el.style;

      // Set the width of the list on resize
      listStyle.width = `${rect.width}px`;

      // Set the margin when the prepend prop or slot is populated
      // (setting the "left" CSS property doesn't work)
      if (this.$refs.prependDiv) {
        const prependRect = this.$refs.prependDiv.getBoundingClientRect();
        listStyle.marginLeft = `${prependRect.width}px`;
      }
    },
    // appendSearchKeyword(slot) {
    //   console.log('appendSearchKeyword', slot);
    // },

    handleHit(evt) {
      if (typeof this.value !== 'undefined') {
        this.$emit('input', evt.text);
      }

      this.inputValue = evt.text;
      this.$emit('hit', evt.data);

      this.$refs.input.blur();
      this.isFocused = false;

      const filter = this.$store.state.search.filter;
      filter.searchKeyword = this.inputValue;
      this.$store.dispatch('search/setFilter', filter);

      this.$root.$emit('doSearchKeyword', this.inputValue);
    },

    handleFocus(evt) {
      // console.log('handleFocus', evt);

      // const tgt = evt.relatedTarget

      this.$emit('focus', evt);

      this.isFocused = true;
    },

    handleBlur(evt) {
      // console.log('handleBlur', evt);

      this.$emit('blur', evt);

      const tgt = evt.relatedTarget;
      if (tgt && tgt.classList.contains('vbst-item')) {
        return;
      }
      this.isFocused = false;
    },

    handleInput(newValue) {
      // console.log('handleInput', newValue);
      this.inputValue = newValue;

      // If v-model is being used, emit an input event
      if (typeof this.value !== 'undefined') {
        this.$emit('input', newValue);
      }
    },

    handleUp(evt) {
      // console.log('handleUp', evt);
      this.$emit('key-up', evt);
    },

    handleDown(evt) {
      // console.log('handleDown', evt);
      this.$emit('key-down', evt);
    },

    handleEnter(evt) {
      // console.log('handleEnter', evt);
      this.isFocused = false;
      this.$emit('key-enter', evt);

      const filter = this.$store.state.search.filter;
      filter.searchKeyword = this.inputValue;
      this.$store.dispatch('search/setFilter', filter);

      // this.$store.dispatch('search/setTypeaheads', []);
      this.$root.$emit('doSearchKeyword', this.inputValue);
    },

    handleEsc(evt) {
      // console.log('handleEsc', evt);
      this.$emit('key-esc', evt);
    },

  },
  watch: {

    value(keyword) {
      // console.log('watch Typeahead value - ', keyword);

      this.inputValue = keyword;
    },

    inputValue(keyword) {
      // console.log('watch Typeahead inputValue - ', keyword);

      // if (_.size(keyword)) {
      //   // type keyword, get suggestion
      //   this.updateTypeaheads(keyword);
      // }

      // console.log('inputValue', _.size(keyword));
      // console.log('inputValue', this.isFocused);

      if (_.size(keyword) === 0) {
        // clean keyword, reset filter
        const filter = this.$store.getters['search/allSearchFilter'];
        filter.searchKeyword = '';
        this.$root.$emit('doSearch', filter);
      }
    },

  },

};
</script>

<style scoped>
  .vbt-autcomplete-list {
    padding-top: 5px;
    position: absolute;
    max-height: 350px;
    overflow-y: auto;
    z-index: 999;
  }

  /* hide placeholder when focused input bar */

  /* Chrome <=56, Safari < 10 */
  input::-webkit-input-placeholder {
    opacity: 1;
    -webkit-transition: opacity .5s;
    transition: opacity .5s;
  }

  /* FF 4-18 */
  input:-moz-placeholder {
    opacity: 1;
    -moz-transition: opacity .5s;
    transition: opacity .5s;
  }

  /* FF 19-51 */
  input::-moz-placeholder {
    opacity: 1;
    -moz-transition: opacity .5s;
    transition: opacity .5s;
  }

  /* IE 10+ */
  input:-ms-input-placeholder {
    opacity: 1;
    -ms-transition: opacity .5s;
    transition: opacity .5s;
  }

  /* Modern Browsers */
  input::placeholder {
    opacity: 1;
    transition: opacity .5s;
  }

  /* Chrome <=56, Safari < 10 */
  input:focus::-webkit-input-placeholder {
    opacity: 1;
  }

  /* FF 4-18 */
  input:focus:-moz-placeholder {
    opacity: 1;
  }

  /* FF 19-50 */
  input:focus::-moz-placeholder {
    opacity: 1;
  }

  /* IE 10+ */
  input:focus:-ms-input-placeholder {
    opacity: 1;
  }

  /* Modern Browsers */
  input:focus::placeholder {
    opacity: 1;
  }

</style>
