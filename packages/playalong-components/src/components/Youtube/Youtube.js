import * as React from 'react';
import 'lazysizes/lazysizes.min.js';
import PropTypes from 'prop-types';

Youtube.propTypes = {
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  videoId: PropTypes.string.isRequired,
}

const defaultProps = {
  id: 'plyYoutubeIframe',
  width: 300,
  height: 150,
};

const youtubePrefix = 'https://www.youtube.com/embed/';

function buildVideoId(videoId) {
  return youtubePrefix + videoId;
}

function Youtube({
  id = defaultProps.id,
  width = defaultProps.width,
  height = defaultProps.height,
  videoId,
}) {

  return (
    <iframe
      title="playalong youtube"
      id={id}
      className={'lazyload'}
      width={width}
      height={height}
      data-src={buildVideoId(videoId)}
      frameBorder='0'
      allowFullScreen
    >
    </iframe>
  );
}

export const props = ['id', 'width', 'height', 'videoId'];
export default Youtube;
