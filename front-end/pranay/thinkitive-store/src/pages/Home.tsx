import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { FETCH_PRODUCTS } from "../redux/constants";
import { rootState } from "../redux/store";
import { productType } from "../types/productsTypes";
const ProductCard = lazy(() => import("../components/ProductCard"));
import CardSkeleton from "../components/CardSkeleton";
import { toast } from "react-toastify";
import MappedCardSkeleton from "../components/MappedCardSkeleton";

const Home = () => {
  const dispatch = useDispatch();

  const { filteredProducts, isLoading, error } = useSelector(
    (state: rootState) => state.products
  );

  useEffect(() => {
    dispatch({ type: FETCH_PRODUCTS });
  }, []);

  error && toast.error(error);

  return (
    <>
      {isLoading ? (
        <MappedCardSkeleton />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center justify-items-center w-full p-1 pt-4 gap-y-6">
          {filteredProducts.map((product: productType, index) => (
            <Suspense key={index} fallback={<CardSkeleton />}>
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                category={product.category}
                price={product.price}
                image={product.image}
                rating={product.rating}
              />
            </Suspense>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
