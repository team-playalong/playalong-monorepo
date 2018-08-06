import { PlyFavorites, FavoritesCtrl } from './favorites.component';

export default window.angular.module('PlyFavorites', [])
.component('plyFavorites', PlyFavorites)
.controller('FavoritesCtrl', FavoritesCtrl);
