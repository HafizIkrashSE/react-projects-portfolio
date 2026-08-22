import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export default function Details() {
  const { id } = useParams();

  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );

        const data = await response.json();

        if (data?.data?.recipe) {
          setRecipeDetailsData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch recipe details:", error);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  const recipe = recipeDetailsData?.recipe;

  if (!recipe) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  const isFavorite = favoritesList.some((item) => item.id === recipe.id);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link
        to="/"
        className="mb-8 inline-block font-semibold text-orange-500 hover:text-orange-600"
      >
        ← Back to recipes
      </Link>

      <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="h-80 lg:h-full">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-7 md:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
            {recipe.publisher}
          </p>

          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            {recipe.title}
          </h1>

          <button
            onClick={() => handleAddToFavorite(recipe)}
            className={`mt-6 rounded-xl px-6 py-3 font-semibold text-white transition ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-900 hover:bg-orange-500"
            }`}
          >
            {isFavorite ? "♥ Remove Favorite" : "♡ Add to Favorite"}
          </button>

          <div className="mt-10">
            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              Ingredients
            </h2>

            <ul className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <li
                  key={`${ingredient.description}-${index}`}
                  className="rounded-xl bg-orange-50 px-4 py-3 text-gray-700"
                >
                  <span className="font-semibold text-gray-900">
                    {ingredient.quantity || ""} {ingredient.unit || ""}
                  </span>{" "}
                  {ingredient.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}