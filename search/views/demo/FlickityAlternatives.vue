<template>
  <div>
    <div class="container py-6">

      <section>
        <div class="row">
          <div class="col-12 mb-3">
            Swiper Test
          </div>
          <div class="col-12 mb-3">
            <LandingPageElementsCarousel
              :elements="elementsTemplates"
              :size="'lg'"
            />
          </div>
        </div>
      </section>

      <section>
        <div class="row">
          <div class="col-12 mb-3">
            Swiper Test (Second Instance)
          </div>
          <div class="col-12 mb-3">
            <LandingPageElementsCarousel
              :elements="elementsVideo"
            />
          </div>
        </div>
      </section>

      <section>
        <div class="row">
          <div class="col-12 mb-3">
            Swiper Test (Home Highlights)
          </div>
          <div class="col-12 col-lg-8 mb-3">
            <HomeHighlightsCarousel
              :highlights="highlights"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
const elementsTemplates = [{
  'object': 'element', 'id': '13275875', 'name': 'Dynamic Parallax Opener', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '2340', 'currency': 'JPY', 'credits': 18, 'artist': { 'id': '151233', 'username': 'Khin' }, 'mediaType': 'ae_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13285/13275875/f-156926.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/13285/13275875_f-156925.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/13285/13275875_f-156925.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/13285/13275875/f-156926.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/13285/13275875_f-156925-s.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/13285/13275875_f-156925-s.webm' } }, 'categories': [{ 'id': '199', 'name': 'Slideshow', 'type': 'category' }, { 'id': '388', 'name': 'Transitions', 'type': 'category' }, { 'id': '204', 'name': 'Text', 'type': 'category' }, { 'id': '5', 'name': 'Design Elements', 'type': 'category' }], 'html': { 'url': 'https://stage.motionelements.com/after-effects-template-13275875-dynamic-parallax-opener' },
}, {
  'object': 'element', 'id': '12935382', 'name': 'Stomp Opener', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '1170', 'currency': 'JPY', 'credits': 9, 'artist': { 'id': '87956', 'username': 'aepp' }, 'mediaType': 'ae_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/12945/12935382/f-143420-0061.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12945/12935382_f-143420.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12945/12935382_f-143420.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/12945/12935382/f-143420-0061.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12945/12935382_f-143420-s.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12945/12935382_f-143420-s.webm' } }, 'categories': [{ 'id': '199', 'name': 'Slideshow', 'type': 'category' }, { 'id': '236', 'name': 'Simple', 'type': 'style' }, { 'id': '204', 'name': 'Text', 'type': 'category' }], 'html': { 'url': 'https://stage.motionelements.com/after-effects-template-12935382-stomp-opener' },
}, {
  'object': 'element', 'id': '12016166', 'name': 'Inspiring Slideshow', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '2080', 'currency': 'JPY', 'credits': 16, 'artist': { 'id': '79954', 'username': 'Ladoben' }, 'mediaType': 'ae_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/12026/12016166/f-143451-0270.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12026/12016166_f-143451.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12026/12016166_f-143451.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/12026/12016166/f-143451-0270.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12026/12016166_f-143451-s.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12026/12016166_f-143451-s.webm' } }, 'categories': [{ 'id': '199', 'name': 'Slideshow', 'type': 'category' }, { 'id': '236', 'name': 'Simple', 'type': 'style' }, { 'id': '385', 'name': 'Luxurious', 'type': 'style' }, { 'id': '395', 'name': 'Flat Design', 'type': 'style' }, { 'id': '204', 'name': 'Text', 'type': 'category' }], 'html': { 'url': 'https://stage.motionelements.com/after-effects-template-12016166-inspiring-slideshow' },
}, {
  'object': 'element', 'id': '11862329', 'name': 'Slideshow', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '1950', 'currency': 'JPY', 'credits': 15, 'artist': { 'id': '117335', 'username': 'Pixel' }, 'mediaType': 'ae_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/11872/11862329/u-5b440f65c56f2.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11872/11862329_f-127695.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11872/11862329_f-127695.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/11872/11862329/u-5b440f65c56f2.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11872/11862329_f-127695-s.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11872/11862329_f-127695-s.webm' } }, 'categories': [{ 'id': '199', 'name': 'Slideshow', 'type': 'category' }, { 'id': '236', 'name': 'Simple', 'type': 'style' }, { 'id': '388', 'name': 'Transitions', 'type': 'category' }, { 'id': '395', 'name': 'Flat Design', 'type': 'style' }, { 'id': '5', 'name': 'Design Elements', 'type': 'category' }], 'html': { 'url': 'https://stage.motionelements.com/after-effects-template-11862329-slideshow' },
}, {
  'object': 'element', 'id': '11713572', 'name': '250 Transitions', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '3250', 'currency': 'JPY', 'credits': 25, 'artist': { 'id': '116621', 'username': 'metrounit' }, 'mediaType': 'ae_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/11723/11713572/u-5b191a438327e.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11723/11713572_a-01.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11723/11713572_a-01.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/11723/11713572/u-5b191a438327e.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11723/11713572_a-01-s.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/11723/11713572_a-01-s.webm' } }, 'categories': [{ 'id': '5', 'name': 'Design Elements', 'type': 'category' }, { 'id': '215', 'name': 'Weddings', 'type': 'category' }, { 'id': '249', 'name': 'Grunge', 'type': 'style' }, { 'id': '386', 'name': 'Cute', 'type': 'style' }, { 'id': '388', 'name': 'Transitions', 'type': 'category' }], 'html': { 'url': 'https://stage.motionelements.com/after-effects-template-11713572-250-transitions' },
}, {
  'object': 'element', 'id': '9722220', 'name': 'Callout Pack', 'favorited': false, 'similarity': true, 'new': false, 'exclusive': false, 'usageRights': { 'license': 'royalty_free' }, 'subscription': true, 'free': false, 'price': '3250', 'currency': 'JPY', 'credits': 25, 'artist': { 'id': '27268', 'username': 'themediastock' }, 'mediaType': 'ae_template', 'mediaTypeDetails': { 'aspectRatio': '16:9' }, 'previews': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1732/9722220/f-139562-1388.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/1732/9722220_f-139562.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/1732/9722220_f-139562.webm' } }, 'thumbnails': { 'jpg': { 'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/1732/9722220/f-139562-1388.jpg' }, 'mp4': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/1732/9722220_f-139562-s.mp4' }, 'webm': { 'url': 'https://d3p44rvigeokzf.cloudfront.net/v/1732/9722220_f-139562-s.webm' } }, 'categories': [{ 'id': '5', 'name': 'Design Elements', 'type': 'category' }, { 'id': '15', 'name': 'Broadcast', 'type': 'category' }, { 'id': '204', 'name': 'Text', 'type': 'category' }], 'html': { 'url': 'https://stage.motionelements.com/after-effects-template-9722220-callout-pack' },
}];

