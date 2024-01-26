<template>
  <div class="notfound">
    <!--
    <div class="container pt-3">
      <h1>Looking for Something?</h1>
      <p>We are sorry but the page could not be found. The link may be outdated, or you may have entered the address (URL) incorrectly.</p>
      <a class="button" :href="$router.push('/')">back to homepage.</a>
    </div>
    -->
    <section>
      <div class="container py-5 py-md-7">
        <div class="row flex-column flex-sm-row-reverse align-items-center justify-content-center">
          <div class="col-12 col-sm-6 col-lg-4 text-center py-3 h1 text-muted">
            <font-awesome-layers class="fa-3x mr-3">
              <font-awesome-icon :icon="['fad', 'search']" class="text-muted" />
              <font-awesome-icon :icon="['fas', 'question']" class="text-primary" :transform="{ size: 6, x: -1.5, y:-1.5 }" />
            </font-awesome-layers>
          </div>
          <div class="col-10 col-sm-6 col-lg-8">
            <h1 class="h4">
              {{ $t('product_page.not_found_heading') }}
            </h1>
            <p class="lead">
              {{ $t('product_page.not_found_text') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="false">
      <div class="container py-3 mb-5 rounded shadow">
        <SectionProductInfo
          class="section-product-info"
          :isColumn="true"
        >
          <template #heading>
            {{ $t('product_page.here_are_some_similar_elements') }}:
          </template>

          <div class="mb-3">
            <ul class="nav nav-pills" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link small"
                  :class="{ active: isShow === 'similar' }"
                  @click="isShow = 'similar'"
                  id="similar-tab" data-toggle="tab" role="tab" aria-controls="similar" aria-selected="true"
                >
                  {{ $t('cta.similar') }}
                </a>
              </li>
            </ul>
            <div class="tab-content py-3" id="myTabContent">

              <transition name="fade" mode="out-in">
                <template v-if="isShow === 'similar'">
                  <!--
                    TODO fr JZ: Add actual elements -->
                  <div
                    class="tab-pane show active"
                    id="similar"
                    role="tabpanel"
                    aria-labelledby="similar-tab"
                    v-if="similar.length"
                    key="similar"
                  >
                    <ProductWrapper
                      :class="['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'card-element-recommended-music' : 'card-element-recommended'"
                      v-for="element in similar"
                      :key="element.id"
                      :value="element.id"
                      :element="element"
                      :options="{
                        cardType: ['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'list' : 'card',
                        expand: true,
                        favorites: false,
                        checkbox: false,
                        tagsInput: false,
                        // new options
                        enablePlayer: true,
                        hoverEvent: true,
                        showFavoritesIcon: false,
                        showSimilarIcon: false,
                        showMediaTypeBadge: false,
                        layoutDetailExpand: false,
                        layoutCheckbox: false,
                        layoutTagsInput: false,
                      }"
                    ></ProductWrapper>
                    <div>
                      <a
                        href="#"
                        class="btn btn-block btn-simple-secondary"
                      >
                        {{ $t('cta.view_all') }} <font-awesome-icon :icon="['fas','chevron-right']" fixed-width/>
                      </a>
                    </div>
                  </div>
                </template>
              </transition>
            </div>

          </div>

        </SectionProductInfo>
      </div>
    </section>
  </div>
</template>

<script>
const elements = [{
  'object': 'element', 'id': '13826167', 'name': 'Broadcast Lower Thirds', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '9', 'currency': 'USD', 'credits': 9, 'artist': { 'id': '173780', 'username': 'AnimationBro' }, 'mediaType': 'mg_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13836/13826167/f-175920-1762.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13836/13826167_f-175920.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13836/13826167_f-175920.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13836/13826167/f-175920-1762.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13836/13826167_f-175920-s.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13836/13826167_f-175920-s.webm' } }, 'categories': [{ 'id': '1004', 'name': 'Logos', 'type': 'category' }, { 'id': '1008', 'name': 'Text', 'type': 'category' }, { 'id': '395', 'name': 'Flat Design', 'type': 'style' }], 'html': { 'url': 'https://stage.motionelements.com/motion-graphics-template-13826167-broadcast-lower-thirds' },
}, {
  'object': 'element', 'id': '13773819', 'name': 'Rainbow Titles', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '9', 'currency': 'USD', 'credits': 9, 'artist': { 'id': '173780', 'username': 'AnimationBro' }, 'mediaType': 'mg_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13783/13773819/f-173971.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13783/13773819_f-173969.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13783/13773819_f-173969.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13783/13773819/f-173971.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13783/13773819_f-173969-s.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13783/13773819_f-173969-s.webm' } }, 'categories': [{ 'id': '1007', 'name': 'Social Media', 'type': 'category' }, { 'id': '1008', 'name': 'Text', 'type': 'category' }, { 'id': '821', 'name': 'Pop', 'type': 'style' }], 'html': { 'url': 'https://stage.motionelements.com/motion-graphics-template-13773819-rainbow-titles' },
}, {
  'object': 'element', 'id': '13692587', 'name': 'Technological Lower Thirds', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '9', 'currency': 'USD', 'credits': 9, 'artist': { 'id': '173780', 'username': 'AnimationBro' }, 'mediaType': 'mg_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13702/13692587/f-172562.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13702/13692587_f-172558.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13702/13692587_f-172558.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13702/13692587/f-172562.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13702/13692587_f-172558-s.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13702/13692587_f-172558-s.webm' } }, 'categories': [{ 'id': '1004', 'name': 'Logos', 'type': 'category' }, { 'id': '1008', 'name': 'Text', 'type': 'category' }, { 'id': '236', 'name': 'Simple', 'type': 'style' }, { 'id': '395', 'name': 'Flat Design', 'type': 'style' }, { 'id': '822', 'name': 'Glitch', 'type': 'style' }], 'html': { 'url': 'https://stage.motionelements.com/motion-graphics-template-13692587-technological-lower-thirds' },
}, {
  'object': 'element', 'id': '13671689', 'name': 'Corporate Transitions', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '9', 'currency': 'USD', 'credits': 9, 'artist': { 'id': '173780', 'username': 'AnimationBro' }, 'mediaType': 'mg_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13681/13671689/f-171826.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13681/13671689_f-171822.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13681/13671689_f-171822.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13681/13671689/f-171826.jpg' }, 'mp4': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13681/13671689_f-171822-s.mp4' }, 'webm': { 'url': 'https://d3auje5car4oak.cloudfront.net/v/13681/13671689_f-171822-s.webm' } }, 'categories': [{ 'id': '1001', 'name': 'Design Elements', 'type': 'category' }, { 'id': '1007', 'name': 'Social Media', 'type': 'category' }, { 'id': '1009', 'name': 'Transitions', 'type': 'category' }, { 'id': '395', 'name': 'Flat Design', 'type': 'style' }], 'html': { 'url': 'https://stage.motionelements.com/motion-graphics-template-13671689-corporate-transitions' },
}];

export default {
  name: 'product-page-not-found',
  components: {
    // ProductWrapper: () => import('frontend-modules/shared/modules/common/product/ProductWrapper.vue'),
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),

    SectionProductInfo: () => import('@/components/modules/product/SectionProductInfo.vue'),
  },
  data() {
    return {
      isShow: 'similar',
      similar: elements,
      sameArtist: elements,
    };
  },
};
</script>
