import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { Contexts } from "../context";

export default function ProductItem({ ind, item }) {
  const {favourites, addToFavs} = useContext(Contexts);

  return (
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/5 shadow-xl gap-5 border-2 rounded-2xl border-white">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img src={item.image_url} className="w-full" />
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <span className="relative text-sm text-cyan-700 font-medium w-full flex justify-center items-center">
            {item.publisher}
            <span className="absolute top-0 right-0 text-3xl cursor-pointer transform hover:scale-95 transition duration-300 active:scale-90" onClick={() => addToFavs(item)}>{favourites.find((x) => x.id === item.id) ? <FaHeart /> : <FaRegHeart />}</span>
          </span>
          <h3 className="text-2xl text-stone-900 font-medium w-full text-center truncate">
            {item.title}
          </h3>
        </div>
        <Link
          to={`/recipe-details/${item.id}`}
          className="transition duration-300 transform hover:scale-90 text-rose-500 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-black dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
}
