import { React, useState, useEffect } from 'react';
// import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipesToRender, setRecipesToRender] = useState(doneRecipes);
  const [filterButton, setFilterButton] = useState('clear');

  const handleFilterClick = ({ target: { name } }) => {
    setFilterButton(name);
  };

  const filtering = (filter) => {
    const recipesFiltered = {
      clear: doneRecipes,
      meal: doneRecipes.filter((recipe) => recipe.type === 'meal'),
      drink: doneRecipes.filter((recipe) => recipe.type === 'drink'),
    };
    return recipesFiltered[filter];
  };

  useEffect(() => {
    setRecipesToRender(filtering(filterButton));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterButton]);

  return (
    <div>

      <button
        data-testid="filter-by-all-btn"
        name="clear"
        onClick={ handleFilterClick }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ handleFilterClick }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ handleFilterClick }
      >
        Drinks
      </button>
      { doneRecipes && recipesToRender.map((recipe, index) => (
        <CardDoneRecipes
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
        />))}
    </div>

  );
}

export default DoneRecipes;
