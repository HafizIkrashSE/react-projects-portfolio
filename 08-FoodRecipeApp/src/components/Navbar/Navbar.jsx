import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);

  return (
    <header className="border-b border-orange-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-5 lg:flex-row lg:justify-between">
        
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-tight text-orange-600"
        >
          Food<span className="text-gray-900">Recipe</span>
        </NavLink>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl"
        >
          <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
            <input
              type="text"
              value={searchParam}
              onChange={(event) => setSearchParam(event.target.value)}
              placeholder="Search for a recipe..."
              className="w-full bg-transparent px-5 py-3 outline-none"
            />

            <button
              type="submit"
              className="mr-1 rounded-full bg-orange-500 px-6 py-2.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center gap-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-orange-600"
                  : "text-gray-600 hover:text-orange-500"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-orange-600"
                  : "text-gray-600 hover:text-orange-500"
              }`
            }
          >
            Favorites
          </NavLink>
        </div>
      </nav>
    </header>
  );
}