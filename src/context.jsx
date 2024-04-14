import { createContext, useState } from "react";

export const Contexts = createContext({});

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [suggProds, setSuggProds] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const addToFavs = (details) => {
    if(!favourites.find((item) => item.id === details.id)) setFavourites([...favourites, details]);
    else setFavourites((favourites) => favourites.filter((item) => item.id !== details.id));
  };

  return (
    <Contexts.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        setLoading,
        errMsg,
        setErrMsg,
        suggProds,
        setSuggProds,
        favourites,
        setFavourites,
        addToFavs
      }}
    >
      {children}
    </Contexts.Provider>
  );
}
