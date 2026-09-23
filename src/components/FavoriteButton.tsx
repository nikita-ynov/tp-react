import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {type RecipeThumbnail, toggleFavorite} from "../store/reducers/favorites.ts";
import type {AppDispatch, RootState} from "../store/store.ts";

interface FavoriteButtonProps {
    recipe: RecipeThumbnail;
}

function FavoriteButton({recipe}: FavoriteButtonProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    const favorites = useSelector(
        (state: RootState) => state.favorites.recipes
    );

    const isFavorite = favorites.some(
        favorite => favorite.id === recipe.id
    );

    const handleClick = () => {
        if (!loggedUser) {
            navigate("/login");
            return;
        }

        dispatch(toggleFavorite(recipe));
    }

    return (
        <button onClick={handleClick}>
            {isFavorite
                ? "Retirer des favoris"
                : "Ajouter aux favoris"}
        </button>
    )
}

export default FavoriteButton;