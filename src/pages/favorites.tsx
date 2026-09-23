import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.tsx";
import type {RootState} from "../store/store.ts";

function Favorites() {
    const favorites = useSelector(
        (state: RootState) => state.favorites.recipes
    );

    return (
        <>
            <h1>Mes recettes favorites</h1>

            {favorites.length === 0 && (
                <p>Aucune recette favorite.</p>
            )}

            <div className="recipes-grid">
                {favorites.map((recipe) => (
                    <div key={recipe.id}>
                        <Link
                            className="recipe-link"
                            to={`/recipedetails/${recipe.id}`}
                        >
                            <div className="recipe-card">
                                <h2>{recipe.name}</h2>

                                <img
                                    src={recipe.image}
                                    alt={recipe.name}
                                />
                            </div>
                        </Link>

                        <FavoriteButton recipe={recipe}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Favorites;