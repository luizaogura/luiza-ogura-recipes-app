import { useEffect, useState } from 'react';
import CardFav from '../components/CardFav';
import Header from '../components/Header';
// import recipes from '../mock/localStorage';

// a chave favoriteRecipes deve ter a estrutura abaixo no localStorage// [{
//   id: id-da-receita,
//   type: meal-ou-drink,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [selectFilter, setSelectFilter] = useState([]);

  useEffect(() => {
    // console.log(recipes);
    // localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    const recipeFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    // if (!recipeFavorites) {
    //   return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    // }
    return setFavorites(recipeFavorites);
  }, []);

  const FilterFav = (id) => {
    const newStorage = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    setFavorites(newStorage);
    setSelectFilter(newStorage);
  };

  const filterCategory = (category) => {
    console.log(typeof category);
    const newRecipes = favorites
      .filter((recipe) => recipe.type === category);
    console.log(newRecipes);
    setFavorites(newRecipes);
  };

  const resetFilterCategory = () => {
    const recipeFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setSelectFilter(recipeFavorites);
  };

  return (
    <div>
      <Header />
      <button
        onClick={ resetFilterCategory }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterCategory('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => filterCategory('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {favorites.length === 0 && (
        <p>Você não possui favoritos</p>
      )}
      {selectFilter.length > 0
        ? (selectFilter.map((favorite, index) => (
          <CardFav
            key={ index }
            index={ index }
            id={ favorite.id }
            type={ favorite.type }
            nationality={ favorite.nationality }
            category={ favorite.category }
            alcoholicOrNot={ favorite.alcoholicOrNot }
            name={ favorite.name }
            image={ favorite.image }
            favoriteIs={ FilterFav }
          />

        )))
        : (favorites.map((favorite, index) => (
          <CardFav
            key={ index }
            index={ index }
            id={ favorite.id }
            type={ favorite.type }
            nationality={ favorite.nationality }
            category={ favorite.category }
            alcoholicOrNot={ favorite.alcoholicOrNot }
            name={ favorite.name }
            image={ favorite.image }
            favoriteIs={ FilterFav }
          />

        )))}

    </div>

  );
}

export default FavoriteRecipes;

// import React from 'react';
// import CardFav from '../components/CardFav';
// import Footer from '../components/Footer';
// import Header from '../components/Header';

// function FavoriteRecipes() {
//   return (
//     <div>
//       <Header />
//       <CardFav />
//       <Footer />

//     </div>
//   );
// }

// export default FavoriteRecipes;
