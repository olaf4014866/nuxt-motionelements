<template>
  <div>
    <!-- TODO: should hide <hr /> if there are no content -->
    <hr v-if="featureCount > 0" />
    <div>
      <template v-if="['video', 'image'].includes(mediaTypeGroup)">
        <!-- Editorial Use Only -->
        <FeatureIconsItem v-if="isEditorialUseOnly">
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['far','newspaper']"
            />
          </template>
          <template slot="label">
            {{ $t('product.editorial_use_only') }}
            <a
              :href="$link('https://help.motionelements.com/hc/articles/206279322').url()"
            >
              <font-awesome-icon
                :icon="['fas','external-link-alt']"
                title="More info"
              />
            </a>
          </template>
        </FeatureIconsItem>
      </template>

      <template v-if="softwareRequired">
        <!-- Required AE/Motn Version -->
        <FeatureIconsItem
          v-if="softwareRequired"
        >
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2 text-danger"
              fixed-width
              :icon="softwareIcon"
            />
          </template>
          <template slot="label">
            <strong class="text-danger">{{ $t('product_page.required') }}:</strong>
              <template v-if="softwareRequiredVersionName && !isBackwardCompatible">
                {{ $t('product_page.compatible_with_{software}', {software: softwareRequired.name + ' ' + softwareRequiredVersionName}) }}
              </template>
              <template v-else-if="softwareRequiredVersionName">
                {{ $t('product_page.compatible_with_{version}_and_above', {version: softwareRequired.name + ' ' + softwareRequiredVersionName}) }}
              </template>
              <template v-else>
                {{ $t('product_page.compatible_with_{software}', {software: softwareRequired.name}) }}
              </template>
            <a
              href="#"
              @click.prevent="showCompatibleSoftwareModal()"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              />
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Required Plugins -->
        <!--        <FeatureIconsItem  v-if="Object.keys(element).indexOf('pluginsRequired') > -1">-->
        <FeatureIconsItem  v-if="hasRequiredPlugins === true">
          <template slot="icon">
            <!-- when no need plugin, show banned icon and rotate plugin icon-->
            <font-awesome-layers class="fa-2x mr-2" fixed-width>
              <font-awesome-icon
                :icon="['fad', 'plug']"
                fixed-width
                class="text-danger"
                :transform="!hasRequiredPlugins ? 'shrink-6 rotate-45' : ''"
              />
            </font-awesome-layers>
          </template>
          <template slot="label">
            <strong class="text-danger">{{ $t('product_page.required') }}:</strong> {{ $t('product.plugins_required') }}
            <a
              href="#"
              @click.prevent="showPluginsModal()"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              />
            </a>
          </template>
        </FeatureIconsItem>
        <FeatureIconsItem v-else-if="hasRequiredPlugins === false">
          <template slot="icon">
            <!-- when no need plugin, show banned icon and rotate plugin icon-->
            <font-awesome-layers class="fa-2x mr-2" fixed-width>
              <font-awesome-icon
                :icon="['far', 'ban']"
                fixed-width
              />
              <font-awesome-icon
                :icon="['fas', 'plug']"
                fixed-width
                :transform="!hasRequiredPlugins ? 'shrink-6 rotate-45' : ''"
              />
            </font-awesome-layers>
          </template>
          <template slot="label">
            {{ $t('product.plugins_not_required') }}
          </template>
        </FeatureIconsItem>

        <!-- FCPX Editable -->
        <FeatureIconsItem v-if="isEditableInFcp">
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['fas','me-fcp-edit']"
            />
          </template>
          <template slot="label">
            {{ $t('product_page.text_fcpx_editable') }}
            <a
              href="#"
              @click.prevent="showEditableInFcpModal()"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              />
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Tutorial Available -->
        <FeatureIconsItem v-if="hasVideoTutorial" >
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['far','me-tutorial']"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            {{ $t('product_page.text_tutorial_available') }}
            <a
              href="#"
              @click.prevent="$scrollTo('#section-tutorial')"
            >
              <!-- TODO: add smooth scroll to #tutorial section -->
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              />
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Universalized -->
        <FeatureIconsItem v-if="isUniversalized">
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['far','language']"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            {{ $t('product_page.universalized') }} - {{ $t('product_page.text_compatible_with_all_languages') }}
            <a
              href="#"
              @click.prevent="showUniversalizedModal()"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              />
            </a>
          </template>
        </FeatureIconsItem>
      </template>

      <template v-if="isVr">
        <!-- VR Software Warning -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2 text-danger"
              fixed-width
              :icon="['fad','vr-cardboard']"
            />
            <!-- video: me-vr-video | image: me-vr-image -->
          </template>
          <template slot="label">
            <!-- video: '360° Video' | image: '360° Photo' -->
            <strong class="text-danger">{{ $t('product_page.required') }}:</strong> {{ $t('product_page.required_vr_software') }}
          </template>
        </FeatureIconsItem>

        <!-- VR Type: Video or Image -->
        <!-- TODO: Need to implement when added to API -->
        <!--       Only show for VR Elements -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['far',`me-vr-${vrType}`]"
            />
            <!-- video: me-vr-video | image: me-vr-image -->
          </template>
          <template slot="label">
            <!-- video: '360° Video' | image: '360° Photo' -->
            360° {{ _.upperFirst(vrType) }}
          </template>
        </FeatureIconsItem>

        <!-- VR Type: Stereo or Mono -->
        <!-- TODO: Need to implement when added to API -->
        <!--       Only show for VR Elements -->
        <FeatureIconsItem v-if="_.get(details, 'viewingField') === 'stereoscopic'">
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['far','me-vr-stereo']"
            />
            <!-- stereo: 'me-vr-stereo' | mono: 'me-vr-mono' -->
          </template>
          <template slot="label">
            <!-- stereo: 'Stereo 3D' | mono: 'Mono 2D' -->
            {{ $t('product.vr_stereo_3d') }}
          </template>
        </FeatureIconsItem>
        <FeatureIconsItem v-else-if="_.get(details, 'viewingField') === 'monoscopic'">
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['far','me-vr-mono']"
            ></font-awesome-icon>
            <!-- stereo: 'me-vr-stereo' | mono: 'me-vr-mono' -->
          </template>
          <template slot="label">
            <!-- stereo: 'Stereo 3D' | mono: 'Mono 2D' -->
            {{ $t('product.vr_mono') }}
          </template>
        </FeatureIconsItem>
      </template>

      <template v-if="isMusic">
        <!-- Only show for music -->
        <!-- P.R.O. or non-P.R.O -->
        <FeatureIconsItem v-if="isPro !== null">
          <template slot="icon">
            <font-awesome-icon
              size="2x"
              class="mr-2"
              fixed-width
              :icon="['far',`me-${isPro ? 'pro' : 'non-pro'}-rectangle`]"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            {{ isPro ? $t('product.pro') : $t('product.non_pro') }}
            <a href="#"
               @click.prevent="showMusicProModal()"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Loopable or not loopable -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-layers class="fa-2x mr-2" fixed-width>
              <font-awesome-icon
                v-if="!isLoopable"
                :icon="['far', 'ban']"
                fixed-width
              />
              <font-awesome-icon
                :icon="['fas', 'undo']"
                fixed-width
                :transform="true ? 'shrink-8' : ''"
              />
            </font-awesome-layers>
          </template>
          <template slot="label">
            {{ isLoopable ? $t('product.loopable') : $t('product.non_loopable') }}
          </template>
        </FeatureIconsItem>
      </template>

      <template v-if="['3d'].includes(mediaTypeGroup)">

        <!-- Polygon -->
        <FeatureIconsItem v-if="_.get(details, 'geometry')">
          <template slot="icon">
            <font-awesome-icon
              :icon="['far', 'me-polygon']"
              fixed-width
              size="2x"
              class="mr-2"
              title="Geometry"
            />
          </template>
          <template slot="label" v-if="details.geometry">
            <strong>{{ details.geometry | capitalize }}</strong>
            <template v-if="_.get(details, 'polygons') > 0">,
              <strong>{{ formatNumber(details.polygons) }}</strong>
              {{ $t('product.polygons') }}
            </template>
          </template>
        </FeatureIconsItem>

        <!-- Vertices -->
        <FeatureIconsItem v-if="_.get(details, 'vertices') > 0">
          <template slot="icon">
            <font-awesome-icon
              :icon="['far', 'me-vertices']"
              fixed-width
              size="2x"
              class="mr-2"
              title="Vertices"
            />
          </template>
          <template slot="label">
            <strong>{{ formatNumber(details.vertices) }}</strong>
            {{ $t('product.vertices') }}
          </template>
        </FeatureIconsItem>

        <!-- Animated -->
        <FeatureIconsItem v-if="isAnimated">
          <template slot="icon">
            <font-awesome-icon
              :icon="['far', 'me-animated']"
              fixed-width
              size="2x"
              class="mr-2"
              title="Vertices"
            />
          </template>
          <template slot="label">
            {{ $t('product.animated') }}
          </template>
        </FeatureIconsItem>

        <FeatureIconsItem v-if="isRigged">
          <template slot="icon">
            <font-awesome-icon
              :icon="['far', 'me-rigged']"
              fixed-width
              size="2x"
              class="mr-2"
              title="Vertices"
            />
          </template>
          <template slot="label">
            {{ $t('product.rigged') }}
          </template>
        </FeatureIconsItem>
      </template>

    </div>
  </div>
