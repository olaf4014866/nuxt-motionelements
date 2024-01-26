<template>
  <div v-if="value !== null">
    <dt class="text-muted">
      {{ label }}
    </dt>
    <dd v-if="'license' === code">
      <a v-if="value === 'royalty_free'"
        :href="`$link('https://help.motionelements.com/hc/articles/206279362').url()`">
        {{ $t('product.royalty_free') }}
        <font-awesome-icon
          :icon="['fas','external-link-alt']"
        />
      </a>
      <a v-else-if="value === 'editorial_use_only'"
        :href="`$link('https://help.motionelements.com/hc/articles/206279322').url()`">
        {{ $t('product.editorial_use_only') }}
        <font-awesome-icon
          :icon="['fas','external-link-alt']"
        />
      </a>
      <a v-else-if="value === 'pro'"
        :href="`$link('https://help.motionelements.com/hc/articles/206375041').url()`">
        {{ $t('product.pro') }}
        <font-awesome-icon
          :icon="['fas','external-link-alt']"
        />
      </a>
    </dd>
    <dd v-else-if="['youtubeContentId'].includes(code)">
      <div v-if="value">
        <a :href="`$link('https://help.motionelements.com/hc/en-us/articles/206279262').url()`">
          <span
            class="badge badge-danger"
            data-toggle="tooltip"
            data-placement="bottom"
          >
            Registered
            <font-awesome-icon
              :icon="['fas','info-circle']"
            />
          </span>
        </a>
      </div>
      <div v-else>
        <span
          class="badge badge-success"
          data-toggle="tooltip"
          data-placement="bottom"
        >
          <font-awesome-icon
            :icon="['fas','check']"
            fixed-width
          />
          {{ $t('product.no') }}
        </span>
      </div>
    </dd>
    <dd v-else-if="['modelRelease', 'propertyRelease'].includes(code)">
      <div v-if="value">
        <span
          class="badge badge-success"
          data-toggle="tooltip"
          data-placement="bottom"
          :title="`Signed ${ code } filed with MotionElements.`"
        >
          <font-awesome-icon
            :icon="['fas','check']"
            fixed-width
          />
          {{ $t('product.yes') }}
        </span>
      </div>
      <div v-else>
        <span class="badge badge-light">
          <font-awesome-icon
            :icon="['fas','times']"
            fixed-width
          />
          {{ $t('product.no') }}
        </span>
      </div>
    </dd>
    <dd v-else-if="code === 'softwareRequired'">
      <template v-if="!_.get(element, 'mediaTypeDetails.softwareRequired.backwardCompatible')">
        {{ value.name + ' ' + (value.versionName || '') }}
      </template>
      <template v-else>
        {{ $t('product_page.{version}_and_above', {version: value.name + ' ' + (value.versionName || '') }) }}
      </template>
    </dd>
    <dd v-else-if="code === 'pluginsRequired'">
      <div v-if="value === false">
        {{ $t('product.no') }}
      </div>
      <div v-else v-for="plugin in value" :key="plugin.id">
        <a v-if="plugin.url" :href="plugin.url">
          {{ plugin.name }}
          <font-awesome-icon
            :icon="['far','external-link']"
          />
        </a>
        <strong v-else>{{ plugin.name }}</strong>
      </div>
    </dd>
    <dd v-else-if="code === 'durations'">
      <div v-for="v in value" :key="v.id">
        {{ `$tools.secondToMinutes(v)` }}
      </div>
    </dd>
    <dd v-else-if="code === 'duration'">
      {{ `$tools.secondToMinutes(value)` }}
    </dd>
    <dd v-else-if="code === 'dimensions'">
          <span v-for="v in value" :key="v.id">
            {{ v.toString() }}
          </span>
    </dd>
    <dd v-else-if="'projection' === code">
      {{ $t(`product.vr_equirectangular`) }}
    </dd>
    <dd v-else-if="'viewingField' === code">
      <span v-if="['mono', 'monoscopic'].includes(value)">
        {{ $t('product.vr_monoscopic') }}
      </span>
      <span v-if="['stereo_3d', 'stereoscopic'].includes(value)">
        {{ $t('product.vr_stereoscopic') }}
      </span>
    </dd>
    <!--        Music-->
    <dd v-else-if="code === 'bpm'">
      {{ value }} BPM
    </dd>
    <dd v-else-if="code === 'audioBitDepth'">
      {{ value }}-bit
    </dd>
    <!--    <dd v-else-if="['composers', 'publishers'].includes(code)">-->
    <!--      <div v-for="v in value" :key="v.id">-->
    <!--        {{ v }}-->
    <!--      </div>-->
    <!--    </dd>-->
    <dd v-else-if="['hasMusic', 'hasSfx', 'hasVideo'].includes(code)">
      {{ value ? $t('product.included') : $t('product.not_included') }}
    </dd>
    <dd v-else-if="isFileSize">
      {{ value }}
    </dd>
    <dd v-else-if="isBoolean">
      {{ value ? $t('product.yes') : $t('product.no') }}
    </dd>
    <dd v-else-if="Array.isArray(value)">
      <div v-for="v in value" :key="v.id">
        {{ v }}
      </div>
    </dd>
    <dd v-else-if="isNumber">
      {{ formatNumber(value) }}
    </dd>
    <dd v-else>
      {{ value }}
    </dd>
  </div>
</template>

<script>
import { humanFileSize } from '@/helpers/file.js';

export default {
  code: 'detail-prop',
  props: {
    code: {
      type: String,
      required: true,
    },
    element: {
      type: Object,
      required: true,
    },
    masterVariant: {
      type: Object,
      required: true,
    },
    schema: {
      type: Object,
      required: true,
    },
  },
  computed: {
    label() {
      return this.schema.label;
    },
    isBoolean() {
      return this.schema.type === 'boolean';
    },
    isFileSize() {
      return this.schema.type === 'fileSize';
    },
    isArray() {
      return !!this.schema.array;
    },
    isNumber() {
      return this.schema.type === 'number';
    },
    value() {
      if (['license', 'youtubeContentId', 'modelRelease', 'propertyRelease', 'allowMusicalWorks'].includes(this.code)) {
        return _.get(this.element.usageRights, this.code);
      }

      if (['textPlaceholders', 'videoPlaceholders', 'logoPlaceholders'].includes(this.code)) {
        const placeholderType = this.code.replace('Placeholders', '');
        const value = _.get(this.element.mediaTypeDetails, `placeholders.${placeholderType}`);
        return value && value > 0 ? value : null;
      }

      if (['hasMusic', 'hasSfx', 'hasVideo'].includes(this.code)) {
        const key = this.code.replace('has', '').toLowerCase();
        return _.get(this.element, `mediaTypeDetails.mediaIncluded[${key}]`) || false;
      }

      if (this.isFileSize) {
        return humanFileSize(this.masterVariant.file.size, 1, false);
      }

      const value = _.get(this.element.mediaTypeDetails, this.code, null);

      // if (Array.isArray(value) && value.length === 0) {
      //   return null;
      // }
      //
      // if (value === 0) {
      //   return null;
      // }

      return value === '' || value === 0 || (Array.isArray(value) && value.length === 0) ? null : value;
      // return value !== '' ? value : null;
    },
  },
  methods: {
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
  },
};
</script>
