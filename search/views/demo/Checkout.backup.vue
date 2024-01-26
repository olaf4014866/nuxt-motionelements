<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12 mb-3">
        <a>
          <font-awesome-icon
            :icon="['far','chevron-left']"
            class="mr-2"
          ></font-awesome-icon> Go back
        </a>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-end mb-3">
      <h1 class="h3 mb-3 mr-4">Title of Page</h1>

      <!-- TOOLBAR -->
      <div class="btn-toolbar mb-3" role="toolbar">
        <div class="btn-group mr-2" role="group">
          <button type="button" class="btn btn-simple-secondary">
            <font-awesome-icon
              :icon="['far','file-invoice']"
              class="mr-2"
            ></font-awesome-icon> Generate Quotation PDF
          </button>
        </div>
        <div class="btn-group">
          <button
            class="btn btn-simple-secondary"
            @click="showSubscription = !showSubscription"
          >
            <font-awesome-icon
              :icon="['far', showSubscription ? 'eye-slash' : 'eye']"
              class="mr-2"
            ></font-awesome-icon>
            <template v-if="showSubscription">
              Hide Subscription &amp; Purchased Items
            </template>
            <template v-else>
              Show Subscription &amp; Purchased Items
            </template>
          </button>
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex py-2 border-bottom border-light bg-light">
        <div class="column-spacer"></div>
        <div class="flex-grow-1 px-3">
          <div class="row align-items-center justify-content-end font-weight-bold text-black">
            <div class="col-4">
              <div class="row">
                <div class="col">On-Demand</div>
                <div class="col-6">With Subscription</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(element, index) in elements"
        class="d-flex py-2 border-bottom border-light"
        :key="`element-${element.id}`"
      >
        <div class="px-3 align-self-center">
          <button class="btn btn-sm btn-light">
            <font-awesome-icon
              :icon="['fal','trash-alt']"
              fixed-width
            ></font-awesome-icon>
          </button>
        </div>
        <ElementThumbnailMini
          :element="element"
        />
        <div class="flex-grow-1 px-3">
          <div class="row align-items-center">
            <div class="col-4">
              {{ element.name }}
            </div>
            <div class="col-4">

              <template v-if="element && element.variants.length > 1">
                <!-- <div class="dropdown">
                  <div
                    class="div-ver-dropdown d-block mb-2 btn btn-simple-secondary d-flex justify-content-between align-items-center dropdown-toggle"
                    @click.prevent="dropdownActive = !dropdownActive"
                  >
                    <div
                      class="flex-grow-1 d-flex justify-content-between align-items-center mr-2"
                    >
                      <div class="d-flex flex-column align-items-start">
                        <p class="ver-label text-dark">
                          {{ _.get(selectedVariants[index], 'format', '').toUpperCase() }}
                        </p>
                        <p class="ver-label-info small text-muted mb-0">
                          {{ getMoreInfo(element, index) }}
                        </p>
                      </div>
                      <div class="ver-price text-right">
                        <template v-if="isFree">
                        </template>
                        <template v-else-if="isDownloadable">
                        </template>
                        <template v-else-if="isSubscriber">
                          <PriceLabelFreeSubscription></PriceLabelFreeSubscription>
                        </template>
                        <template v-else-if="isSubscriptionOnly">
                          Subscription Only
                        </template>
                        <template v-else>
                          <VariantPriceLabel
                            :variant="selectedVariant"
                          />
                        </template>
                      </div>
                    </div>
                  </div>

                  <transition name="fade">
                  <div
                    v-if="dropdownActive"
                    class="dropdown-menu show w-100 border border-light shadow"
                    key="ver-dropdown"
                  >
                    <VersionMultipleDropdownItem
                      v-for="variant in element.variants"
                      :element="element"
                      :variant="variant"
                      :key="variant.id"
                      @select-variant="onSelectVariant(variant.id)"
                      :class="{ active: selectedVariants[index].id === variant.id }"
                      :showInfo="true"
                    />
                  </div>
                  </transition>
                </div> -->
                <VersionMultipleDropdown
                  :product="element"
                  :sku="selectedVariants[index].id"
                  :showPrice="false"
                />
              </template>

            </div>
            <div class="col-4">
              <div class="row align-items-center">
                <div class="col">
                  <p class="mb-0">
                    3
                    <font-awesome-icon
                      :icon="['fal','me-credits-circle']"
                      title="credits"
                    />
                    <span class="text-secondary"> {{ $t('product.credits') }}</span>
                  </p>
                  <p class="small text-muted mb-0">
                    ¥330
                  </p>
                </div>
                <div class="col-6">
                  <font-awesome-icon
                    :icon="['fal','me-lightning']"
                    class="text-info"
                  ></font-awesome-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex py-2 border-bottom border-light bg-light lt">
        <div class="column-spacer"></div>
        <div class="flex-grow-1 px-3">
          <div class="row align-items-center justify-content-end">
            <div class="col-4">
              <div class="row">
                <div class="col">
                  <p class="mb-0">
                    9
                    <font-awesome-icon
                      :icon="['fal','me-credits-circle']"
                      title="credits"
                    />
                    <span class="text-secondary"> {{ $t('product.credits') }}</span>
                  </p>
                  <p class="small text-muted mb-0">
                    ¥990
                  </p>
                </div>
                <div class="col-6">
                  <p class="mb-0">
                    0
                    <font-awesome-icon
                      :icon="['fal','me-credits-circle']"
                      title="credits"
                    />
                    <span class="text-secondary"> {{ $t('product.credits') }}</span>
                  </p>
                  <p class="small text-muted mb-0">
                    ¥0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// array of standard element api return results
