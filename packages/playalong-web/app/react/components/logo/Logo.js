import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const logoSrc = '../../../../assets/images/plyIcon.png';
const LogoImg = styled.img`
  height: 50px;
  width: 50px;
	margin-right: 10px;
	vertical-align: middle;
`;

function PlyLogo() {
  return (
    <LogoImg src={logoSrc}></LogoImg>
  );
}

export const props = [];
export default PlyLogo;
