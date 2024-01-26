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

    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-end mb-3">
      <h1 class="h3 mb-3 mr-4">Title of Page</h1>

      <!-- <div class="btn-group mb-3">
        <button type="button" class="btn btn-simple-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <font-awesome-icon
            :icon="['far','tools']"
            class="mr-2"
          ></font-awesome-icon> Tools
        </button>
        <div class="dropdown-menu dropdown-menu-right overflow-hidden">
          <button
            class="dropdown-item" type="button"
            @click="showSubscription = !showSubscription"
          >
            <font-awesome-icon
              :icon="['far', showSubscription ? 'eye-slash' : 'eye']"
              fixed-width
              class="mr-1"
            ></font-awesome-icon>
            <template v-if="showSubscription">
              Hide Subscription &amp; Purchased Items
            </template>
            <template v-else>
              Show Subscription &amp; Purchased Items
            </template>
          </button>
        </div>
      </div> -->

      <div class="align-self-start align-self-sm-end">
        <div
          @click.stop.prevent="showSubscription = !showSubscription"
          class="d-flex justify-content-between align-items-center small mb-3">
          <div class="custom-control custom-switch">
            <label
              :class="showSubscription ? 'active' : ''"
              class="custom-control-label custom-control-label-show-sub-items"
            />
          </div>
          <div class="custom-control-text-label">
            Show Subscription &amp; Purchased Items
          </div>
        </div>
      </div>
    </div>

    <div class="cart-items">
      <div
        class="checkout-header d-none d-lg-flex border-bottom"
      >
        <div class="flex-grow-1 px-3">
          <div class="row align-items-center justify-content-end font-weight-bold text-black small">
            <div class="col-4">
              <div class="row">
                <div class="col text-right">On-Demand</div>
                <div class="col-6 text-right">Note</div>
              </div>
            </div>
          </div>
        </div>
        <div class="column-spacer"></div>
      </div>
      <div class="checkout-content">
        <ProductRow
          v-for="(product) in products"
          :key="`${product.id}`"
          :product="product"
          :showSubscription="showSubscription"
        />
      </div>
      <div
        class="checkout-footer d-flex py-2"
      >
        <div class="flex-grow-1 px-3">
          <div class="row justify-content-end font-weight-bold">
            <div class="col-12 col-lg-4 text-right">
              <p class="font-weight-bold text-dark mb-0">Subtotal</p>
            </div>
            <div class="col-12 col-lg-4">
              <div class="row">
                <div class="col text-right">
                  <p class="font-weight-bold mb-0">
                    <span class="small text-muted d-inline d-lg-none mr-2">On-Demand: </span>
                    ¥990
                  </p>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-6 text-right">
                  <p class="font-weight-bold mb-0">
                    <span class="small text-muted d-inline d-lg-none mr-2">Note: </span>
                    ¥330
                  </p>
                  <p class="small">
                    <a class="badge badge-info text-white no-invert">
                      Learn More <font-awesome-icon :icon="['fas','info-circle']"></font-awesome-icon>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column-spacer"></div>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-end">
      <button class="btn btn-simple-secondary m-1" type="button">
        <font-awesome-icon
          :icon="['far','file-invoice']"
          fixed-width
          class="mr-1"
        ></font-awesome-icon> Generate Quotation PDF
      </button>
      <button class="btn btn-primary m-1" type="button">
        <font-awesome-icon
          :icon="['far','me-credits-circle']"
          fixed-width
          class="mr-1"
        ></font-awesome-icon> Purchase Credits Needed
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import Money from '@motionelements/money';
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
    // ElementThumbnailMini: () => import('@/views/checkout/ElementThumbnailMini.vue'),
    // MediaTypeIcon: () => import('@/components/modules/common/MediaTypeIcon.vue'),
    // VersionMultipleDropdownItem: () => import('@/views/product/modals/download/VersionMultipleDropdownItem.vue'),
    // VersionMultipleDropdown: () => import('@/views/product/modals/download/VersionMultipleDropdown.vue'),
    // FormatLabel: () => import('@/views/checkout/FormatLabel.vue'),
    ProductRow: () => import('@/views/checkout/ProductRow.vue'),
  },
  data() {
    return {
      elements: [],
      selectedVariants: [],
      showSubscription: true,
    };
  },
  computed: {
    ...mapState({
      cartItems: state => state.cart.items,
      // // userCurrency: state => state.user.currency.toUpperCase(),
      // supportedCurrencies: state => state.site.supportedCurrencies,
      // couponCode: state => state.payment.coupon.code,
      // creditPacks: state => state.credits.creditPacks,
      // faqs: state => state.credits.faqs,
      // showBlocker: state => state.payment.blocker.show,
      // blockerMessage: state => state.payment.blocker.message,
    }),
    ...mapGetters({
      userCurrency: 'user/currencyCode',
    }),
    products() {
      // return [];
      return this.cartItems;
    },
    // totalPrice() {
    //
    // },
  },
  created() {
    // get cart items
    this.$store.dispatch('cart/listItems');
    this.elements = elements;
    this.selectedVariants = selectedVariants;
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  metaInfo() {
    return {
      meta: [
        { vmid: 'robots', name: 'robots', content: 'noindex nofollow' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.column-spacer {
  width: 63px;
  min-width: 63px;
}

.custom-control-label {
  &:before {
    left:0;
  }
}

.custom-switch + .custom-control-text-label {
  cursor: pointer;
}

.custom-control-label-show-sub-items {
  &:before, &:after {
    cursor: pointer;
  }

  &.active {
    &:before {
      color: $black;
      // background-color: $custom-control-indicator-checked-bg;
      // border-color: $custom-control-indicator-checked-border-color;
      background-color: $primary;
      border-color: map-get(map-get($theme-colors-variants,"primary"),"-1");

      .ui-dark & {
        color: $black;
        // background-color: $custom-control-indicator-checked-bg-dark;
        // border-color: $custom-control-indicator-checked-border-color-dark;
        background-color: $primary;
        border-color: $light;
      }
    }

    &:after {
      transform: translateX(0.9375rem);
      background-color: $white;

      .ui-dark & {
        background-color: $black;
      }
    }
  }
}
</style>
