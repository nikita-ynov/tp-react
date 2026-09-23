import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "./store/store";
import { setRecipes } from "./store/reducers/recipe";
import type { RecipesResponse } from "./types/recipe";
import RecipeCard from "./components/RecipeCard";
import "./App.css";

// Affiche la liste d'accueil des recettes stockées dans le store Redux
function App() {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const [isLoading, setIsLoading] = useState(recipes.length === 0);

  useEffect(() => {
    // Évite de refaire la requête si les recettes sont déjà dans Redux
    if (recipes.length > 0) return;

    (async () => {
      try {
        const response = await axios.get<RecipesResponse>("https://dummyjson.com/recipes");
        dispatch(setRecipes(response.data.recipes));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, recipes.length]);

  return (
    <main className="home">
      <header className="home-header">
        <h1>Nos Recettes</h1>
      </header>

      {isLoading ? (
        <p>Chargement des recettes...</p>
      ) : (
        <section className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;