import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "../store/store";
import { setCurrentRecipe } from "../store/reducers/recipe";
import type { Recipe } from "../types/recipe";
import Error from "./PageNotFound";

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const recipe = useSelector((state: RootState) => state.recipe.currentRecipe);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Réinitialise la recette précédente pour éviter d'afficher un ancien état
    dispatch(setCurrentRecipe(null));

    if (!id) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // Récupère la recette ciblée via son identifiant
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get<Recipe>(`https://dummyjson.com/recipes/${id}`);
        dispatch(setCurrentRecipe(response.data));
      } catch (e) {
        console.error(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, dispatch]);

  if (isLoading) {
    return <p>Chargement de la recette...</p>;
  }

  if (isError || !recipe) {
    return <Error />;
  }

  return (
    <main className="recipe-detail container">
      <img src={recipe.image} alt={recipe.name} className="recipe-detail-image" />
      <div className="recipe-detail-content">
        <h1>{recipe.name}</h1>
        <p>Temps de préparation : {recipe.prepTimeMinutes} min</p>
        <p>Temps de cuisson : {recipe.cookTimeMinutes} min</p>

        <h2>Ingrédients</h2>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </main>
  );
}