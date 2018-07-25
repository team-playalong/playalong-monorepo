import * as React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const TitleComp = styled.h1`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: .005em;
  font-family: Roboto;
`;

Title.propTypes = {
  text: string
};
function Title ({ text = '' }) {
  return <TitleComp>{text}</TitleComp>;
}

export const props = ['text'];
export default Title;
