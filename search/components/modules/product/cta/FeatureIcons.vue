<template>
  <div>
    <!-- TODO: should hide <hr /> if there are no content -->
    <hr v-if="featureCount > 0" />

    <div>
      <template v-if="isVideo">
        <!-- Editorial Use Only -->
        <FeatureIconsItem
          v-if="this.element.isEditorial"
        >
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far','newspaper']"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            Editorial Use Only
            <a
              href="https://help.motionelements.com/hc/ja/articles/206279322"
            >
              <font-awesome-icon
                :icon="['fas','external-link-alt']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>
      </template>

      <template v-if="isTemplate">
        <!-- Required AE/Motn Version -->
        <FeatureIconsItem
          v-if="requiredVersion"
        >
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far',`me-${requiredVersionIcon}`]"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            {{`${softwareTypeLabel} ${_.toUpper(requiredVersion)}`}}とそれ以上に対応
            <a
              :href="$site('https://www.motionelements.com/product/compatible?id=9069741-1188168').url()"
              @click.prevent="helperClick('required-version')"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Required Plugins -->
        <!-- TODO: Check when required_plugins returns actual array of required plugins -->
        <FeatureIconsItem
          v-if="requiredPlugins"
        >
          <template slot="icon">
            <font-awesome-layers class="fa-lg mr-2" fixed-width>
              <font-awesome-icon
                v-if="requiredPlugins[0] === '-1'"
                :icon="['far', 'ban']"
                fixed-width
              />
              <font-awesome-icon
                :icon="['fas', 'plug']"
                fixed-width
                :transform="requiredPlugins[0] === '-1' ? 'shrink-6 rotate-45' : ''"
              />
            </font-awesome-layers>
          </template>
          <template slot="label">
            プラグインは必要ありません
            <a
              v-if="requiredPlugins[0] !== '-1'"
              href="#"
              @click.prevent="helperClick('no-required-plugins')"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>
        <FeatureIconsItem
          v-else
        >
          <template slot="icon">
            <font-awesome-layers class="fa-lg mr-2" fixed-width>
              <font-awesome-icon
                v-if="requiredPlugins[0] === '-1'"
                :icon="['far', 'ban']"
                fixed-width
              />
              <font-awesome-icon
                :icon="['fas', 'plug']"
                fixed-width
                :transform="requiredPlugins[0] === '-1' ? 'shrink-6 rotate-45' : ''"
              />
            </font-awesome-layers>
          </template>
          <template slot="label">
            {{ $t('cta.required_plugin' ) }}
            <a
              v-if="requiredPlugins[0] !== '-1'"
              href="#"
              @click.prevent="helperClick('required-plugins')"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>

        <!-- FCPX Editable -->
        <!-- TODO: Need to implement when added to API -->
        <FeatureIconsItem
          v-if="element.mediaType === 'motion-template'"
        >
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['fas','me-fcp-edit']"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            Final Cut Pro Xで編集可能
            <a
              v-if="requiredPlugins[0] !== '-1'"
              href="#"
              @click.prevent="helperClick('fcpx-editable')"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Tutorial Available -->
        <!-- TODO: Need to implement when added to API -->
        <FeatureIconsItem
        >
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far','me-tutorial']"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            チュートリアル閲覧可能
            <a
              v-if="requiredPlugins[0] !== '-1'"
              href="#tutorial"
            >
              <!-- TODO: add smooth scroll to #tutorial section -->
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Universalized -->
        <!-- TODO: Need to implement when added to API -->
        <FeatureIconsItem
        >
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far','language']"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            すべての言語に対応
            <a
              v-if="requiredPlugins[0] !== '-1'"
              href="#"
              @click.prevent="helperClick('template-universalized')"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Simple & Easy -->
        <!-- <FeatureIconsItem
        >
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far','me-easy']"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            シンプル&amp;簡単テンプレート
          </template>
        </FeatureIconsItem> -->
      </template>

      <template v-if="isVr">
        <!-- VR Software Warning -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far','vr-cardboard']"
            ></font-awesome-icon>
            <!-- video: me-vr-video | image: me-vr-image -->
          </template>
          <template slot="label">
            <!-- video: '360° Video' | image: '360° Photo' -->
            必須: VR対応ソフトウェアまたはプラグイン
          </template>
        </FeatureIconsItem>

        <!-- VR Type: Video or Image -->
        <!-- TODO: Need to implement when added to API -->
        <!--       Only show for VR Elements -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far',`me-vr-${isVr}`]"
            ></font-awesome-icon>
            <!-- video: me-vr-video | image: me-vr-image -->
          </template>
          <template slot="label">
            <!-- video: '360° Video' | image: '360° Photo' -->
            360° {{ _.upperFirst(isVr) }}
          </template>
        </FeatureIconsItem>

        <!-- VR Type: Stereo or Mono -->
        <!-- TODO: Need to implement when added to API -->
        <!--       Only show for VR Elements -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far','me-vr-stereo']"
            ></font-awesome-icon>
            <!-- stereo: 'me-vr-stereo' | mono: 'me-vr-mono' -->
          </template>
          <template slot="label">
            <!-- stereo: 'Stereo 3D' | mono: 'Mono 2D' -->
            Stereo 3D
            <a
              v-if="requiredPlugins[0] !== '-1'"
              href="#"
              @click.prevent="helperClick('vr-scopic')"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>
      </template>

      <template v-if="this.element.mediaType === 'music'">
        <!-- Only show for music -->
        <!-- P.R.O. or non-P.R.O -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-icon
              size="lg"
              class="mr-2"
              fixed-width
              :icon="['far',`me-${this.element.isPro ? 'pro' : 'non-pro'}-rectangle`]"
            ></font-awesome-icon>
          </template>
          <template slot="label">
            {{ this.element.isPro ? 'P.R.O. Registered' : 'Non-P.R.O. Registered' }}
            <a
              v-if="requiredPlugins[0] !== '-1'"
              href="#"
              @click.prevent="helperClick('music-pro')"
            >
              <font-awesome-icon
                :icon="['fas','info-circle']"
                title="More info"
              ></font-awesome-icon>
            </a>
          </template>
        </FeatureIconsItem>

        <!-- Loopable or not loopable -->
        <!-- TODO: Need to implement when added to API -->
        <!--       Only show for music -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-layers class="fa-lg mr-2" fixed-width>
              <font-awesome-icon
                v-if="true"
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
            Non-Loopable
          </template>
        </FeatureIconsItem>
      </template>
    </div>

  </div>
