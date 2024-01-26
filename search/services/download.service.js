import * as downloadsApi from '@/api/downloads.js';
import * as accountApi from '@motionelements/core/src/api/account.js';

export const downloadElement = async payload => downloadsApi.createDownload(payload);

export const purchaseCollection = async payload => downloadsApi.createDownload(payload);

export const getDownload = async id => downloadsApi.getDownload(id).then(response => response.data);

/**
 * check can member subscription can download
 * @param {Object} element element.media_type
 * @param {Object} variant
 * @param {Array} memberSubscriptions member.info.subscrpition
 */
export const isElementVariantDownloadableBySubscription = (element, variant, memberSubscriptions = []) => {
  if (!_.get(variant, 'subscription')) {
    return false;
  }
  function getElementSubscriptionPlanType(element) {
    switch (_.get(element, 'mediaType')) {
      case 'photo':
      case 'photo_vr':
      case 'vector':
      case 'gif':
      case 'lottie':
        return 'image';
      case 'music':
      case 'ae_template':
      case 'ae_preset':
      case 'pr_template':
      case 'pr_preset':
      case 'mg_template':
        return 'music-ae-pr';
      case 'video':
      case 'video_vr':
      case 'animation':
      case 'motion_template':
        return 'video-motion';
      default:
        return 'unlimited';
    }
  }
  return memberSubscriptions.includes('unlimited') || memberSubscriptions.includes(getElementSubscriptionPlanType(element));
  /*
    // console.log('subscribe match ', mt, (sub), (sub) === 'music-ae-pr', (/music|ae|pr|mg/).test(mt));
  if (JSON.stringify(sub).match('unlimited')) {
    console.log('isElementDownloadableBySubscription match unlimited');
    return true;
  }
  if (JSON.stringify(sub).match('music-ae-pr') && (/music|ae|pr|mg/).test(element.media_type)) {
    console.log('isElementDownloadableBySubscription match music-ae-pr');
    return true;
  }
  if (JSON.stringify(sub).match('video-motion') && (/^(video|animation|motion)/).test(element.media_type)) {
    console.log('isElementDownloadableBySubscription match video-motion');
    return true;
  }
  if (JSON.stringify(sub).match('image') && (/^(lottie|photo|vector|gif)$/).test(element.media_type) && !(/photo-vr/).test(element.media_type)) {
    console.log('isElementDownloadableBySubscription match image exclude photo-vr');
    return true;
  }
  console.log('isElementDownloadableBySubscription no match, return false');
  return false;
     */
};

export async function getFreeDownloadsRemaining() {
  return accountApi.getFreeDownloadsRemaining()
    .then(res => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
}
