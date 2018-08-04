import * as React from 'react';
import BtnIcon from '../btn-icon/BtnIcon';

const REMOVE_MESSAGE = 'Song in favorites';
const ADD_MESSAGE = 'Click to add to favorites';
const styles = {
  fontSize: '25px',
  color: '#FF4081',
};

function FavoriteBtn({ isFavorite, click }) {
  return (
    <span style={styles} >
      <BtnIcon
        tooltip={isFavorite ? REMOVE_MESSAGE : ADD_MESSAGE}
        icon={isFavorite ? 'heart' : 'heart-o'}
        click={() => click(isFavorite)}

      />
    </span>
  );
}
export const props = ['isFavorite', 'click'];
export default FavoriteBtn;