</template>


<script>
import {
  isProductType,
  getMediaTypeGroup,
} from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'cta-feature-icons',
  data() {
    return {
      featureCount: 0,
    };
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  components: {
    FeatureIconsItem: () => import('@/views/product/element/cta/FeatureIconsItem.vue'),
  },
  computed: {
    details() {
      return this.element.mediaTypeDetails;
    },
    usageRights() {
      return this.element.usageRights;
    },
    isEditorialUseOnly() {
      return _.get(this.usageRights, 'license') === 'editorial_use_only';
    },
    isPro() {
      // important info, use _.get
      // don't display if null or undefined
      const v = _.get(this.usageRights, 'pro');
      return v === true || v === false ? v : null;
    },
    isLoopable() {
      // defaults to loop: false
      return !!this.details.loop;
    },
    isEditableInFcp() {
      return this.element.mediaType === 'motion_template' && _.get(this.details, 'editableInFcp', null);
    },
    hasRequiredPlugins() {
      const v = _.get(this.details, 'pluginsRequired');
      if (v === false) {
        return false;
      }
      if (!_.isEmpty(v)) {
        return true;
      }
      return null;
    },
    hasVideoTutorial() {
      if (_.has(this.element, 'tutorials')) {
        return this.element.tutorials.find(x => x.format === 'video');
      }
      return false;
    },
    mediaTypeGroup() {
      return getMediaTypeGroup(this.element.mediaType);
    },
    isVideoTemplate() {
      return isProductType('video_template', this.element.mediaType);
    },
    isVr() {
      return isProductType('vr', this.element.mediaType);
    },
    isMusic() {
      return this.element.mediaType === 'music';
    },
    pluginsRequired() {
      return _.get(this.details, 'pluginsRequired', null);
    },
    // end by marksun
    requiredPlugins() {
      if (this.element.mediaTypeDetails.pluginsRequired) {
        return this.element.mediaTypeDetails.pluginsRequired;
      }
      return false;
    },
    softwareRequired() {
      if (isProductType('video_template', this.element.mediaType)
      || this.element.mediaType === 'lottie'
      ) {
        return _.get(this.details, 'softwareRequired', null);
      }
      return null;
    },
    softwareRequiredVersionName() {
      return _.get(this.softwareRequired, 'versionName') || '';
    },
    softwareIcon() {
      switch (true) {
        case isProductType('ae', this.element.mediaType):
          return ['fas', 'me-after-effects-square'];

        case isProductType('pr', this.element.mediaType):
          return ['fas', 'me-adobe-premiere-pro'];

        case isProductType('motion_template', this.element.mediaType):
          return ['fas', 'me-apple-motion'];

        case isProductType('resolve', this.element.mediaType):
          return ['fas', 'me-davinci-resolve'];

        default:
          return ['fas', 'exclamation-triangle'];
      }
    },
    /*
    softwareRequiredIcon() {
      const software = this.softwareRequired;

      if (!software) {
        return '';
      }

      let iconName = _.get(software, 'versionName') || '';

      const versionNumber = _.toString(_.get(software, 'versionNumber', ''));

      const majorVersion = versionNumber.split('.')[0];

      if (this.element.mediaType === 'motion_template') {
        return `mtn${majorVersion}`;
      }

      if (isProductType('resolve', this.element.mediaType)) {
        return `dr-${majorVersion}`;
      }

      iconName = iconName.replace('.', '_').replace(/\s/g, '').toLowerCase();

      if (isProductType('ae', this.element.mediaType) || isProductType('pr', this.element.mediaType)) {
        // CC
        // fadMeCc14,
        // fadMeCc15,
        // fadMeCc17,
        // fadMeCc18,
        // fadMeCc19,
        // fadMeCc20,
        if (iconName.indexOf('cc') === 0) {
          iconName = iconName.split('_')[0];
          // get last 2 yy digits
          return `cc${iconName.substring(iconName.length - 2, iconName.length)}`;
        }

        // fadMeCs3,
        // fadMeCs4,
        // fadMeCs5,
        // fadMeCs55,
        // fadMeCs6,
        if (iconName.indexOf('cs') === 0) {
          // change cs5.5 to cs55
          return iconName.replace('_', '');
        }
      }

      return iconName;
    },
     */
    isBackwardCompatible() {
      return !!_.get(this.softwareRequired, 'backwardCompatible');
    },
    isUniversalized() {
      return _.get(this.details, 'universalized', null);
    },
    // isTutorial() {
    //   if (this.element.tutorials) {
    //     return this.element.tutorials.find(x => x.format === 'video');
    //   }
    //   return false;
    // },
    // new 3d attributes
    isAnimated() {
      return _.get(this.details, 'animated', null);
    },
    isRigged() {
      return _.get(this.details, 'rigged', null);
    },
    vrType() {
      switch (this.element.mediaType) {
        case 'video_vr':
          return 'video';
        case 'photo_vr':
          return 'photo';
        default:
          return false;
      }
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    updateCount() {
      // count the number of occurrence of component <FeatureIconsItem>
      // - get all child components
      // - filter by name of component === 'feature-icons-item' set in FeatureIconsItem.vue
      this.featureCount = this.$children.filter(child => child.constructor.options.name === 'feature-icons-item').length;
    },
    dispatchShowModal(modalComponent) {
      this.$store.dispatch('modal/show', {
        component: modalComponent,
        props: {
          element: this.element,
        },
      });
    },
    showCompatibleSoftwareModal() {
      const modal = () => ({
        component: import('@/views/product/modals/CompatibleSoftware.vue'),
      });
      this.dispatchShowModal(modal);
    },
    showEditableInFcpModal() {
      const modal = () => ({
        component: import('@/views/product/modals/EditableInFcp.vue'),
      });
      this.dispatchShowModal(modal);
    },
    showMusicProModal() {
      const modal = () => ({
        component: import('@/views/product/modals/MusicPro.vue'),
      });
      this.dispatchShowModal(modal);
    },
    showPluginsModal() {
      const modal = () => ({
        component: import('@/views/product/modals/Plugins.vue'),
      });
      this.dispatchShowModal(modal);
    },
    showUniversalizedModal() {
      const modal = () => ({
        component: import('@/views/product/modals/Universalized.vue'),
      });
      this.dispatchShowModal(modal);
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
  },
  mounted() {
    this.updateCount();
  },
  updated() {
    this.updateCount();
  },
};
</script>
