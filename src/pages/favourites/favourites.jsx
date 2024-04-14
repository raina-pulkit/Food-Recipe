import { useContext } from "react"
import { Contexts } from "../../context"
import Loader from "../../components/Loader";
import ErrorDisplay from "../../components/ErrorDisplay";
import ProductItem from "../../components/ProductItem";


export default function Favourites(){
	const {favourites, loading, errMsg} = useContext(Contexts);

	return (
    <>
      <div className="px-4 py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {loading ? (
          <Loader />
        ) : errMsg ? (
          <ErrorDisplay msg={errMsg} />
        ) : favourites.length ? (
          favourites.map((item, ind) => (
            <div key={ind}>
              <ProductItem ind={ind} item={item} />
            </div>
          ))
        ) : (
          <div className="lg:text-4xl text-3xl text-center text-black font-extrabold">
            Nothing to show! Add recipes to favourites to display here!
          </div>
        )}
      </div>
    </>
  );
}