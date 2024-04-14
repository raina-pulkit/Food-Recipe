import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contexts } from "../../context";
import Loader from "../../components/Loader";
import ErrorDisplay from "../../components/ErrorDisplay";
import Ingredient from "./Ingredient";

export default function Details() {
  const params = useParams();
  // console.log(params);
  const id = params.id;
  const [details, setDetails] = useState(null);
  const { loading, setLoading, errMsg, setErrMsg, favourites, addToFavs } = useContext(Contexts);

  const url = "https://forkify-api.herokuapp.com/api/v2/recipes/";

  async function getDetails() {
    setLoading(true);
    setErrMsg(null);
    try {
      const res = await fetch(url + id);
      const data = await res.json();
      if (!res.ok || data.status !== "success")
        throw new Error("Error fetching products");
      if (data && data.data && data.data.recipe)
        setDetails((prev) => data.data.recipe);
      else throw new Error("Product not found");

      setLoading(false);
    } catch (e) {
      setLoading(false);
      setErrMsg(error.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    getDetails();
  }, [id]);

  useEffect(() => {console.log(favourites)}, [favourites]);

  return (
    <>
      <div className="px-4 py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {loading || !details ? (
          <Loader />
        ) : errMsg ? (
          <ErrorDisplay msg={errMsg} />
        ) : (
          <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="row-start-2 lg:row-start-auto flex flex-col gap-5">
              <div className="h-96 overflow-hidden rounded-xl group">
                <img
                  src={details.image_url}
                  className="w-full h-full object-cover block group-hover:scale-105 duration-300"
                />
              </div>
			  <div>
				<button className="text-rose-500 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-black dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 transition duration-300 transform hover:scale-90 uppercase" onClick={() => addToFavs(details)}>{
          !favourites.find((item) => item.id === details.id) ? "Save to Favourites" : "Remove from favourites"
        }</button>
			  </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xl text-cyan-700 font-medium w-full flex justify-center">
                {details.publisher}
              </span>
              <h3 className="text-2xl text-stone-900 font-medium w-full text-center truncate">
                {details.title}
              </h3>
			  <div className="flex flex-col gap-3 mt-10">
				<span>Cooking Time: {details.cooking_time} mins</span>
				<span>Serving: {details.servings}</span>
				<span className="font-bold mt-5">Ingredients</span>
				<ul>
					{details.ingredients.map((item, ind) => <Ingredient key={ind} item={item} ind={ind}/>)}
				</ul>
			  </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
