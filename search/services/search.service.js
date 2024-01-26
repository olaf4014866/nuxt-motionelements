import * as searchApi from '@/api/search.js';
// import store from '@/store/index.js';
import router from '@/router/index';
import link from '@motionelements/core/src/helpers/link.js';

import { getMediaTypeInfo } from '@/services/catalog.service.js';

export async function searchElements(mediaType, params) {
  return searchApi.searchElements(mediaType, params);
}

export async function parseFiltersFromQuery(mediaType, params) {
  return searchApi.searchElements(mediaType, params);
}

export async function clearFilters() {
  // const filters = store.getters['search/allSearchFilter'];
  const keyword = store.getters['search/keyword'];

  store.dispatch('search/resetFilters', {});

  router.push({
    query: {
      s: keyword,
    },
  });
}

export async function changeKeyword(keyword) {
// reset search value to default
  console.log('changeKeyword', keyword);

  // keep all filters
  // const filters = store.getters['search/allSearchFilter'];
  const currentKeyword = store.getters['search/keyword'];

  // if both are empty, ignore
  if (!keyword && !currentKeyword) {
    return;
  }
  // if (keyword === filters.searchKeyword) return;

  // filters.searchKeyword = keyword;

  // store.dispatch('search/setFilter', filters);
  store.dispatch('search/setKeyword', keyword);

  // keep all query
  const query = { ...router.currentRoute.query };

  // set to page 1
  delete query.page;

  if (keyword.length) {
    query.s = keyword;
    query.sort = 'match';
  } else {
    delete query.s;
    delete query.sort;
  }

  router.push({
    query: query,
  });
}


export async function changeMediaType(mediaType) {
  // skip same mediaType
  mediaType = mediaType.replace('-', '_');

  if (mediaType === store.state.search.mediaType) {
    return;
  }

  store.dispatch('site/setLoadingSearch', { status: true });

  store.dispatch('search/changeMediaType', mediaType);

  // store.dispatch('search/resetFilter');

  // @legacy
  store.dispatch('site/setCurrentMediaType', getMediaTypeInfo(mediaType));

  // reset all
  const query = {
    // page: 1,
  };

  // keep keyword
  const currentKeyword = store.getters['search/keyword'];

  if (currentKeyword) {
    query.s = currentKeyword;
  }

  // keep subscription
  if (store.state.search.filter.subscription) {
    query.subscription = store.state.search.filter.subscription;
  }

  console.log('CHANGE', query);

  // if (searchKeyword)
  router.push({
    path: link(`/search/${mediaType.replace('_', '-')}`).fullPath(),
    query: query,
  });
}


export async function changeSubMediaType(mediaType) {
  mediaType = mediaType.replace('-', '_');

  if (mediaType === store.state.search.mediaType) {
    return;
  }
  console.log('changeSubMediaType');

  store.dispatch('site/setLoadingSearch', { status: true });

  store.dispatch('search/changeSubMediaType', mediaType);

  // @legacy
  store.dispatch('site/setCurrentMediaType', getMediaTypeInfo(mediaType));

  // console.log('changeSubMediaType', router, router.currentRoute);

  // keep all query
  const query = { ...router.currentRoute.query };

  // set to page 1
  delete query.page;

  router.push({
    path: link(`/search/${mediaType.replace('_', '-')}`).fullPath(),
    query: query,
  });
}
