<template>
  <section>
    <div class="container py-6">
      <SectionHeader class="mb-5" :icon="['fas','me-motionelements']" iconClass="text-primary">
        <template v-slot:title>
          {{ $t('home.about_heading') }}
        </template>
      </SectionHeader>
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 py-3 bg-light lt rounded">
          <p>{{ $t('home.about_text1') }}</p>
          <p>{{ $t('home.about_text2') }}</p>
          <p>{{ $t('home.about_text3') }}</p>
        </div>
        <!-- <div :class="{'col-12 col-lg-10 py-3 bg-light lt rounded': $route.match('home')}">
          <p>{{ $t('channel_{product}.seo_about_heading')}}</p>
          <p>{{ $t('channel_{product}.seo_about_text_2')}}</p>
          <p>{{ $t('channel_{product}.seo_about_text_3')}}</p>
        </div> -->
      </div>
    </div>
  </section>
</template>
<script>
import SectionHeader from '@/components/modules/landingpages/SectionHeader.vue';

export default {
  name: 'SectionAboutCompany',
  components: {
    SectionHeader,
  },
};
</script>
