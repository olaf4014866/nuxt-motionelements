<template>
  <div class="flex-grow-1 hero-home-buttons">
    <div class="d-flex align-items-stretch">
      <HeroHomeButton
        :iconName="'after-effects'"
        :link="$siteUrl('after-effects-templates').router().url()"
        :title="$term('mediaType', 'ae').seo().text()"
        :lead="$t('channel_ae.page_subheading')"
      >
        <span v-html="$term('mediaType', 'ae').html()"></span>
      </HeroHomeButton>
      <HeroHomeButton
        :iconName="'video'"
        :link="$siteUrl('video').router().url()"
        :title="$term('mediaType', 'video').seo().text()"
        :lead="$t('channel_video.page_subheading', {
          total: `<span class='text-gradient-primary font-weight-bold'>${$t('total.video')}</span>`,
          product1: $t('channel_video.4k_stock_footage'),
          product2: $t('channel_video.hd_clips'),
          product3: `<a :href='/animation'>${$t('channel_animation.animated_backgrounds')}</a>`
        })"
      >
        <span v-html="$term('mediaType', 'video').html()"></span>
      </HeroHomeButton>
    </div>

    <div class="d-flex align-items-stretch">
      <HeroHomeButton
        :iconName="'music'"
        :link="$siteUrl('music').router().url()"
        :title="$term('mediaType', 'music').seo().text()"
        :lead="$t('channel_music.page_subheading', {
          product1: $t('channel_music.bgm_music'),
          product2: $term('mediaType', 'sfx').html(),
          total: `<span class='text-gradient-primary font-weight-bold'>` + $t('total.music') + `</span>`
        })"
      >
        <span v-html="$term('mediaType', 'music').short().html()"></span>
      </HeroHomeButton>
      <HeroHomeButton
        :iconName="'premiere-pro'"
        :link="$siteUrl('premiere-pro-templates').router().url()"
        :title="$term('mediaType', 'pr').seo().text()"
        :lead="$t('channel_pr.page_subheading')"
      >
        <!-- Premiere Pro <wbr>テンプレート -->
        <span v-html="$term('mediaType', 'pr').html()"></span>
      </HeroHomeButton>
      <HeroHomeButton
        :iconName="'image'"
        :link="$siteUrl('stock-image').router().url()"
        :title="$term('mediaType', 'image').seo().text()"
        :lead="$t('channel_image.page_subheading')"
      >
        <span v-html="$term('mediaType', 'image').short().html()"></span>
      </HeroHomeButton>
    </div>

    <div class="d-flex align-items-stretch">
      <HeroHomeButton
        :iconName="'apple-motion'"
        :link="$siteUrl('apple-motion-templates').router().url()"
        :title="$term('mediaType', 'fcp').seo().text()"
        :lead="$t('channel_fcp.page_subheading', {
          product1: $t('channel_fcp.motion5_templates'),
          product2: $t('channel_fcp.final_cut_pro_templates'),
          total: `<span class='text-gradient-primary font-weight-bold'>` + $t('total.fcp') + `</span>`
        })"
      >
        <span v-html="$term('mediaType', 'fcp').short().html()"></span>
      </HeroHomeButton>
      <HeroHomeButton
        :iconName="'sfx'"
        :link="$siteUrl('sound-effects').router().url()"
        :title="$term('mediaType', 'sfx').seo().text()"
        :lead="$t('channel_sfx.page_subheading')"
      >
        <span v-html="$term('mediaType', 'sfx').short().html()"></span>
      </HeroHomeButton>
      <HeroHomeButton
        :iconName="'3d-model'"
        :link="$siteUrl('3d-model').router().url()"
        :title="$term('mediaType', '3d_model').seo().text()"
        :lead="$t('channel_3d.page_subheading')"
      >
        <span v-html="$term('mediaType', '3d_model').short().html()"></span>
      </HeroHomeButton>
      <HeroHomeButton
        :iconName="'lottie'"
        :link="$siteUrl('lottie').router().url()"
        :title="$term('mediaType', 'lottie').seo().text()"
        :lead="$t('channel_lottie.page_heading')"
      >
        <span v-html="$term('mediaType', 'lottie').short().html()"></span>
      </HeroHomeButton>
    </div>
  </div>
</template>

<script>
import HeroHomeButton from '@/components/modules/landingpages/hero/HeroHomeButton.vue';

export default {
  name: 'hero-home',
  components: {
    HeroHomeButton,
  },
};
</script>

<style lang="scss" scoped>
.hero-home-buttons {
  @include media-breakpoint-up(lg) {
    min-width: 50%;
  }
}

.btn-mt {
  line-height: 1.5;

  flex-basis: 0;
  transition: background-color 0.2s ease;
  margin-bottom: map-get($spacers,3);

  @include media-breakpoint-up(md) {
    min-height: 4rem;

    &:not(:first-child) {
      margin-left: map-get($spacers,2);
    }
    &:not(:last-child) {
      margin-right: map-get($spacers,2);
    }
  }

  @include media-breakpoint-down(sm) {
    &:not(:first-child) {
      margin-left: map-get($spacers,1);
    }
    &:not(:last-child) {
      margin-right: map-get($spacers,1);
    }
  }

  &:hover {
    box-shadow: $box-shadow !important;
  }
}
.fa-mt {
  line-height: 1.5rem;
}

.text-mt {
  @include media-breakpoint-down(sm) {
    font-size: $font-size-sm;
  }
}

// COLORS
.btn-mt {
  &:hover {
    background: map-get(map-get($theme-colors-variants,"light"),"1") !important;

    .ui-dark & {
      background: map-get(map-get($theme-colors-variants,"dark"),"-1") !important;
    }
  }
}

</style>
