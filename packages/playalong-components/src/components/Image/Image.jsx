import 'lazysizes/lazysizes.min.js';
import * as React from 'react';
import styled from 'styled-components';
import { string, oneOf } from 'prop-types';

PlyImage.propTypes = {
  src: string.isRequired,
  alt: string,
  type: oneOf(['avatar']),
  height: string,
  width: string,
}

function PlyImage({
  src,
  alt = 'No Image Available',
  type = '',
  height = 'auto',
  width = 'auto',
}) {

  const ImageComp = styled.img`
    height: ${height};
    width: ${width};
    &.avatar {
      border-radius: 50%;
    }
  `;

  return (
    <ImageComp
      className={`lazyload ${type.toLowerCase()}`}
      data-src={src}
      alt={alt}
    />
  );
}

export const props = ['isActive'];
export default PlyImage;
