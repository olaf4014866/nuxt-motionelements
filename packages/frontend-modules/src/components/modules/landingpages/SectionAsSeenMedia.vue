<template>
  <section class="section-media">
    <div class="container py-5" v-if="$i18n.locale === 'zh-hant'">
      <div class="text-center">
        <h3 class="media-headings h6">客戶 & 合作夥伴</h3>
      </div>
      <FlickityWrapper :padding="true" :flickityOptions="{ contain: true , cellAlign: 'center', draggable: false, autoPlay: 3000, groupCells: true}">
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="Bnext 數位時代" alt="Bnext 數位時代" src="https://static.moele.me/img/media/logo-bnext.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="createlife" alt="createlife" src="https://static.moele.me/img/media/logo-createlife.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="寶悍運動" alt="寶悍運動" src="https://static.moele.me/img/media/logo-pcg-bros.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="映CG" alt="映CG" src="https://static.moele.me/img/media/logo-incg.png?w=140&auto=format&q=85"/>
        </div>
      </FlickityWrapper>
    </div>
    <div class="container py-5" v-if="$i18n.locale === 'ja'">
      <div class="text-center">
        <h3 class="media-headings h6">ご利用企業＆パートナー</h3>
      </div>
      <FlickityWrapper :padding="true" :flickityOptions="{ contain: true , cellAlign: 'center', draggable: false, autoPlay: 3000, groupCells: true}">
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="Nomura" alt="Nomura" src="https://static.moele.me/img/media/logo-nomura.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <!-- <img class="img-fluid" title="ボーンデジタル" alt="ボーンデジタル" src="https://static.moele.me/img/media/logo-borndigital-600x338.png?w=140&auto=format&q=85"/> -->
          <img class="img-fluid" title="ボーンデジタル" alt="ボーンデジタル" src="https://static.moele.me/img/media/logo-borndigital.png?w=140&h=90&fit=fill&fill=solid&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="Digital Hollywood University" alt="Digital Hollywood University" src="https://static.moele.me/img/media/logo-dhu.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="Dronetimes" alt="Dronetimes" src="https://static.moele.me/img/media/logo-dronetimes.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="After Effects Style" alt="After Effects Style" src="https://static.moele.me/img/media/logo-aestyle.png?w=140&auto=format&q=85"/>
        </div>
      </FlickityWrapper>
    </div>
    <div class="container py-5">
      <div class="text-center">
        <h3 class="media-headings h6">{{ $t('channel.media_heading') }}</h3>
      </div>
      <FlickityWrapper :padding="true" :flickityOptions="{ contain: true , cellAlign: 'center', draggable: false, autoPlay: 3000, groupCells: true}">
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="Tech In Asia" alt="Tech In Asia" src="https://static.moele.me/img/media/logo-techinasia.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="The Bridge" alt="The Bridge" src="https://static.moele.me/img/media/logo-thebridge.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2">
          <img class="img-fluid" title="Venture Square" alt="Venture Square" src="https://static.moele.me/img/media/logo-venturesquare.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2" v-if="$i18n.locale !== 'zh-hant'">
          <img class="img-fluid" title="Video Salon" alt="Video Salon" src="https://static.moele.me/img/media/logo-videosalon.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2" v-if="$i18n.locale !== 'zh-hant'">
          <img class="img-fluid" title="ProNews" alt="ProNews" src="https://static.moele.me/img/media/logo-pronews.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2" v-if="$i18n.locale === 'zh-hant'">
          <img class="img-fluid" title="DV Asia" alt="DV Asia" src="https://static.moele.me/img/media/logo-dv-asia.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2" v-if="$i18n.locale === 'zh-hant'">
          <img class="img-fluid" title="麥點子" alt="麥點子" src="https://static.moele.me/img/media/logo-mydesy.png?w=140&auto=format&q=85"/>
        </div>
        <div class="carousel-cell col-6 col-sm-4 col-md-3 col-lg-2" v-if="$i18n.locale === 'zh-hant'">
          <img class="img-fluid" title="關鍵評論網" alt="關鍵評論網" src="https://static.moele.me/img/media/logo-thenewslens.png?w=140&auto=format&q=85"/>
        </div>
      </FlickityWrapper>
    </div>
  </section>
</template>
<script>
import FlickityWrapper from '@/components/modules/common/FlickityWrapper.vue';

export default {
  name: 'SectionAsSeenMedia',
  components: {
    FlickityWrapper,
  },
};
</script>

<style lang="scss" scoped>
.section-media {
  background: $white;
}

.media-headings {
  color: $headings-color;
}
</style>