const elementsVideo = [{
  'object': 'element',
  'id': '7468870',
  'name': 'Morning Light Rays 2',
  'favorited': false,
  'similarity': true,
  'new': false,
  'exclusive': false,
  'usageRights': {
    'license': 'royalty_free',
  },
  'subscription': true,
  'free': false,
  'price': '20',
  'currency': 'USD',
  'credits': 20,
  'artist': {
    'id': '10311',
    'username': 'kreativorks',
  },
  'mediaType': 'animation',
  'mediaTypeDetails': {
    'aspectRatio': '16:9',
  },
  'previews': {
    'jpg': {
      'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/746/7468870/a-0120.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/746/7468870_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/746/7468870_a-01.webm',
    },
  },
  'thumbnails': {
    'jpg': {
      'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/746/7468870/a-0120.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/746/7468870_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/746/7468870_a-01.webm',
    },
  },
  'categories': [
    {
      'id': '20',
      'name': 'Intros・Openers',
      'type': 'type',
    },
    {
      'id': '34',
      'name': 'Nature',
      'type': 'category',
    },
    {
      'id': '38',
      'name': 'Video Backgrounds',
      'type': 'type',
    },
  ],
  'html': {
    'url': 'https://stage.motionelements.com/stock-video-7468870-morning-light-rays-2',
  },
},
{
  'object': 'element',
  'id': '12217072',
  'name': 'Concentrated line loop - White (with alpha)',
  'favorited': false,
  'similarity': true,
  'new': false,
  'exclusive': false,
  'usageRights': {
    'license': 'royalty_free',
  },
  'subscription': true,
  'free': false,
  'price': '10',
  'currency': 'USD',
  'credits': 10,
  'artist': {
    'id': '149809',
    'username': 'inten',
  },
  'mediaType': 'animation',
  'mediaTypeDetails': {
    'aspectRatio': '16:9',
  },
  'previews': {
    'jpg': {
      'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/12227/12217072/a-0120.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217072_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217072_a-01.webm',
    },
  },
  'thumbnails': {
    'jpg': {
      'url': 'https://d31l02nbp0owar.cloudfront.net/m/t/12227/12217072/a-0120.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217072_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217072_a-01.webm',
    },
  },
  'categories': [
    {
      'id': '3',
      'name': 'Energetic',
      'type': 'style',
    },
    {
      'id': '38',
      'name': 'Video Backgrounds',
      'type': 'type',
    },
    {
      'id': '167',
      'name': 'Glitter',
      'type': 'style',
    },
    {
      'id': '286',
      'name': 'Gaming',
      'type': 'category',
    },
    {
      'id': '324',
      'name': 'Transitions',
      'type': 'type',
    },
    {
      'id': '328',
      'name': 'VFX・Particles',
      'type': 'category',
    },
    {
      'id': '50',
      'name': 'Lifestyle・Hobby',
      'type': 'category',
    },
  ],
  'html': {
    'url': 'https://stage.motionelements.com/stock-video-12217072-concentrated-line-loop-white-with-alpha',
  },
},
{
  'object': 'element',
  'id': '10625555',
  'name': 'Brilliant Particles Background Loop',
  'favorited': false,
  'similarity': true,
  'new': false,
  'exclusive': false,
  'usageRights': {
    'license': 'royalty_free',
  },
  'subscription': true,
  'free': false,
  'price': '25',
  'currency': 'USD',
  'credits': 25,
  'artist': {
    'id': '62434',
    'username': 'Heilika',
  },
  'mediaType': 'animation',
  'mediaTypeDetails': {
    'aspectRatio': '16:9',
  },
  'previews': {
    'jpg': {
      'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/10635/10625555/a-0384.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/10635/10625555_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/10635/10625555_a-01.webm',
    },
  },
  'thumbnails': {
    'jpg': {
      'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/10635/10625555/a-0384.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/10635/10625555_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/10635/10625555_a-01.webm',
    },
  },
  'categories': [
    {
      'id': '38',
      'name': 'Video Backgrounds',
      'type': 'type',
    },
    {
      'id': '49',
      'name': 'Events・Festivals',
      'type': 'category',
    },
    {
      'id': '166',
      'name': 'Particles',
      'type': 'style',
    },
    {
      'id': '167',
      'name': 'Glitter',
      'type': 'style',
    },
    {
      'id': '169',
      'name': 'Romantic',
      'type': 'style',
    },
    {
      'id': '176',
      'name': 'VJ Loops',
      'type': 'type',
    },
    {
      'id': '328',
      'name': 'VFX・Particles',
      'type': 'category',
    },
    {
      'id': '329',
      'name': 'Wedding',
      'type': 'category',
    },
  ],
  'html': {
    'url': 'https://stage.motionelements.com/stock-video-10625555-brilliant-particles-background-loop',
  },
},
{
  'object': 'element',
  'id': '12217075',
  'name': 'Concentrated line loop - Black (with alpha)',
  'favorited': false,
  'similarity': true,
  'new': false,
  'exclusive': false,
  'usageRights': {
    'license': 'royalty_free',
  },
  'subscription': true,
  'free': false,
  'price': '10',
  'currency': 'USD',
  'credits': 10,
  'artist': {
    'id': '149809',
    'username': 'inten',
  },
  'mediaType': 'animation',
  'mediaTypeDetails': {
    'aspectRatio': '16:9',
  },
  'previews': {
    'jpg': {
      'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/12227/12217075/a-0120.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217075_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217075_a-01.webm',
    },
  },
  'thumbnails': {
    'jpg': {
      'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/12227/12217075/a-0120.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217075_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12227/12217075_a-01.webm',
    },
  },
  'categories': [
    {
      'id': '3',
      'name': 'Energetic',
      'type': 'style',
    },
    {
      'id': '38',
      'name': 'Video Backgrounds',
      'type': 'type',
    },
    {
      'id': '167',
      'name': 'Glitter',
      'type': 'style',
    },
    {
      'id': '286',
      'name': 'Gaming',
      'type': 'category',
    },
    {
      'id': '324',
      'name': 'Transitions',
      'type': 'type',
    },
    {
      'id': '328',
      'name': 'VFX・Particles',
      'type': 'category',
    },
    {
      'id': '50',
      'name': 'Lifestyle・Hobby',
      'type': 'category',
    },
  ],
  'html': {
    'url': 'https://stage.motionelements.com/stock-video-12217075-concentrated-line-loop-black-with-alpha',
  },
},
{
  'object': 'element',
  'id': '12419079',
  'name': 'Golden Glitter Particle Background Animation Loop Embers Rising',
  'favorited': false,
  'similarity': true,
  'new': false,
  'exclusive': false,
  'usageRights': {
    'license': 'royalty_free',
  },
  'subscription': true,
  'free': false,
  'price': '60',
  'currency': 'USD',
  'credits': 60,
  'artist': {
    'id': '1991',
    'username': 'EnchantedStudios',
  },
  'mediaType': 'animation',
  'mediaTypeDetails': {
    'aspectRatio': '16:9',
  },
  'previews': {
    'jpg': {
      'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/12429/12419079/a-0005.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12429/12419079_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12429/12419079_a-01.webm',
    },
  },
  'thumbnails': {
    'jpg': {
      'url': 'https://d1o2pwfline4gu.cloudfront.net/m/t/12429/12419079/a-0005.jpg',
    },
    'mp4': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12429/12419079_a-01.mp4',
    },
    'webm': {
      'url': 'https://d3p44rvigeokzf.cloudfront.net/v/12429/12419079_a-01.webm',
    },
  },
  'categories': [
    {
      'id': '38',
      'name': 'Video Backgrounds',
      'type': 'type',
    },
    {
      'id': '49',
      'name': 'Events・Festivals',
      'type': 'category',
    },
    {
      'id': '328',
      'name': 'VFX・Particles',
      'type': 'category',
    },
    {
      'id': '329',
      'name': 'Wedding',
      'type': 'category',
    },
  ],
  'html': {
    'url': 'https://stage.motionelements.com/stock-video-12419079-golden-glitter-particle-background-animation-loop-embers-rising',
  },
}];

