import link from '@motionelements/core/src/helpers/link.js'
export default function(context, inject) {
    console.log(process.client)
    inject('link', link)
    context.$link = link
}