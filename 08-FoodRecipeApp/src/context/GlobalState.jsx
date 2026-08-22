import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const search = searchParam.trim();

    if (!search) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      setRecipeList(data?.data?.recipes || []);
      setSearchParam("");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setRecipeList([]);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToFavorite(recipe) {
    setFavoritesList((previousFavorites) => {
      const alreadyFavorite = previousFavorites.some(
        (item) => item.id === recipe.id
      );

      if (alreadyFavorite) {
        return previousFavorites.filter(
          (item) => item.id !== recipe.id
        );
      }

      return [...previousFavorites, recipe];
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        error,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        handleSubmit,
        handleAddToFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}