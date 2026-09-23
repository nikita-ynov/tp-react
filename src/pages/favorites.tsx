import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.tsx";
import type { RootState } from "../store/store.ts";

function Favorites() {
    const favorites = useSelector(
        (state: RootState) => state.favorites.recipes
    )

    return (
        <div className="favorites-page container">

            <h1>Mes recettes favorites</h1>

            {favorites.length === 0 && (
                <p className="favorites-empty">
                    Aucune recette favorite.
                </p>
            )}

            <div className="recipes-grid">
                {favorites.map((recipe) => (
                    <div className="recipe-item" key={recipe.id}>
                        <Link
                            className="recipe-link"
                            to={`/recipe/${recipe.id}`}
                        >
                            <div className="recipe-card">
                                <img
                                    src={recipe.image}
                                    alt={recipe.name}
                                />

                                <h2>{recipe.name}</h2>
                            </div>
                        </Link>

                        <FavoriteButton recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Favorites;