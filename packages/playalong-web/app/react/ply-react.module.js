import 'ngreact';
import { react2angular } from 'react2angular';

// Modules
import PlyStyled from './components/styled';

// Native Components
import PlyChordResultList from './components/chord-result-list/chord-result-list';
import TextInput from 'playalong-components/lib/components/TextInput';
import Rating, { props as RatingProps } from 'playalong-components/lib/components/Rating';
import FavoriteBtn, { props as FavoriteBtnProps } from './components/favorites-btn/FavoriteBtn';
import TextSlider, { props as TextSliderProps } from 'playalong-components/lib/components/TextSlider';
import Button, { props as ButtonProps } from 'playalong-components/lib/components/Button';
import BtnIcon, { props as BtnIconProps } from './components/btn-icon/BtnIcon';
import Youtube, { props as YoutubeProps } from 'playalong-components/lib/components/Youtube';
import PlyLogo, { props as PlyLogoProps } from './components/logo/Logo';
import PlyChordSearchCard from './components/chord-search-card/chord-search-card';

// playalong-components
import RadioButtons, { props as RadioButtonsProps } from 'playalong-components/lib/components/RadioButtons';
import PlySpinner, { props as PlySpinnerProps } from 'playalong-components/lib/components/Spinner';
import AutoScroll, { props as AutoScrollProps } from 'playalong-components/lib/components/AutoScroll';
import PlyToggle from 'playalong-components/lib/components/Toggle';
import PlyImage from 'playalong-components/lib/components/Image';
import PlyDropdown from 'playalong-components/lib/components/Dropdown';

export default window.angular.module('PlyReact', [
  'react',
  PlyStyled.name,
])
	// Native Components
	.component('plyChordResultList', react2angular(PlyChordResultList))
	.component('plyChordSearchCard', react2angular(PlyChordSearchCard))

	// playalong-components
	.component('plyRating', react2angular(Rating, RatingProps))
	.component('radioButtons', react2angular(RadioButtons, RadioButtonsProps))
	.component('plyRadioButtons', react2angular(RadioButtons, RadioButtonsProps))
	.component('textInput', react2angular(TextInput))
	.component('favoriteBtn', react2angular(FavoriteBtn, FavoriteBtnProps))
	.component('textSlider', react2angular(TextSlider, TextSliderProps))
	.component('plyButton', react2angular(Button, ButtonProps))
	.component('btnIcon', react2angular(BtnIcon, BtnIconProps))
	.component('plyBtnIcon', react2angular(BtnIcon, BtnIconProps))
	.component('plyYoutube', react2angular(Youtube, YoutubeProps))
	.component('plyLogo', react2angular(PlyLogo, PlyLogoProps))
	.component('plySpinner', react2angular(PlySpinner, PlySpinnerProps))
	.component('plyAutoScroll', react2angular(AutoScroll, AutoScrollProps))
	.component('plyToggle', react2angular(PlyToggle))
	.component('plyImage', react2angular(PlyImage))
	.component('plyDropdown', react2angular(PlyDropdown));
