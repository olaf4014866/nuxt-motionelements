import * as favoritesApi from '@/api/favorites.js';
// import store from '@/store/index.js';


export async function addFavorite(element) {
  const sku = element.id;

  return favoritesApi.addDefaultFavoriteItem(sku)
    .then((response) => {
      console.log(response);
      // console.log('addFavorites done', element, result);

      const favoritesAddTimestamp = response.data.added_at;
      const favoritesElementInfo = element;

      const productsInfo = [];
      productsInfo.push(favoritesElementInfo);

      const teleportInfo = {
        'timestamp': favoritesAddTimestamp,
        'products': productsInfo,
      };

      console.log('addFavorites teleportProductInfo', teleportInfo);

      this.$teleport.event('product_favorited', teleportInfo);

      // store.dispatch('site/getFavoritesCount').then((result) => {
      //   store.dispatch('site/setFavoritesCount', result.data);
      // console.log('addFavorites', result.data);

      // notify immediately
      const notify = this.$store.getters['site/notifyMessages'];
      notify.status = true;
      notify.contents.push({
        name: 'notifyMessages',
        type: 'success',
        title: this.$i18n.t('search.element_added_to_your_favorites'),
        autohide: true,
        delay: 3000,
      });
      this.$store.dispatch('site/setNotifyMessages', notify);
      // });

      this.getFavoritesFolderItemCount('default');
    });
}


export async function getFavoritesFolderItemCount(id) {
  return favoritesApi.addFavoritesFolder(id)
    .then((response) => {
      console.log(response);
      store.dispatch('site/setFavoritesCount', response);
    });
}
