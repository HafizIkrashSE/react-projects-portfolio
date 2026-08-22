import { useContext } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { GlobalContext } from "../../context/GlobalContext";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-10 text-center">
        <p className="font-semibold uppercase tracking-widest text-orange-500">
          Your collection
        </p>

        <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
          Favorite Recipes
        </h1>
      </div>

      {favoritesList.length === 0 ? (
        <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
          <div className="mb-4 text-6xl">❤️</div>

          <h2 className="text-2xl font-bold text-gray-900">
            No favorites yet
          </h2>

          <p className="mt-2 text-gray-500">
            Add recipes to your favorites and they will appear here.
          </p>
        </div>
      ) : (
        <section className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoritesList.map((item) => (
            <RecipeCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </main>
  );
}