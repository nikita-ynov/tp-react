import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import type {AppDispatch, RootState} from "../store/store.ts";
import {type FavoriteRecipe, toggleFavorite} from "../store/reducers/favorites.ts";

interface FavoriteButtonProps {
    recipe: FavoriteRecipe;
}

const FavoriteButton = ({recipe}: FavoriteButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    const isFavorite = useSelector((state: RootState) =>
        state.favorites.recipes.some(
            favorite => favorite.id === recipe.id
        )
    );

    const handleClick = () => {
        if (!loggedUser) {
            navigate("/login");
            return;
        }

        dispatch(toggleFavorite(recipe));
    };

    return (
        <button type="button" onClick={handleClick}>
            {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
    );
};

export default FavoriteButton;