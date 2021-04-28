import {Flag_STORAGE} from '../expand/dao/DataStore';

/**
 * favoriteIcon 单击回调函数
 * @param favoriteDao
 * @param item
 * @param isFavorite
 * @param flag
 */

export default class FavoriteUtil {
  static onFavorite(favoriteDao, item, isFavorite, flag) {
    const key =
      flag === Flag_STORAGE.flag_trending ? item.fullName : item.id.toString();
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
    } else {
      favoriteDao.removeFavoriteItem(key);
    }
  }
}
