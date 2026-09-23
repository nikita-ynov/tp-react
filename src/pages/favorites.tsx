import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.tsx";
import type {RootState} from "../store/store.ts";

const Favorites = () => {
    const favorites = useSelector(
        (state: RootState) => state.favorites.recipes
    );

    if (favorites.length === 0) {
        return <p>Vous n’avez aucune recette favorite.</p>;
    }

    return (
        <main>
            <h1>Mes favoris</h1>

            <div className="recipes-grid">
                {favorites.map(recipe => (
                    <article className="recipe-card" key={recipe.id}>
                        <Link to={`/recipedetails/${recipe.id}`}>
                            <img src={recipe.image} alt={recipe.name}/>
                            <h2>{recipe.name}</h2>

                            <p>
                                Préparation : {recipe.prepTimeMinutes} min
                            </p>
                        </Link>

                        <FavoriteButton recipe={recipe}/>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default Favorites;