import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams();
  // console.log(id);
  return (
    <>
      <div>
        <p>{`este id precisa ser mudado ${id}`}</p>
        <img
          data-testid="recipe-photo"
          src=""
          alt="recipe"
        />
        <button
          data-testid="share-btn"
          name="shareBtn"
        >
          Share
        </button>
        <button
          data-testid="favorite-btn"
          name="favoriteBtn"
        >
          Favorites
        </button>
        <h3 data-testid="recipe-title">Recipe in Progress</h3>
        <span data-testid="recipe-category">Category</span>
      </div>
      <h5 data-testid="instructions">Instructions</h5>
      <div>
        <button
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>
      </div>
    </>
  );
}

export default RecipeInProgress;
