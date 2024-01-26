import * as artistsApi from '@motionelements/core/src/api/artists.js';
// import * as formatter from '@/api/formatter';
// import store from '@/store/index.js';

// export async function getArtistDetails(sku, type) {
//   return elementsApi.getElementDetails(sku, type);
// };

/**
 * get artists profile
 * @param {String} username
 */
export async function getArtistProfile(username) {
  return (await artistsApi.getArtist(username)).data.data;
}

export function getMediaTypeInfo(mediaType) {
  // set current searching mediatype
  return 'video'
  // const mapSupportedMediaTypes = store.getters['site/mapMediaTypes'];
  // return _.find(mapSupportedMediaTypes, { id: mediaType.replace('_', '-') });
}

// simple helpers
export function isProductType(productType, mediaType) {
  if (!mediaType) {
    return false;
  }

  const mediaTypeCode = mediaType.replace('-', '_');

  if (mediaTypeCode === productType) {
    return true;
  }

  switch (productType) {
    case 'video_template':
      return [
        'ae', 'ae_template', 'ae_preset',
        'pr', 'pr_template', 'pr_preset', 'mg_template',
        'fcp', 'motion_template',
        'resolve', 'resolve_template', 'resolve_macro',
      ].includes(mediaTypeCode);
    case 'ae':
      return ['ae_template', 'ae_preset'].includes(mediaTypeCode);
    case 'pr':
      return ['pr_template', 'pr_preset', 'mg_template'].includes(mediaTypeCode);
    case 'fcp':
      return ['fcp', 'motion_template'].includes(mediaTypeCode);
    case 'resolve':
      return ['resolve_template', 'resolve_macro'].includes(mediaTypeCode);
    case 'video':
      return ['video', 'video_live', 'animation', 'video_vr'].includes(mediaTypeCode);
    case 'audio':
      return ['music', 'sfx'].includes(mediaTypeCode);
    case 'image':
      return ['photo', 'vector', 'gif', 'photo_vr'].includes(mediaTypeCode);
    case 'vr':
      return ['video_vr', 'photo_vr'].includes(mediaTypeCode);
    case '3d':
      return ['3d_model', '3d'].includes(mediaTypeCode);
    default:
      return false;
      // return mediaTypeCode === productType;
  }
}

export function getMediaTypeGroup(mediaType) {
  switch (true) {
    case ['photo', 'vector', 'gif', 'photo_vr'].includes(mediaType):
      return 'image';
    case ['video_live', 'animation', 'video_vr'].includes(mediaType):
      return 'video';
    case ['ae_template', 'ae_preset'].includes(mediaType):
      return 'ae';
    case ['pr_template', 'pr_preset', 'mg_template'].includes(mediaType):
      return 'pr';
    case ['motion_template'].includes(mediaType):
      return 'fcp';
    case ['3d', '3d_model'].includes(mediaType):
      return '3d';
    default:
      return mediaType;
  }
}
