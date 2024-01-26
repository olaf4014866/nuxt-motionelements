import * as collectionApi from '@motionelements/core/src/api/collection';

export async function getCollection(id) {
  return collectionApi.getCollection(id);
}

export async function listCollectionItems(id) {
  return collectionApi.listCollectionItems(id);
}
