import { useState, useContext, useEffect } from "react";
import ProductForm from "./ProductForm";
import { TotalContext, ProductContext } from "../contexts/TotalsContext";

function FormHolder() {
  const [idCount, setIdCount] = useState<number>(1);
  const { saveNewProduct, products, setProducts } = useContext(
    TotalContext
  ) as ProductContext;

  function clearHandler() {
    setIdCount(1);
    setProducts(null);
  }

  function clickHandler() {
    setIdCount(() => idCount + 1);
    saveNewProduct({
      id: idCount,
      name: null,
      totalWeight: null,
      totalCount: null,
    });
  }
  useEffect(() => {
    if (!products) {
      saveNewProduct({
        id: 0,
        name: null,
        totalWeight: null,
        totalCount: null,
      });
    }
  }, [products]);

  if (products) {
    return (
      <>
        <button onClick={clearHandler}>Clear All</button>

        {products.map((product) => {
          return <ProductForm key={product.id} id={product.id}></ProductForm>;
        })}
        <button onClick={clickHandler}>Add Additional Form</button>
      </>
    );
  }
}

export default FormHolder;
