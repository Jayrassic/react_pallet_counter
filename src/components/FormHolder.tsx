import { useState, useContext, useEffect, useCallback } from "react";
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

  const saveCallback = useCallback(() => {
    saveNewProduct({ id: 0, name: null, totalWeight: null, totalCount: null });
  }, [saveNewProduct]);

  useEffect(() => {
    if (!products) {
      saveCallback();
    }
  }, [products, saveCallback]);

  if (products) {
    return (
      <section className="form-section">
        {products.map((product) => {
          return <ProductForm key={product.id} id={product.id}></ProductForm>;
        })}
        <div className="btn-container">
          <button onClick={clickHandler}>Add Additional Form</button>
          <button onClick={clearHandler}>Clear All</button>
        </div>
      </section>
    );
  }
}

export default FormHolder;
