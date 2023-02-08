import PropTypes from 'prop-types';
import { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFav({ type, index, nationality, category, alcoholicOrNot,
  name, id, image, favoriteIs }) {
  const [clipCopy, setClipCopy] = useState(false);

  const handleCopy = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setClipCopy(!clipCopy);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width={ 300 }
          height={ 250 }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <h3
          data-testid={ `${index}-horizontal-name` }
        >
          { name }

        </h3>
      </Link>

      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { type === 'meal' ? `${nationality} - ${category}`
          : `${alcoholicOrNot}` }
      </p>
      {clipCopy && (
        <p>Link copied!</p>
      )}
      <button
        type="button"
        onClick={ handleCopy }
      >

        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="recipes"
        />
      </button>
      <button
        type="button"
        onClick={ () => favoriteIs(id) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="recipes"
        />
      </button>
    </div>
  );
}

CardFav.propTypes = {
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  favoriteIs: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardFav;

// import React, { useEffect, useState } from 'react';
// import recipes from '../mock/localStorage';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

// function CardFav() {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
//     const myRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

//     setFavorites(myRecipes);
//   }, []);

//   return (
//     <div>
//       <div>
//         <button
//           data-testid="filter-by-all-btn"
//         >
//           All
//         </button>
//         <button
//           data-testid="filter-by-meal-btn"
//         >
//           Meals
//         </button>
//         <button
//           data-testid="filter-by-drink-btn"
//         >
//           Drinks
//         </button>
//       </div>

//       {favorites.length !== 0
//         ? (favorites.map((favorite, index) => {
//           if (favorite.type === 'meal') {
//             return (
//               <div key={ index }>
//                 <img
//                   src={ favorite.image }
//                   alt={ favorite.name }
//                   data-testid={ `${index}-horizontal-image` }
//                 />
//                 <h3
//                   data-testid={ `${index}-horizontal-name` }
//                 >
//                   { favorite.name }

//                 </h3>
//                 <p
//                   data-testid={ `${index}-horizontal-top-text` }
//                 >
//                   {`${favorite.nationality} - ${favorite.category}`}
//                 </p>
//                 <button>
//                   <img
//                     src={ shareIcon }
//                     alt="receita"
//                     data-testid={ `${index}-horizontal-share-btn` }
//                   />
//                 </button>
//                 <button>
//                   <img
//                     src={ blackHeartIcon }
//                     alt="receita"
//                     data-testid={ `${index}-horizontal-favorite-btn` }
//                   />
//                 </button>
//               </div>
//             );
//           }
//           if (favorite.type === 'drink') {
//             return (
//               <div key={ index }>
//                 <img
//                   src={ favorite.image }
//                   alt={ favorite.name }
//                   data-testid={ `${index}-horizontal-image` }
//                 />
//                 <h3
//                   data-testid={ `${index}-horizontal-name` }
//                 >
//                   { favorite.name }

//                 </h3>
//                 <p data-testid={ `${index}-horizontal-top-text` }>
//                   {favorite.alcoholicOrNot}
//                 </p>
//                 <button>
//                   <img
//                     src={ shareIcon }
//                     alt="receitas"
//                     data-testid={ `${index}-horizontal-share-btn` }
//                   />
//                 </button>
//                 <button>
//                   <img
//                     src={ blackHeartIcon }
//                     alt="receitas"
//                     data-testid={ `${index}-horizontal-favorite-btn` }
//                   />
//                 </button>
//               </div>
//             );
//           }
//           return null;
//         }))
//         : (<p>não encontrou receita</p>)}

//     </div>

//   );
// }

// export default CardFav;
