import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Recipe } from '../../types/recipe';

interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
}

const initialState: RecipeState = {
  recipes: [],
  currentRecipe: null,
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    // Met à jour la liste complète des recettes
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    // Stocke la recette sélectionnée pour le détail
    setCurrentRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.currentRecipe = action.payload;
    },
  },
});

export const { setRecipes, setCurrentRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;