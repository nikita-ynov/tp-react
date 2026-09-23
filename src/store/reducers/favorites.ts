import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface FavoriteRecipe {
    id: number;
    name: string;
    image: string;
    prepTimeMinutes: number;
}

interface FavoritesState {
    recipes: FavoriteRecipe[];
}

const initialState: FavoritesState = {
    recipes: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<FavoriteRecipe>) => {
            const index = state.recipes.findIndex(
                recipe => recipe.id === action.payload.id
            );

            if (index === -1) {
                state.recipes.push(action.payload);
            } else {
                state.recipes.splice(index, 1);
            }
        },

        clearFavorites: state => {
            state.recipes = [];
        },
    },
});

export const {
    toggleFavorite,
    clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;