import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';
import FavoriteButton from './FavoriteButton';

interface RecipeCardProps {
  recipe: Recipe;
}

// Affiche la carte d'aperçu d'une recette
export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card-item">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card">
        <img src={recipe.image} alt={recipe.name} />
        <h3>{recipe.name}</h3>
        <p>Temps de préparation : {recipe.prepTimeMinutes} min</p>
        <p>Cuisson : {recipe.cookTimeMinutes} min</p>
      </Link>
      <FavoriteButton recipe={recipe} />
    </article>
  );
}