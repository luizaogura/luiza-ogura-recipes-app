import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn() {
  const [shared, setShared] = useState(false);
  const location = useLocation();

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setShared(true);
  };

  return (
    <div>
      {
        shared
        && <p>Link copied!</p>
      }
      <button
        type="button"
        onClick={ handleShare }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
    </div>
  );
}

export default ShareBtn;
