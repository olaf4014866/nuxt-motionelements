<template>
  <div class="row justify-content-center buttons-free-products">
    <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/stock-footage').router().url()" v-if="mediatype !== 'video_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-video"></i>
      <template slot="text">
        <!-- 無料<wbr>動画素材 -->
        <span v-html="$term('mediaType', 'video_free').seo().html()"></span>
        </template>
    </ButtonWithIcon>

    <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/after-effects-templates').router().url()" v-if="mediatype !== 'ae_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-after-effects"></i>
      <template slot="text">
        <!-- 無料<wbr>After<wbr> Effects <wbr>テンプレート -->
        <span v-html="$term('mediaType', 'ae_free').seo().html()"></span>
        </template>
    </ButtonWithIcon>

    <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/premiere-pro-templates').router().url()" v-if="mediatype !== 'pr_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-premiere-pro"></i>
      <template slot="text">
        <!-- 無料<wbr> Premiere Pro <wbr>テンプレート -->
        <span v-html="$term('mediaType', 'pr_free').seo().html()"></span>
        </template>
    </ButtonWithIcon>

    <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/fcpx-motion-templates').router().url()" v-if="mediatype !== 'fcp_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-apple-motion"></i>
      <template slot="text">
        <!-- 無料<wbr> Final Cut Pro<wbr> Motion<wbr> テンプレート -->
        <span v-html="$term('mediaType', 'fcp_free').seo().html()"></span>
        </template>
    </ButtonWithIcon>

    <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/background-music').router().url()" v-if="mediatype !== 'music_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-music"></i>
      <template slot="text">
        <!-- フリー<wbr>BGM -->
        <span v-html="$term('mediaType', 'music_free').seo().html()"></span>
        </template>
    </ButtonWithIcon>

    <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/sound-effects').router().url()" v-if="mediatype !== 'sfx_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-sfx"></i>
      <template slot="text">
        <!-- フリー<wbr>無料<wbr>効果音 -->
        <span v-html="$term('mediaType', 'sfx_free').seo().html()"></span>
        </template>
    </ButtonWithIcon>

    <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/gifs').router().url()" v-if="mediatype !== 'gif_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-images"></i>
      <template slot="text">
        <!-- 無料<wbr>GIF<wbr>アニメーション -->
        <span v-html="$term('mediaType', 'gif_free').seo().html()"></span>
        </template>
    </ButtonWithIcon>

    <!-- <ButtonWithIcon class="col-6 col-sm-4 mb-3" :link="$siteUrl('/free/davinci-resolve-templates').router().url()" v-if="mediatype !== 'resolve_free'">
      <i slot="icon" class="fas fa-2x fa-fw me-bmt icon-davinci-resolve"></i>
      <template slot="text">
        <span v-html="$term('mediaType', 'resolve_free').seo().html()"></span>
      </template>
    </ButtonWithIcon> -->
  </div>
</template>
<script>
export default {
  name: 'button-free-products',
  props: {
    mediatype: {
      type: String,
      default: 'video_free',
    },
  },
  components: {
    ButtonWithIcon: () => import('@/components/modules/common/ButtonWithIcon.vue'),
  },
};
</script>
