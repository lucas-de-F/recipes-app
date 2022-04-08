import React from 'react';
import PropTypes from 'prop-types';

function Video({ strYoutube }) {
  const link = strYoutube.split(/v=/i);
  return (
    <iframe data-testid="video" width="339px" height="50%" src={ `https://www.youtube.com/embed/${link[1]}` } title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
  );
}

Video.propTypes = {
  strYoutube: PropTypes.string.isRequired,
};

export default Video;
