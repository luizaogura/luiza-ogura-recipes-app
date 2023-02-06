import { useEffect, useState } from 'react';
import CardFav from '../components/CardFav';
import Header from '../components/Header';
import recipes from '../mock/localStorage';

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

  useEffect(() => {
    // console.log(recipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    const recipeFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    // if (!recipeFavorites) {
    //   return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    // }

    return setFavorites(recipeFavorites);
  }, []);

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favorites.length === 0 && (
        <p>Você não possui favoritos</p>
      )}
      {favorites.length >= 1
      && (favorites.map((favorite, index) => (
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
        />

      )))}
    </div>

  );
}

export default FavoriteRecipes;