</template>

<script>
export default {
  name: 'cta-feature-icons',
  data() {
    return {
      featureCount: 0,
    };
  },
  props: {
    element: Object,
  },
  components: {
    FeatureIconsItem: () => import('@/components/modules/product/cta/FeatureIconsItem.vue'),
  },
  computed: {
    versionObj() {
      // Convert the versions into an array of the keys first
      const versions = Object.keys(this.element.versions);

      // Get the object from the first version in the this.element.versions array
      return this.element.versions[versions[0]];
    },
    requiredPlugins() {
      if (this.versionObj && this.versionObj.required_plugins) {
        return this.versionObj.required_plugins;
      }
      return false;
    },
    requiredVersion() {
      if (this.versionObj && this.versionObj.required_version) {
        return this.versionObj.required_version;
      }
      return false;
    },
    requiredVersionIcon() {
      if (this.softwareType === 'motion') {
        const majorVer = this.requiredVersion.split('.')[0];
        return `mtn${majorVer}`;
      }

      let templateVerIcon = this.requiredVersion.replace('.', '_').replace(/\s/g, '');
      if (templateVerIcon.indexOf('cc') === 0) {
        templateVerIcon = templateVerIcon.split('_')[0];
      }
      switch (templateVerIcon) {
        case 'cs3':
        case 'cs4':
        case 'cs5':
        case 'cs5.5':
        case 'cs6':
          return templateVerIcon;
        case 'cc':
        case 'cc2013':
          return 'cc';
        case 'cc2014':
        case 'cc2015':
        case 'cc2017':
        case 'cc2018':
        case 'cc2019':
        case 'cc2020':
          return `cc${templateVerIcon.substring(templateVerIcon.length - 2, templateVerIcon.length)}`;
        default:
          return false;
      }
    },
    softwareType() {
      if (this.element.mediaType.indexOf('ae') === 0) {
        return 'ae';
      }
      if (this.element.mediaType.indexOf('pr') === 0 || this.element.mediaType.indexOf('mg') === 0) {
        return 'pr';
      }
      if (this.element.mediaType.indexOf('motion') === 0) {
        return 'motion';
      }
      return false;
    },
    softwareTypeLabel() {
      switch (this.softwareType) {
        case 'ae':
          return 'After Effects';
        case 'pr':
          return 'Premiere Pro';
        case 'motion':
          return 'Apple Motion';
        default:
          return false;
      }
    },
    isVideo() {
      let mediatype = this.element.mediaType;
      if (mediatype.indexOf('_') < 0) {
        mediatype = _.kebabCase(mediatype);
      }
      switch (mediatype) {
        case 'video-live':
        case 'animation':
          return true;
        default:
          return false;
      }
    },
    isTemplate() {
      let mediatype = this.element.mediaType.replace('_', '-');
      if (mediatype.indexOf('_') < 0) {
        mediatype = _.kebabCase(mediatype);
      }
      switch (mediatype) {
        case 'ae-template':
        case 'ae-preset':
        case 'ae-script':
        case 'motion-template':
        case 'pr-template':
        case 'pr-preset':
        case 'mg-template':
          return true;
        default:
          return false;
      }
    },
    isVr() {
      switch (this.element.mediaType) {
        case 'video-vr':
          return 'video';
        case 'photo-vr':
          return 'photo';
        default:
          return false;
      }
    },
  },
  methods: {
    updateCount() {
      // count the number of occurrence of component <FeatureIconsItem>
      // - get all child components
      // - filter by name of component === 'feature-icons-item' set in FeatureIconsItem.vue
      this.featureCount = this.$children.filter(child => child.constructor.options.name === 'feature-icons-item').length;
    },
    helperClick(modalId) {
      this.$root.$emit('show-modal', modalId);
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

<style lang="scss" scoped>

</style>
