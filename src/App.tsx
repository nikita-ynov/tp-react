import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "./store/store";
import { setRecipes } from "./store/reducers/recipe";
import type { RecipesResponse } from "./types/recipe";
import type { Quote } from "./types/quote";
import RecipeCard from "./components/RecipeCard";
import "./styles/App.css";

const getDailyQuoteId = () => {
  const dayOfMonth = new Date().getDate();

  return dayOfMonth === 31
    ? Math.floor(Math.random() * 30) + 1
    : dayOfMonth;
};

// Affiche la liste d'accueil des recettes stockées dans le store Redux
function App() {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const [isLoading, setIsLoading] = useState(recipes.length === 0);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(true);

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

  useEffect(() => {
    const fetchDailyQuote = async () => {
      try {
        const quoteId = getDailyQuoteId();
        const response = await axios.get<Quote>(
          `https://dummyjson.com/quotes/${quoteId}`
        );

        setQuote(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsQuoteLoading(false);
      }
    };

    fetchDailyQuote();
  }, []);

  return (
    <main className="home">
      <header className="home-header">
        <h1>Nos Recettes</h1>
      </header>

      <section className="daily-quote" aria-live="polite">
        {isQuoteLoading ? (
          <p>Chargement de la citation...</p>
        ) : quote ? (
          <>
            <p className="daily-quote-text">“{quote.quote}”</p>
            <p className="daily-quote-author">— {quote.author}</p>
          </>
        ) : (
          <p>La citation du jour est indisponible.</p>
        )}
      </section>

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