const homeHighlights = [
  {
    'object': 'banner',
    'id': '3868',
    'title': 'Background music for idents & logos',
    'heading': 'Background music for idents & logos',
    'subheading': 'An affordable collection of recommended music for your commercials, idents and logos',
    'html': {
      'url': 'https://stage.motionelements.com/music/intro-jingle-d290?promo_id=3868&promo_name=background-music-for-idents-logos&promo_creative=banner-3868-background-music-for-idents-logos-5ee0a5a88b80e-1170x390.jpg',
    },
    'image': {
      'url': 'https://static.moele.me/img/banners/carousel/banner-3868-background-music-for-idents-logos-5ee0a5a88b80e-1170x390.jpg?w=750&h=422&auto=format&q=85&fit=crop',
    },
  },
  {
    'object': 'banner',
    'id': '3583',
    'title': 'AE slideshow templates',
    'heading': 'AE slideshow templates',
    'subheading': 'Check out best-selling video & photo slideshows',
    'html': {
      'url': 'https://stage.motionelements.com/after-effects/slideshow-templates-199?featured=14242172?featured=14242172&promo_id=3583&promo_name=ae-slideshow-templates&promo_creative=banner-3583-ae-slideshow-templates-5eb96be6e38cd-1170x390.jpg',
    },
    'image': {
      'url': 'https://static.moele.me/img/banners/carousel/banner-3583-ae-slideshow-templates-5eb96be6e38cd-1170x390.jpg?w=750&h=422&auto=format&q=85&fit=crop',
    },
  },
  {
    'object': 'banner',
    'id': '3477',
    'title': 'Halloween',
    'heading': 'Halloween',
    'subheading': "Trick or Treat! Catch people's heart with our various animations!",
    'html': {
      'url': 'https://stage.motionelements.com/video/halloween-d315?promo_id=3477&promo_name=halloween&promo_creative=banner-3477-halloween-5e3ad8b3c7a7b-1170x390.jpg',
    },
    'image': {
      'url': 'https://static.moele.me/img/banners/carousel/banner-3477-halloween-5e3ad8b3c7a7b-1170x390.jpg?w=750&h=422&auto=format&q=85&fit=crop',
    },
  },
];

export default {
  name: 'demo-flickity-alternatives',
  components: {
    LandingPageElementsCarousel: () => import('@/views/demo/flickity-alternatives/LandingPageElementsCarousel.vue'),
    HomeHighlightsCarousel: () => import('@/views/demo/flickity-alternatives/HomeHighlightsCarousel.vue'),
  },
  data() {
    return {
      elementsTemplates: elementsTemplates,
      elementsVideo: elementsVideo,
      highlights: homeHighlights,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
