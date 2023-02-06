import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFav({ index, nationality, category,
  name, image }) {
  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <h3
        data-testid={ `${index}-horizontal-name` }
      >
        { name }

      </h3>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${nationality} - ${category}` }

      </p>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img src={ shareIcon } alt="recipes" />
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
      >
        <img src={ blackHeartIcon } alt="recipes" />
      </button>
    </div>
  );
}

CardFav.propTypes = {
  category: PropTypes.string.isRequired,
  // alcoholicOrNot: PropTypes.string.isRequired,
  // id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
};

export default CardFav;