const elements = [
  {
    'object': 'element',
    'id': '9236416',
    'name': 'P1630241',
    'new': false,
    'exclusive': false,
    'usageRights': {
      'license': 'royalty_free',
      'isEditorial': false,
      'modelRelease': true,
      'propertyRelease': false,
    },
    'subscription': true,
    'free': false,
    'price': '58',
    'currency': 'USD',
    'credits': 58,
    'artist': {
      'object': 'member',
      'id': '2',
      'username': 'apollo',
      'avatar': {
        'url': 'https://www.gravatar.com/avatar/d106ae10f79575683e5e8968cd1c1c72?d=https%3A%2F%2Fstatic.motionelements.com%2Fimg%2Fmember%2Fartist-01.jpg&s=80',
      },
      'html': {
        'url': 'https://stage.motionelements.com/artists/apollo',
      },
    },
    'mediaType': 'video_live',
    'mediaTypeDetails': {
      'alpha': false,
      'aspectRatio': '16:9',
      'audio': false,
      'duration': 35,
      'location': 'South Korea',
      'loop': false,
      'rendering': '',
      'source': 'PANASONIC GH4(4K)',
    },
    'keywords': [
      'asian',
      'lady',
      'pretty',
      'nature',
      'flowers',
      'park',
      'alone',
      'happy',
      'peaceful',
      'walk',
      'plants',
      'sakura',
      'camera',
      'phone',
      'mobile phone',
      'picture',
      'photograph',
      'selfie',
      '한국',
      'seoul',
    ],
    'previews': {
      'jpg': {
        'url': 'https://media-us-west-motionelements.s3.amazonaws.com/m/s/1246/9236416/a-0846.jpg',
      },
      'mp4': {
        'url': 'https://d3p44rvigeokzf.cloudfront.net/v/1246/9236416_a-01.mp4',
      },
      'webm': {
        'url': 'https://d3p44rvigeokzf.cloudfront.net/v/1246/9236416_a-01.webm',
      },
    },
    'thumbnails': {
      'jpgs': [
        {
          'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1246/9236416/a-0005.jpg',
        },
        {
          'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1246/9236416/a-0212.jpg',
        },
        {
          'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1246/9236416/a-0423.jpg',
        },
        {
          'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1246/9236416/a-0635.jpg',
        },
        {
          'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1246/9236416/a-0846.jpg',
        },
      ],
      'jpg': {
        'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1246/9236416/a-0846.jpg',
      },
      'mp4': false,
      'webm': false,
    },
    'variants': [
      {
        'object': 'variant',
        'id': '9236416-1370560',
        'format': 'hd',
        'free': false,
        'price': '58',
        'currency': 'USD',
        'credits': 58,
        'width': 1920,
        'height': 1080,
        'fps': 0,
        'file': {
          'size': false,
        },
        'aspectRatio': '',
        'duration': 0,
        'master': false,
        'subscription': true,
        'videoCodec': '',
        'downloadable': false,
      },
      {
        'object': 'variant',
        'id': '9236416-1370380',
        'format': '4k',
        'free': false,
        'price': '118',
        'currency': 'USD',
        'credits': 118,
        'width': 3840,
        'height': 2160,
        'fps': 29.97,
        'file': {
          'size': 426795335,
        },
        'aspectRatio': '16:9',
        'duration': 35,
        'master': true,
        'subscription': false,
        'videoCodec': 'h264',
        'downloadable': false,
      },
    ],
    'publishedAt': 1465961549,
    'categories': [
      {
        'object': 'category',
        'id': '34',
        'type': 'category',
        'name': 'Nature',
        'html': {
          'url': 'https://stage.motionelements.com/video/nature-stock-footage-34',
        },
      },
      {
        'object': 'category',
        'id': '35',
        'type': 'category',
        'name': 'People',
        'html': {
          'url': 'https://stage.motionelements.com/video/people-stock-footage-35',
        },
      },
      {
        'object': 'category',
        'id': '36',
        'type': 'category',
        'name': 'Science・Technology',
        'html': {
          'url': 'https://stage.motionelements.com/video/science-technology-stock-footage-36',
        },
      },
      {
        'object': 'category',
        'id': '50',
        'type': 'category',
        'name': 'Lifestyle・Hobby',
        'html': {
          'url': 'https://stage.motionelements.com/video/lifestyle-hobby-stock-footage-50',
        },
      },
    ],
    'description': 'Young lady walking in the park and pausing to admire the flowers and take a selfie',
    'aspectRatio': '16:9',
    'descriptions': [
      {
        'language': 'en',
        'html': 'Young lady walking in the park and pausing to admire the flowers and take a selfie',
      },
    ],
    'html': {
      'url': 'https://stage.motionelements.com/stock-video-9236416-p1630241',
    },
    'labels': {
      'alpha': 'Alpha / Matte',
      'aspectRatio': 'Aspect',
      'audioBitDepth': 'Bit Depth',
      'audioChannels': 'Audio Channels',
      'audioCodec': 'Codec',
      'audioSampleRate': 'Sample Rate',
      'background': 'Background',
      'bodymovinVersionNumber': 'Bodymovin',
      'bpm': 'Tempo',
      'composer': 'Composer',
      'composers': 'Composer',
      'composition': 'Composition',
      'dimension': 'Dimensions',
      'dimensions': 'Dimensions',
      'duration': 'Duration',
      'durations': 'Duration',
      'editType': 'Edit Type',
      'editableInFcp': 'Editable in FCPX',
      'expression': 'Expression Script',
      'fileSize': 'File Size',
      'format': 'Format',
      'geometry': 'Geometry',
      'hasMusic': 'Music',
      'hasPreRender': 'Pre-Rendered Available',
      'hasSfx': 'Sound Effects',
      'hasVideo': 'Stock Footage',
      'id': 'Code',
      'imageType': 'Image Type',
      'jsonFileSize': 'File Size',
      'location': 'Location',
      'logoPlaceholders': 'Logo Placeholders',
      'logoSpots': 'Logo Placeholders',
      'loop': 'Loopable',
      'mediaType': 'Type',
      'modelRelease': 'Model Release',
      'musicalKey': 'Musical Key',
      'musicalWorks': 'Available for Musical Works',
      'pluginsRequired': 'Required Plugins',
      'pluginsUsed': 'Optional Plugins',
      'polygons': 'Polygons',
      'projection': 'Projection',
      'propertyRelease': 'Property Release',
      'publisher': 'Publisher',
      'publishers': 'Publisher',
      'rendering': 'Rendering',
      'resolution': 'Resolution',
      'skill': 'Skill Level',
      'softwareRequired': 'Required Software',
      'softwareVersionName': 'Required Version',
      'softwareVersionNumber': 'Required Version',
      'source': 'Source',
      'textPlaceholders': 'Text Placeholders',
      'textSpots': 'Text Placeholders',
      'vertices': 'Vertices',
      'videoCodec': 'Codec',
      'videoPlaceholders': 'Video Placeholders',
      'videoSpots': 'Video Placeholders',
      'viewingField': 'Viewing Field',
    },
  },
  {
    'object': 'element',
    'id': '59959',
    'name': 'Fireworks Nova',
    'new': false,
    'exclusive': false,
    'usageRights': {
      'license': 'royalty_free', 'isEditorial': false, 'modelRelease': false, 'propertyRelease': false,
    },
    'subscription': true,
    'free': false,
    'price': '30',
    'currency': 'USD',
    'credits': 30,
    'artist': {
      'object': 'member', 'id': '2', 'username': 'apollo', 'avatar': { 'url': 'https://www.gravatar.com/avatar/d106ae10f79575683e5e8968cd1c1c72?d=https%3A%2F%2Fstatic.motionelements.com%2Fimg%2Fmember%2Fartist-01.jpg&s=80' }, 'html': { 'url': 'https://stage.motionelements.com/artists/apollo' },
    },
    'mediaType': 'animation',
    'mediaTypeDetails': {
      'alpha': false, 'aspectRatio': '16:9', 'audio': false, 'duration': 10, 'location': '', 'loop': false, 'rendering': '', 'source': '',
    },
    'keywords': ['firework'],
    'previews': { 'jpg': { 'url': 'https://media-us-west-motionelements.s3.amazonaws.com/m/s/10/59959/a-0104.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/10/59959_a-01.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/10/59959_a-01.webm' } },
    'thumbnails': {
      'jpgs': [{ 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/10/59959/a-0005.jpg' }, { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/10/59959/a-0052.jpg' }, { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/10/59959/a-0104.jpg' }], 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/10/59959/a-0104.jpg' }, 'mp4': false, 'webm': false,
    },
    'variants': [{
      'object': 'variant', 'id': '59959-2059', 'format': 'pal', 'free': true, 'price': '0', 'currency': 'USD', 'credits': 0, 'width': 720, 'height': 576, 'fps': 25, 'file': { 'size': 2660486 }, 'aspectRatio': '4:3', 'duration': 10, 'master': false, 'subscription': true, 'videoCodec': 'mjpeg', 'downloadable': true,
    }, {
      'object': 'variant', 'id': '59959-2060', 'format': 'ntsc', 'free': true, 'price': '0', 'currency': 'USD', 'credits': 0, 'width': 720, 'height': 486, 'fps': 29.97, 'file': { 'size': 2353604 }, 'aspectRatio': '4:3', 'duration': 8, 'master': false, 'subscription': true, 'videoCodec': 'mjpeg', 'downloadable': true,
    }, {
      'object': 'variant', 'id': '59959-2061', 'format': 'hd 720', 'free': true, 'price': '0', 'currency': 'USD', 'credits': 0, 'width': 1280, 'height': 720, 'fps': 25, 'file': { 'size': 3584078 }, 'aspectRatio': '16:9', 'duration': 10, 'master': false, 'subscription': true, 'videoCodec': 'mjpeg', 'downloadable': true,
    }, {
      'object': 'variant', 'id': '59959-1641333', 'format': 'hd', 'free': false, 'price': '30', 'currency': 'USD', 'credits': 30, 'width': 1920, 'height': 1080, 'fps': 25, 'file': { 'size': 10523530 }, 'aspectRatio': '16:9', 'duration': 10, 'master': true, 'subscription': true, 'videoCodec': 'png', 'downloadable': false,
    }, {
      'object': 'variant', 'id': '59959-1369136', 'format': 'gif', 'free': false, 'price': '30', 'currency': 'USD', 'credits': 30, 'width': 1200, 'height': 675, 'fps': 0, 'file': { 'size': false }, 'aspectRatio': '', 'duration': 0, 'master': false, 'subscription': true, 'videoCodec': '', 'downloadable': false,
    }],
    'publishedAt': 1212163200,
    'categories': [{
      'object': 'category', 'id': '49', 'type': 'category', 'name': 'Events・Festivals', 'html': { 'url': 'https://stage.motionelements.com/video/events-festivals-stock-footage-49' },
    }],
    'description': 'Spark of fireworks',
    'aspectRatio': '16:9',
    'descriptions': [{ 'language': 'en', 'html': 'Spark of fireworks' }],
    'html': { 'url': 'https://stage.motionelements.com/stock-animation/59959/fireworks-nova.html' },
    'labels': {
      'alpha': 'Alpha / Matte', 'aspectRatio': 'Aspect', 'audioBitDepth': 'Bit Depth', 'audioChannels': 'Audio Channels', 'audioCodec': 'Codec', 'audioSampleRate': 'Sample Rate', 'background': 'Background', 'bodymovinVersionNumber': 'Bodymovin', 'bpm': 'Tempo', 'composer': 'Composer', 'composers': 'Composer', 'composition': 'Composition', 'dimension': 'Dimensions', 'dimensions': 'Dimensions', 'duration': 'Duration', 'durations': 'Duration', 'editType': 'Edit Type', 'editableInFcp': 'Editable in FCPX', 'expression': 'Expression Script', 'fileSize': 'File Size', 'format': 'Format', 'geometry': 'Geometry', 'hasMusic': 'Music', 'hasPreRender': 'Pre-Rendered Available', 'hasSfx': 'Sound Effects', 'hasVideo': 'Stock Footage', 'id': 'Code', 'imageType': 'Image Type', 'jsonFileSize': 'File Size', 'location': 'Location', 'logoPlaceholders': 'Logo Placeholders', 'logoSpots': 'Logo Placeholders', 'loop': 'Loopable', 'mediaType': 'Type', 'modelRelease': 'Model Release', 'musicalKey': 'Musical Key', 'musicalWorks': 'Available for Musical Works', 'pluginsRequired': 'Required Plugins', 'pluginsUsed': 'Optional Plugins', 'polygons': 'Polygons', 'projection': 'Projection', 'propertyRelease': 'Property Release', 'publisher': 'Publisher', 'publishers': 'Publisher', 'rendering': 'Rendering', 'resolution': 'Resolution', 'skill': 'Skill Level', 'softwareRequired': 'Required Software', 'softwareVersionName': 'Required Version', 'softwareVersionNumber': 'Required Version', 'source': 'Source', 'textPlaceholders': 'Text Placeholders', 'textSpots': 'Text Placeholders', 'vertices': 'Vertices', 'videoCodec': 'Codec', 'videoPlaceholders': 'Video Placeholders', 'videoSpots': 'Video Placeholders', 'viewingField': 'Viewing Field',
    },
  },
  {
    'object': 'element',
    'id': '5515067',
    'name': 'Dai Wo Zou',
    'new': false,
    'exclusive': false,
    'usageRights': {
      'license': 'royalty_free', 'pro': false, 'youtubeContentId': null, 'allowMusicalWorks': false,
    },
    'subscription': true,
    'free': false,
    'price': '15',
    'currency': 'USD',
    'credits': 15,
    'artist': {
      'object': 'member', 'id': '2', 'username': 'apollo', 'avatar': { 'url': 'https://www.gravatar.com/avatar/d106ae10f79575683e5e8968cd1c1c72?d=https%3A%2F%2Fstatic.motionelements.com%2Fimg%2Fmember%2Fartist-01.jpg&s=80' }, 'html': { 'url': 'https://stage.motionelements.com/artists/apollo' },
    },
    'mediaType': 'music',
    'mediaTypeDetails': {
      'audioBitDepth': 16, 'audioChannels': 2, 'audioCodec': 'PCM (Uncompressed)', 'audioSampleRate': 48000, 'bpm': 140, 'composers': ['Alex Peter (SOCAN - IPI: 12809117)'], 'duration': 91, 'editType': '', 'format': 'AIFF', 'instrumental': false, 'instruments': [], 'loop': false, 'musicalKey': 'B major', 'publishers': ['Alex Peter (SOCAN - IPI: 12809117)'], 'source': '',
    },
    'keywords': [],
    'previews': { 'png': { 'url': 'https://d25thuhsbcr6yb.cloudfront.net/m/s/551/5515067/a-0001.png' }, 'mp3': { 'url': 'https://v.motionelements.com/v/551/5515067_a-01.mp3' } },
    'thumbnails': { 'jpgs': [{ 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/551/5515067/a-0001.jpg' }], 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/551/5515067/a-0001.jpg' } },
    'albumArt': false,
    'variants': [{
      'object': 'variant', 'id': '5515067-572579', 'format': 'aif', 'free': false, 'price': '15', 'currency': 'USD', 'credits': 15, 'file': { 'size': 17519616 }, 'master': true, 'subscription': true, 'downloadable': false,
    }],
    'publishedAt': 1412673982,
    'categories': [],
    'description': '',
    'descriptions': [{ 'language': 'en', 'html': '' }],
    'html': { 'url': 'https://stage.motionelements.com/stock-music-5515067-dai-wo-zou' },
    'labels': {
      'alpha': 'Alpha / Matte', 'aspectRatio': 'Aspect', 'audioBitDepth': 'Bit Depth', 'audioChannels': 'Audio Channels', 'audioCodec': 'Codec', 'audioSampleRate': 'Sample Rate', 'background': 'Background', 'bodymovinVersionNumber': 'Bodymovin', 'bpm': 'Tempo', 'composer': 'Composer', 'composers': 'Composer', 'composition': 'Composition', 'dimension': 'Dimensions', 'dimensions': 'Dimensions', 'duration': 'Duration', 'durations': 'Duration', 'editType': 'Edit Type', 'editableInFcp': 'Editable in FCPX', 'expression': 'Expression Script', 'fileSize': 'File Size', 'format': 'Format', 'geometry': 'Geometry', 'hasMusic': 'Music', 'hasPreRender': 'Pre-Rendered Available', 'hasSfx': 'Sound Effects', 'hasVideo': 'Stock Footage', 'id': 'Code', 'imageType': 'Image Type', 'jsonFileSize': 'File Size', 'location': 'Location', 'logoPlaceholders': 'Logo Placeholders', 'logoSpots': 'Logo Placeholders', 'loop': 'Loopable', 'mediaType': 'Type', 'modelRelease': 'Model Release', 'musicalKey': 'Musical Key', 'musicalWorks': 'Available for Musical Works', 'pluginsRequired': 'Required Plugins', 'pluginsUsed': 'Optional Plugins', 'polygons': 'Polygons', 'projection': 'Projection', 'propertyRelease': 'Property Release', 'publisher': 'Publisher', 'publishers': 'Publisher', 'rendering': 'Rendering', 'resolution': 'Resolution', 'skill': 'Skill Level', 'softwareRequired': 'Required Software', 'softwareVersionName': 'Required Version', 'softwareVersionNumber': 'Required Version', 'source': 'Source', 'textPlaceholders': 'Text Placeholders', 'textSpots': 'Text Placeholders', 'vertices': 'Vertices', 'videoCodec': 'Codec', 'videoPlaceholders': 'Video Placeholders', 'videoSpots': 'Video Placeholders', 'viewingField': 'Viewing Field',
    },
  },
];

// array of selectedVariants from each element's product page
const selectedVariants = [
  {
    'object': 'variant', 'id': '9236416-1370560', 'format': 'hd', 'free': false, 'price': '58', 'currency': 'USD', 'credits': 58, 'width': 1920, 'height': 1080, 'fps': 0, 'file': { 'size': false }, 'aspectRatio': '', 'duration': 0, 'master': false, 'subscription': true, 'videoCodec': '', 'downloadable': false,
  },
  {
    'object': 'variant', 'id': '59959-1641333', 'format': 'hd', 'free': false, 'price': '30', 'currency': 'USD', 'credits': 30, 'width': 1920, 'height': 1080, 'fps': 25, 'file': { 'size': 10523530 }, 'aspectRatio': '16:9', 'duration': 10, 'master': true, 'subscription': true, 'videoCodec': 'png', 'downloadable': false,
  },
  {},
];

export default {
  name: 'checkout',
  components: {
    ElementThumbnailMini: () => import('@/views/demo/checkout/ElementThumbnailMini.vue'),
    // VersionMultipleDropdownItem: () => import('@/views/product/modals/download/VersionMultipleDropdownItem.vue'),
    VersionMultipleDropdown: () => import('@/views/product/modals/download/VersionMultipleDropdown.vue'),
  },
  data() {
    return {
      elements: [],
      selectedVariants: [],
      showSubscription: [],
    };
  },
  created() {
    this.elements = elements;
    this.selectedVariants = selectedVariants;
  },
  methods: {
    getMoreInfo(el, index) {
      switch (el.mediaType) {
        case 'music':
        case 'sfx':
          return `${this.$tools.secondToMinutes(this.element.mediaTypeDetails.duration)}`;
        default:
          if (this.selectedVariants[index].width && this.selectedVariants[index].height) {
            return `${this.selectedVariants[index].width} x ${this.selectedVariants[index].height}`;
          }
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.column-spacer {
  width: 111px;
}

.custom-control-label {
  &:before {
    left:0;
  }
}
</style>
