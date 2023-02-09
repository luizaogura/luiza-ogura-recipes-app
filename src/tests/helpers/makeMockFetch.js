import drinksByIngredient from '../../../cypress/mocks/drinksByIngredient';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import oneDrinkLetter from '../mocks/oneDrinkLetter';
import drinks from '../../../cypress/mocks/drinks';

export const makeMockFetch = () => {
  global.fetch = jest.fn()
    .mockImplementationOnce((url) => Promise.resolve({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken') {
          return mealsByIngredient;
        } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=light+rum') {
          return drinksByIngredient;
        } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine') {
          return drinks;
        } if (url === 'https://thecocktaildb.com/api/json/v1/1/search.php?f=a') {
          return oneDrinkLetter;
        }
      },
    }));
};
