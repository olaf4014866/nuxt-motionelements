<template>
  <div class="container pt-6">
    <SectionHeader class="mb-5 cjk-word-break" :icon="['far','thumbs-up']">
      <template v-slot:title>
        {{ $t('subscribe.usp_heading') }}
      </template>
    </SectionHeader>
    <div class="row">
      <SvgGradientFill :color="'info'" />
      <IconWithTextVertical class="col col-6 col-lg-3 mb-3">
        <template v-slot:icon>
          <!-- <font-awesome-icon :icon="icon" :class="iconClass" :size="iconSize"></font-awesome-icon> -->
          <font-awesome-layers class="fa-3x">
            <font-awesome-icon :icon="['fal', 'ban']" class="text-gradient-info" />
            <font-awesome-icon :icon="['far', 'dollar-sign']" class="text-gradient-info" transform="shrink-8" />
          </font-awesome-layers>
        </template>
        <template v-slot:header>
          <h3 class="h6">
            {{ $t('subscribe.usp_no_additional_licensing_fees_required') }}
          </h3>
        </template>
      </IconWithTextVertical>

      <IconWithTextVertical class="col col-6 col-lg-3 mb-3" :icon="['fal','me-unlimited']" iconClass="text-gradient-info">
        <template v-slot:header>
          <h3 class="h6">
            {{ $t('subscribe.usp_in_unlimited_projects_forever') }}
          </h3>
        </template>
      </IconWithTextVertical>

      <IconWithTextVertical class="col col-6 col-lg-3 mb-3" :icon="['fal','me-globe-asia']" iconClass="text-gradient-info">
        <template v-slot:header>
          <h3 class="h6">
            {{ $t('subscribe.usp_across_all_media_worldwide') }}
          </h3>
        </template>
      </IconWithTextVertical>

      <IconWithTextVertical class="col col-6 col-lg-3 mb-3" :icon="['fal','tv-retro']" iconClass="text-gradient-info">
        <template v-slot:header>
          <h3 class="h6">
            {{ $t('subscribe.usp_safe_for_commercial_use') }}
          </h3>
        </template>
      </IconWithTextVertical>
    </div>
  </div>
</template>


<script>
import IconWithTextVertical from '@/views/subscribe/IconWithTextVertical';
import SectionHeader from '@/components/ui/page/SectionHeader';

export default {
  name: 'subscription-usp',
  components: {
    IconWithTextVertical,
    SectionHeader,
    SvgGradientFill: () => import('@/components/modules/common/SvgGradientFill.vue'),
  },
};
</script>
