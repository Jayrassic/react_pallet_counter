import { useContext, useEffect, useState } from "react";
import { TotalContext, ProductContext } from "../contexts/TotalsContext";

function Header() {
  const { products } = useContext(TotalContext) as ProductContext;

  const [total, setTotal] = useState(0);

  // Calculates total weight when products is modified
  useEffect(() => {
    if (products !== null) {
      let allWeight = 0;

      products.forEach((product) => {
        if (!product.totalWeight) {
          return;
        } else {
          allWeight += product.totalWeight;
        }
      });

      setTotal(allWeight);
    }
  }, [products]);

  return (
    <header>
      <h1>Pallet Counter</h1>
      <div>
        <h3>Total Weight: {total}</h3>
      </div>
    </header>
  );
}

export default Header;
