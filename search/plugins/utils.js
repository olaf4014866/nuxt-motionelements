import term from '@motionelements/old-modules/src/helper/term.js'
// import siteUrl from '@motionelements/old-modules/library/meHelper.js'
import link from '@motionelements/core/src/helpers/link.js'
import siteUrl from '@motionelements/old-modules/src/helper/siteUrl.js'
import videoPlayer from '@/helpers/player/video.js'

export default (context, inject) => {
    inject('term', term)
    // inject('siteUrl', siteUrl)
    inject('link', link)
    inject('siteUrl', siteUrl)
    inject('videoPlayer', videoPlayer)
    // For Nuxt <= 2.12, also add 👇
    context.$term = term
    // context.$siteUrl = siteUrl
    context.$link = link
    context.$siteUrl = siteUrl
    context.$videoPlayer = videoPlayer
}