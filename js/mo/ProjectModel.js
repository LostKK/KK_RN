/**
 * 带收藏状态的item
 * @param item
 * @param isFavorite
 * @constructor
 */

export default function projectModel(item, isFavorite) {
  this.item = item;
  this.isFavorite = isFavorite;
}
