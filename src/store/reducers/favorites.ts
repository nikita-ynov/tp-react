import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface RecipeThumbnail {
    id : number;
    name: string;
    prepTimeMinutes: number;
    image: string;
}

interface FavoriteState {
    recipes: RecipeThumbnail[];
}

const initialState: FavoriteState = {
    recipes: [],
}

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<RecipeThumbnail>) => {
            const recipeExist = state.recipes.find(
                recipe => recipe.id === action.payload.id
            );

            if (recipeExist) {
                state.recipes = state.recipes.filter(
                    recipe => recipe.id !== action.payload.id
                );
            } else {
                state.recipes.push(action.payload);
            }
        },
        clearFavorites: (state) => {
            state.recipes = [];
        }
    }
})

export const {toggleFavorite, clearFavorites} = favoriteSlice.actions;

export default favoriteSlice.reducer;