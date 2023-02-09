import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ url, index }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    clipboardCopy(url);
    setIsCopied(!isCopied);
  };

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ handleClick }
    >
      { isCopied && <p>Link copied!</p>}
      <img
        src={ shareIcon }
        alt="Button to share"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </button>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  index: PropTypes.number,
};

ShareButton.defaultProps = {
  index: 0,
};
