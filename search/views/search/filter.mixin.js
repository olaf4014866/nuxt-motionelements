
// import { mapState } from 'vuex';

import Money from '@motionelements/money';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';
import {
  snakeCase,
  camelCase,
} from 'lodash/fp';

export default {

  data: function () {
    return {
      filtersSchema: {
        subscription: {
          label: this.$i18n.t('search.subscription_elements'),
          type: 'boolean',
        },
        // ease of use fields
        editable: {
          label: this.$i18n.t('search.editable_in_fcpx'),
          type: 'boolean',
        },
        tutorial: {
          label: this.$i18n.t('search.tutorial_available'),
          type: 'boolean',
        },
        noPlugin: {
          label: this.$i18n.t('product.plugins_not_required'),
          type: 'boolean',
        },
        noYoutubeContentId: {
          label: this.$i18n.t('search.filter_youtube_content_id_registered'),
          type: 'boolean',
          tooltip: {
            title: this.$i18n.t('search.filter_youtube_content_id_registered_tooltip'),
            url: this.$link('https://help.motionelements.com/hc/en-us/articles/206279262').url(),
          },
        },
        skill: {
          label: this.$i18n.t('search.easy_to_use'),
          type: 'boolean',
        },
        textspace: {
          label: this.$i18n.t('search.suitable_for_text_layouts'),
          type: 'boolean',
        },
        alpha: {
          label: this.$i18n.t('search.with_matte_alpha'),
          type: 'boolean',
        },
        loop: {
          label: this.$i18n.t('product.loopable'),
          type: 'boolean',
        },
        animated: {
          label: this.$i18n.t('product.animated'),
          type: 'boolean',
        },
        rigged: {
          label: this.$i18n.t('product.rigged'),
          type: 'boolean',
        },
        // dropdown facet fields
        polygon: {
          label: this.$i18n.t('product.polygons'),
          icon: ['fal', 'me-polygon'],
        },
        softwareVersion: {
          label: this.$i18n.t('search.version'),
          icon: ['fal', 'desktop'],
        },
        orientation: {
          label: this.$i18n.t('search.orientation'),
          icon: ['fal', 'me-aspect-ratio'],
        },
        resolution: {
          label: this.$i18n.t('search.resolution'),
          icon: ['fal', 'me-resolution'],
        },
        source: {
          label: this.$i18n.t('search.source'),
          icon: ['fal', 'desktop'],
        },
        type: {
          label: this.$i18n.t('search.type'),
          icon: ['fal', 'tag'],
        },
        size: {
          label: this.$i18n.t('search.size'),
          icon: ['fal', 'expand-arrows'],
        },
        category: {
          label: this.$i18n.t('search.category'),
          icon: ['fal', 'tag'],
        },
        style: {
          label: this.$i18n.t('search.style'),
          icon: ['fal', 'paint-brush'],
        },
        genre: {
          label: this.$i18n.t('search.genre'),
          icon: ['fal', 'music'],
        },
        mood: {
          label: this.$i18n.t('search.mood'),
          icon: ['fal', 'theater-masks'],
        },
        instrument: {
          label: this.$i18n.t('search.instrument'),
          icon: ['fal', 'guitar'],
        },
        plugin: {
          label: this.$i18n.t('product.plugin'),
          icon: ['fal', 'plug'],
        },
        framing: {
          label: this.$i18n.t('search.framing'),
          icon: ['fal', 'me-framing'],
        },
        durationRange: {
          label: this.$i18n.t('search.duration'),
          icon: ['fal', 'clock'],
        },
        bpmRange: {
          label: this.$i18n.t('search.tempo'),
          icon: ['fal', 'me-metronome'],
        },
        license: {
          label: this.$i18n.t('search.license'),
          icon: ['fal', 'file-certificate'],
        },
        fps: {
          label: this.$i18n.t('search.frame_rate'),
          icon: ['fal', 'me-frame-rate'],
        },
        format: {
          label: this.$i18n.t('search.format'),
          icon: ['fal', 'me-format'],
        },
        color: {
          label: this.$i18n.t('search.color'),
          icon: ['fal', 'tint'],
          type: 'color',
        },
        artist: {
          label: this.$i18n.t('search.artist'),
          icon: ['fal', 'me-user-artist'],
          type: 'artist',
        },

        priceRange: {
          label: this.$i18n.t('search.price'),
          icon: ['fal', 'dollar-sign'],
          type: 'price',
        },
      },
    };
  },
  mounted() {

  },
  computed: {
    mixinCurrencyFxRate: function () {
      // fallback to USD
      if (this.userCurrency !== 'USD') {
        try {
          // set price range and calculation currency
          const mapCurrencies = this.$store.getters['site/mapCurrencies'];

          const currencyInfo = _.get(mapCurrencies, this.userCurrency);

          if (currencyInfo && _.has(currencyInfo, 'rate')) {
            return currencyInfo.rate;
          }

          return null;
        } catch (err) {
          return null;
        }
      }

      return 1;
    },
  },
  methods: {
    pushFilterToRoute(filterKey, value) {
      // keep all query
      const query = { ...this.$route.query };

      // set to page 1
      delete query.page;

      if (value === null) {
        // // remove filer
        delete query[snakeCase(filterKey)];
        // just in case, delete camelCase as well
        delete query[camelCase(filterKey)];
      } else {
        // push virtually as string??
        query[snakeCase(filterKey)] = value;
      }

      const currentQuery = JSON.stringify(this.$route.query);
      const newQuery = JSON.stringify(query);

      if (currentQuery !== newQuery) {
        this.$router.push({
          query: query,
        });
      }
    },

    renderFilterValue(field, data, mediaType) {
      switch (field) {
        case 'fps':
          return `${data.value} FPS`;

        case 'orientation':
          switch (data.value) {
            case 'horizontal':
              return this.$i18n.t('search.horizontal');
            case 'vertical':
              return this.$i18n.t('search.vertical');
            case 'square':
              return this.$i18n.t('search.square');
            default:
              return data.value;
          }

        case 'size':
          switch (data.value) {
            case 'small':
              return this.$i18n.t('search.small');
            case 'medium':
              return this.$i18n.t('search.medium');
            case 'large':
              return this.$i18n.t('search.large');
            default:
              return data.value;
          }

        case 'framing':
          switch (data.value) {
            case 'cu':
              return this.$i18n.t('search.close_up');
            case 'ms':
              return this.$i18n.t('search.medium_shot');
            case 'ls':
              return this.$i18n.t('search.wide_shot');
            default:
              return data.value.toUpperCase();
          }

        case 'license':
          switch (data.value) {
            case 'rf':
              return this.$i18n.t('search.royalty_free_rf');
            case 'pro':
              return this.$i18n.t('search.pro_registered');
            case 'editorial':
              return this.$i18n.t('search.editorial');
            default:
              return data.value;
          }

        case 'bpmRange': {
          let [min] = data.value.toString().replace(',', '-').split('-');

          min = parseInt(min, 10);

          switch (true) {
            case min >= 140:
              return this.$i18n.t('search.vary_fast');
            case min >= 110:
              return this.$i18n.t('search.fast');
            case min >= 70:
              return this.$i18n.t('search.moderate');
            default:
              return this.$i18n.t('search.slow');
          }
        }

        case 'durationRange': {
          if (!data.value) {
            return '';
          }

          const value = data.value.toString();

          const [min, max] = value.split('-');

          const stringSeconds = this.$i18n.t('search.seconds');
          const minString = `${min}${stringSeconds}`;
          const maxString = `${max}${stringSeconds}`;

          // Shorter than 20s
          if (min === '*') {
            return this.$i18n.t('search.less_than', { '0': maxString });
          }
          // 120s or longer
          if (max === '*') {
            return this.$i18n.t('search.or_more', { '0': minString });
          }

          return `${minString} - ${maxString}`;
        }


        case 'polygon': {
          if (!data.value) {
            return '';
          }

          const value = data.value.toString();

          const [min, max] = value.split('-');

          // Shorter than *
          if (min === '*') {
            return this.$i18n.t('search.less_than', { '0': max });
          }
          // * or longer
          if (max === '*') {
            return this.$i18n.t('search.or_more', { '0': min });
          }

          return `${min} - ${max}`;
        }

        case 'category':
        case 'genre':
        case 'mood':
        case 'style':
        case 'type':
        case 'instrument':
        {
          if (_.has(data, 'name')) {
            return data.name;
          }

          const map = this.$store.getters['search/getFieldSchema'](field);

          if (map) {
            const taxonomy = map.find(x => x.id === data.value.toString());

            if (taxonomy) {
              return taxonomy.name;
            }
          }

          return data.value;
        }

        case 'priceRange': {
          const value = data.value.toString();

          if (['-1'].includes(value)) {
            return this.$i18n.t('search.price_free');
          }

          const split = value.split('-');

          const min = split[0];
          const max = split.length > 1 ? split[1] : null;

          const isOnePrice = split.length === 1;

          const priceLow = min && min !== '*' ? parseInt(min, 10) : null;

          const priceHigh = max && max !== '*' ? parseInt(max, 10) : null;

          let fxRate = 1;
          let currencyCode = 'USD';

          // fallback to USD
          if (this.userCurrency !== 'USD') {
            if (this.mixinCurrencyFxRate) {
              fxRate = this.mixinCurrencyFxRate;
              currencyCode = this.userCurrency;
            } else {
              currencyCode = 'USD';
            }
          }

          const moneyLow = priceLow
            ? Money({ amount: priceLow * fxRate, currency: currencyCode })
            : null;

          if (isOnePrice) {
            return moneyLow.toFormat('$0');
          }

          const moneyHigh = priceHigh
            ? Money({ amount: priceHigh * fxRate, currency: currencyCode })
            : null;

          // Less then US$ 20
          if (min === '*') {
            return this.$i18n.t('search.less_than', { '0': moneyHigh.toFormat('$0') });
          }
          // US$ 40 or more
          if (max === '*') {
            return this.$i18n.t('search.or_more', { '0': moneyLow.toFormat('$0') });
          }

          return `${moneyLow.toFormat('$0')} - ${moneyHigh.toFormat('$0')}`;
        }

        case 'resolution':
          return data.value.toUpperCase();

        case 'format':
          // trim away trailing '1'
          return data.value.replace(/[1]$/, '').toUpperCase();

        case 'softwareVersion':
          if (isProductType('resolve', mediaType)) {
            return _.get(data, 'name') || data.value;
          }

          return this.$i18n.t('search.{version}_and_below', { version: _.get(data, 'name') || data.value });

        default:
          return _.get(data, 'name') || data.value;
      }
    },
  },
};
