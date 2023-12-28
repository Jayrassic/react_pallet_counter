import { useState, useContext, useEffect } from "react";
import ProductForm from "./ProductForm";
import { TotalContext, ProductContext } from "../contexts/TotalsContext";

function FormHolder() {
  const [idCount, setIdCount] = useState<number>(1);
  const { saveNewProduct, products, setProducts } = useContext(
    TotalContext
  ) as ProductContext;

  // Uses to rest the state of the app.
  function clearHandler() {
    setIdCount(1);
    setProducts(null);
  }

  // Used to add progress idCount and save product to the products context.
  function clickHandler() {
    setIdCount(() => idCount + 1);
    saveNewProduct({
      id: idCount,
      name: null,
      totalWeight: null,
      totalCount: null,
    });
  }

  // Watch products to see if it is empty. Resets to a single product if it is.
  useEffect(() => {
    if (!products) {
      saveNewProduct({
        id: 0,
        name: null,
        totalWeight: null,
        totalCount: null,
      });
    }
  }, [products, saveNewProduct]);

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
