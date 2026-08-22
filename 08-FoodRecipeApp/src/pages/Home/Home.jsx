import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function Home() {
  const { recipeList, loading, error } = useContext(GlobalContext);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <section className="mb-12 text-center">
        <p className="mb-3 font-semibold uppercase tracking-widest text-orange-500">
          Discover delicious food
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Find Your Next Favorite Recipe
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Search thousands of recipes and discover something delicious to cook
          today.
        </p>
      </section>

      {loading && (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
          <p className="font-medium text-gray-600">
            Finding delicious recipes...
          </p>
        </div>
      )}

      {error && !loading && (
        <p className="py-10 text-center font-semibold text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && recipeList.length === 0 && (
        <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
          <div className="mb-4 text-6xl">🍳</div>

          <h2 className="text-2xl font-bold text-gray-900">
            No recipes yet
          </h2>

          <p className="mt-2 text-gray-500">
            Search for something like chicken, pizza, pasta, or cake.
          </p>
        </div>
      )}

      {!loading && recipeList.length > 0 && (
        <section className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipeList.map((item) => (
            <RecipeCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </main>
  );
}