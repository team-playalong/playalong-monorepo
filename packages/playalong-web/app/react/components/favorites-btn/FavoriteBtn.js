import * as React from 'react';
import BtnIcon from '../btn-icon/BtnIcon';
var defaults = {};
var REMOVE_MESSAGE = 'Song in favorites';
var ADD_MESSAGE = 'Click to add to favorites';
var styles = {
    fontSize: '25px',
    color: '#FF4081',
};
function FavoriteBtn(_a) {
    var isFavorite = _a.isFavorite, click = _a.click;
    return (React.createElement("span", { style: styles },
        React.createElement(BtnIcon, { tooltip: isFavorite ? REMOVE_MESSAGE : ADD_MESSAGE, icon: isFavorite ? 'heart' : 'heart-o', click: function () { return click(isFavorite); } })));
}
export var props = ['isFavorite', 'click'];
export default FavoriteBtn;
//# sourceMappingURL=FavoriteBtn.js.map