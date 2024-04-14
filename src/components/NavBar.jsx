import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Contexts } from "../context";

export default function NavBar() {
  const { searchParam, setSearchParam } = useContext(Contexts);
  const { loading, setLoading, errMsg, setErrMsg, suggProds, setSuggProds } =
    useContext(Contexts);
  const navigate = useNavigate();
  const url = "https://forkify-api.herokuapp.com/api/v2/recipes";

  async function handleSubmit(e) {
    e.preventDefault(); // Prevents the form submittion to take you to a new endpoint
    setLoading(true);
    setErrMsg(null);
    try {
      const res = await fetch(url + `?search=${searchParam}`);
      const data = await res.json();
    //   console.log(data);
      if (!res.ok || data.status !== "success")
        throw new Error("Error fetching products");
      if (data && data.data && data.data.recipes && data.data.recipes.length)
        setSuggProds((prev) => data.data.recipes);
      else throw new Error("No products found");

      setLoading(false);
      // console.log(suggProds); This doesn't print updated values
    } catch (error) {
      setLoading(false);
      setErrMsg(error.message);
    }
    setSearchParam("");
    navigate("/");
  }

  // useEffect(() => {console.log(suggProds)}, [suggProds]);

  return (
    <>
      <nav className="p-6 flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-center container mx-auto">
        <div className = "flex items-center gap-5">
          
            <NavLink
              to={"/"}
              className="text-black hover:text-grey-700 duration-300"
            >
              <img src="https://imgs.search.brave.com/jHeFfJcTlrFz9hnB83QWvnOPIjk8FvFZh6dIIO0N9n4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nb2Rlc2lnbi5u/ZXQvbG9nby9zb3Vw/LWluLWJvd2wtd2l0/aC1zbW9rZS01OTJs/ZC5wbmc_bndtPTEm/bndzPTEmaW5kdXN0/cnk9Y29va2luZyZz/Zj0" className="h-20 w-20 rounded-full" />
            </NavLink>
          <h2 className="text-2xl font-bold text-black/90">
            <NavLink
              to={"/"}
              className="text-black hover:text-grey-700 duration-300"
            >
              FoodRecipe
            </NavLink>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search-bar"
            placeholder="Search..."
            className="bg-white/75 px-8 p-3 outline-none rounded-full shadow-lg lg:w-96 shadow-red-100 focus:shadow-red-200"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </form>

        <ul className="flex gap-5">
          <li>
            <NavLink
              to={"/"}
              className="text-black hover:text-grey-700 duration-300"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/favourites"}
              className="text-black hover:text-grey-700 duration-300"
            >
              Favourites
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
