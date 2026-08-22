import { Link } from "react-router-dom";

export default function RecipeCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-56 overflow-hidden">
        <img
          src={item?.image_url}
          alt={item?.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
          {item?.publisher}
        </p>

        <h2 className="mb-4 line-clamp-2 min-h-14 text-xl font-bold text-gray-900">
          {item?.title}
        </h2>

        <Link
          to={`/recipe-item/${item?.id}`}
          className="inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
        >
          View Recipe
        </Link>
      </div>
    </article>
  );
}