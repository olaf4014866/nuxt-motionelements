<template>
  <section>
    <div class="container pt-3 px-sm-0 mb-3">
    <!-- CHANNEL VIDEO -->
      <div class="d-flex flex-column flex-md-row" v-if="channel === 'video' || channel === 'animation'">
        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','gem']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6>{{ $t('usp.content_partners_heading') }}</h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.content_partners_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-unlimited']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <!-- <h6><a :href="`https://help.motionelements.com/hc${hcLang}/articles/206279362`" >{{ $t('usp.rf_heading') }}<i class="far fa-fw me-bmt icon-chevron-right"></i></a></h6> -->
            <h6>
              <a :href="$site('https://help.motionelements.com/hc/articles/206279362').url()" >
                {{ $t('usp.rf_heading') }} <i class="far me-bmt icon-chevron-right"></i>
              </a>
            </h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.rf_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-search-ai']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6>
              <a :href="$siteUrl('/visualsearch').www().url()">
                {{ $t('usp.ai')}} ・ {{ $t('usp.visual_search_heading') }} <i class="far me-bmt icon-chevron-right"></i>
              </a>
            </h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.visual_search_subheading')"></p>
          </template>
        </IconWithTextHorizontal>
      </div>

    <!-- CHANNEL MUSIC -->
      <div class="d-flex flex-column flex-md-row" v-if="channel === 'music'">
        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','filter']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6>
              <a data-toggle="modal" href="#modalExpandedFilters">
                <span v-html="$t('usp.music_filters_heading')"></span>&nbsp;<i class="far me-bmt icon-chevron-right"></i>
              </a>
            </h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.music_filters_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <!-- Expanded Music Filters Explanation Modal -->
        <div class="modal fade" id="modalExpandedFilters" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title cjk-word-break" v-html="$t('usp.music_filters_heading')"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-center">
                <img
                  :src="`https://static.motionelements.com/img/music/music-instrument-${lang}.170905.gif`"
                  class="img-fluid"
                >
                <p v-html="$t('usp.music_filters_subheading')"></p>
              </div>
            </div>
          </div>
        </div>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-unlimited']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a data-toggle="modal" href="#modalTransparentLicensing">{{ $t('usp.rf_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.music_pro_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <!-- Transparent Licensing Modal -->
        <div class="modal fade" id="modalTransparentLicensing" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ $t('usp.rf_heading') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-center">
                <img
                  :src="`https://static.motionelements.com/img/music/music-nonpro-${lang}.170905.gif`"
                  class="img-fluid"
                >
                <p v-html="$t('usp.music_pro_subheading')"></p>
              </div>
            </div>
          </div>
        </div>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-search-ai']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$siteUrl(`/audiosearch`).www().url()">{{ $t('usp.ai')}} ・ {{ $t('usp.audio_search_heading')}} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p>{{ $t('usp.audio_search_subheading') }}</p>
          </template>
        </IconWithTextHorizontal>
      </div>

    <!-- CHANNEL AE -->
      <div class="d-flex flex-column flex-md-row" v-if="channel === 'ae'">
        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-unlimited']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/206279362').url()" >{{ $t('usp.rf_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.rf_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-ae-univers']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/115000075941').url()">{{ $t('usp.universalized_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.universalized_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','music']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/115000076161').url()">{{ $t('usp.music_recommendation_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.music_recommendation_subheading')"></p>
          </template>
        </IconWithTextHorizontal>
      </div>

    <!-- CHANNEL AE -->
      <div class="d-flex flex-column flex-md-row" v-if="channel === 'resolve'">
        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-unlimited']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/206279362').url()" >{{ $t('usp.rf_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.rf_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-easy']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6>{{ $t('usp.easy_to_customize_heading') }}</h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.easy_to_customize_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','music']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/115000076161').url()">{{ $t('usp.music_recommendation_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.music_recommendation_subheading')"></p>
          </template>
        </IconWithTextHorizontal>
      </div>

    <!-- CHANNEL PREMIERE PRO -->
      <div class="d-flex flex-column flex-md-row" v-if="channel === 'pr'">
        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-unlimited']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/206279362').url()" >{{ $t('usp.rf_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.rf_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-save-money']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6>{{ $t('usp.most_affordable') }}</h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.download_from_just_{price}', {'price': '$9'})"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-easy']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6>{{ $t('usp.easy_to_customize_heading') }}</h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.easy_to_customize_subheading')"></p>
          </template>
        </IconWithTextHorizontal>
      </div>

    <!-- CHANNEL APPLE MOTION -->
      <div class="d-flex flex-column flex-md-row" v-if="channel === 'motion-template'">
        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','me-unlimited']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/206279362').url()" >{{ $t('usp.rf_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.rf_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas','me-fcp-edit']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://www.motionelements.com/blog/announcements/editable-in-final-cut-pro-x-label').url()">{{ $t('usp.editable_in_fcpx_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p class="cjk-word-break" v-html="$t('usp.editable_in_fcpx_subheading')"></p>
          </template>
        </IconWithTextHorizontal>

        <IconWithTextHorizontal class="col col-12 col-md-4 mb-3 align-items-top">
          <template v-slot:icon>
            <font-awesome-icon :icon="['far','music']" fixed-width size="lg" class="text-muted"></font-awesome-icon>
          </template>
          <template v-slot:header>
            <h6><a :href="$site('https://help.motionelements.com/hc/articles/115000076161').url()">{{ $t('usp.music_recommendation_heading') }} <i class="far me-bmt icon-chevron-right"></i></a></h6>
          </template>
          <template v-slot:description>
            <p v-html="$t('usp.music_recommendation_subheading')"></p>
          </template>
        </IconWithTextHorizontal>
      </div>
    </div>
  </section>
</template>
<script>
import IconWithTextHorizontal from '@/components/modules/landingpages/IconWithTextHorizontal.vue';

export default {
  name: 'SectionChannelUsp',
  components: {
    IconWithTextHorizontal,
  },
  props: {
    channel: String,
  },
  computed: {
    lang() {
      const lang = this.$store.getters['site/currentLanguage'];
      return lang;
    },
    hcLang() {
      switch (this.$store.getters['site/currentLanguage']) {
        case 'en':
          return '/en-us';
        case 'ja':
          return '/ja';
        case 'ko':
          return '/ko';
        case 'zh-hant':
          return '/zh-tw';
        default:
          return '';
      }
    },
  },
};
</script>
