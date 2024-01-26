<template>
  <div class="card">
    <a
      :href="element.html.url"
      :title="element.name"
      class="card-img-top">
      <img
        :alt="element.name"
        :src="element.previews.jpg.url"
      >
    </a>
    <div class="card-body small">
      <a
        :href="element.html.url"
        :title="element.name">
        <h6 class="card-title text-truncate mb-1">
          <i v-if="iconMediaType" :class="`fas me-bmt ${iconMediaType} text-muted`"></i>
          {{ element.name }}
        </h6>
      </a>
      <p class="small text-muted">by <a :href="$site(element.artist.url).url()">{{ element.artist.username }}</a></p>
      <p v-if="element.description" class="card-text small">{{ description }}</p>
    </div>
    <div class="card-footer bg-transparent d-flex justify-content-between align-items-center border-top-0 pt-0">
      <small class="text-muted"><i class="far fa-fw me-bmt icon-clock"></i> {{ formatDate(element.published_at) }}</small>
      <a
        class="btn btn-sm btn-actionables btn-white-secondary"
        :href="element.html.url"
        :title="element.name">
        <span>{{ $t('product.view') }} </span><i class="far me-bmt icon-chevron-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'search-card-element-blog',
  props: {
    element: Object,
  },
  data: function () {
    return {
      title: this.element.name,
    };
  },
  computed: {
    description() {
      var text = this.stripHtml(this.element.description);
      if (text.length > 500) {
        return this.truncateString(text, 500, '...');
      }
      return text;
    },
    iconMediaType() {
      const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];
      const info = _.find(mapSupportedMediaTypes, { id: this.element.media_type });
      return info ? info.iconClassDefault : '';
    },
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'YYYY-MM-DD');
    },
    hoverFavorites(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = 'Add To Favorites';
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverFavorites - isEnter', isMouseEnter, element);
    },
    hoverSimilar(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = 'Find Visually Similar';
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverSimilar - isEnter', isMouseEnter, element);
    },
    hoverView(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = 'View Element';
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverSimilar - isEnter', isMouseEnter, element);
    },
    hoverMediatype(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = 'After Effects Template';
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverSimilar - isEnter', isMouseEnter, element);
    },
    hoverSubscription(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = 'Available For Subscription';
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverSimilar - isEnter', isMouseEnter, element);
    },
    stripHtml(str) {
      const temp = document.createElement('div');
      const temp2 = document.createElement('div');
      temp.innerHTML = str;
      temp2.innerHTML = temp.textContent || temp.innerText;
      return temp2.textContent || temp2.innerText;
    },
    truncateString(str, len, append) {
      var newLength;
      append = append || ''; // Optional: append a string to str after truncating. Defaults to an empty string if no value is given

      if (append.length > 0) {
        append = ` ${append}`; // Add a space to the beginning of the appended text
      }
      if (str.indexOf(' ') + append.length > len) {
        return str; // if the first word + the appended text is too long, the function returns the original String
      }

      if (str.length + append.length > len) {
        newLength = len - append.length;
      } else {
        newLength = str.length;
      } // if the length of original string and the appended string is greater than the max length, we need to truncate, otherwise, use the original string

      var tempString = str.substring(0, newLength); // cut the string at the new length
      tempString = tempString.replace(/\s+\S*$/, ''); // find the last space that appears before the substringed text

      if (append.length > 0) {
        tempString += append;
      }
      return tempString;
    },
  },
};
</script>

<style lang="scss" scoped>
$video-card-max-height-xxl:        9rem;
$template-card-max-height-xxl:     12rem;

$div-metadata-height:     0.875rem;
$div-title-height:        2rem;
$card-body-bottom-margin: $div-title-height;
$card-body-bottom-margin-sm: $div-title-height + .5rem;

// ASSIGN BREAKPOINTS BASED ON THE MAX WIDTH OF THUMBNAIL GENERATED
// breakpoint calculations at: https://docs.google.com/spreadsheets/d/1e0WYH-3Kz6gHL30QzWC-CiVr8SQVqLqu_NLSNJxNhOo/edit?usp=sharing
$video-card-breakpoints: (
  1: 0,
  2: 288px,
  3: 576px,
  4: 848px,
  5: 1386px
);

$template-card-breakpoints: (
  1: 0,
  2: 400px,
  3: 800px,
  4: 1434px,
  5: 1727px
);

.card-img-top {
  padding-bottom: 56.25%;
  position:relative;
  border-radius: $border-radius $border-radius 0 0;
  overflow:hidden;

  > img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
