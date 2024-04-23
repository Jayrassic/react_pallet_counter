import { useState, useContext, useEffect, useRef } from "react";
import { TotalContext, ProductContext } from "../contexts/TotalsContext";
import { ProductDataInterface } from "../utils/interfaces";
import productCatalog from "../utils/productCatalog";

function ProductForm({ id }: { id: number }) {
  const [boxQuantity, setBoxQuantity] = useState<number>(0);
  const [outOfBoxQuantity, setOutOfBoxQuantity] = useState<number>(0);
  const [productData, setProductData] = useState<ProductDataInterface | null>(
    null
  );

  const { updateProduct } = useContext(TotalContext) as ProductContext;

  // Calculates total wight of the productData info.
  function totalWeightCalculation(
    productData: ProductDataInterface,
    boxQuantity: number,
    outOfBoxQuantity: number
  ): number {
    const boxWeight = productData.boxWeight * boxQuantity;
    const looseWeight = productData.singleWeight * outOfBoxQuantity;
    return Math.ceil(boxWeight + looseWeight);
  }

  // Calculates the total number or pieces in a product.
  function totalPiecesCalculation(
    productData: ProductDataInterface,
    boxQuantity: number,
    outOfBoxQuantity: number
  ) {
    return productData.quantityInBox * boxQuantity + outOfBoxQuantity;
  }

  /* Handlers */

  // Gathers information from DOM and sets it to the ProductData State.
  function productChangeHandler(e: React.ChangeEvent<HTMLSelectElement>): void {
    const data = JSON.parse(
      JSON.stringify(e.target.selectedOptions[0].dataset)
    );

    setProductData(data);
    updateProduct({
      id: id,
      name: data.name,
      totalWeight: totalWeightCalculation(data, boxQuantity, outOfBoxQuantity),
      totalCount: boxQuantity + outOfBoxQuantity,
    });
  }

  // Gathers value fromm box quantity input and updates product data
  function boxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (productData) {
      const data = +e.target.value;
      setBoxQuantity(data);
      updateProduct({
        id: id,
        name: productData.name,
        totalWeight: totalWeightCalculation(
          productData,
          data,
          outOfBoxQuantity
        ),
        totalCount: data + outOfBoxQuantity,
      });
    }
  }

  // Gathers value from out of box quantity input and updates product data
  function outHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (productData) {
      const data = +e.target.value;
      setOutOfBoxQuantity(data);
      updateProduct({
        id: id,
        name: productData.name,
        totalWeight: totalWeightCalculation(productData, boxQuantity, data),
        totalCount: boxQuantity + data,
      });
    }
  }

  // When form is created, focuses on the first input, otherwise scroll to top.
  useEffect(() => {
    if (firstInput.current) {
      firstInput.current.focus();
      firstInput.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Gets the first input ref to focus on creation
  const firstInput = useRef<HTMLSelectElement>(null);

  return (
    <div className="form-holder">
      <form data-testid="product-form">
        <div className="input-container">
          <label htmlFor="productSelection">Select Product:</label>
          <select
            ref={firstInput}
            name="productSelection"
            id="productSelection"
            onChange={(e) => {
              productChangeHandler(e);
            }}
          >
            <option
              id="placeholder"
              className="item"
              data-quantity="0"
              data-weight="0"
              data-single="0"
            >
              Choose an Item
            </option>
            {productCatalog.map((product: ProductDataInterface) => {
              return (
                <option
                  key={product.name}
                  id={product.name}
                  data-name={product.name}
                  data-quantity-in-box={product.quantityInBox.toString()}
                  data-box-weight={product.boxWeight.toString()}
                  data-single-weight={product.singleWeight.toString()}
                >
                  {product.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="boxQuantity">Box Quantity:</label>
          <input
            id="boxQuantity"
            type="number"
            value={boxQuantity}
            min={0}
            onChange={(e) => boxHandler(e)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="outOfBoxQty">Out of Box Quantity:</label>
          <input
            id="outOfBoxQty"
            type="number"
            value={outOfBoxQuantity}
            min={0}
            onChange={(e) => outHandler(e)}
          />
        </div>
      </form>

      <div className="totals-box">
        <p>
          Product Quantity ={" "}
          {!productData
            ? 0 + " pcs."
            : totalPiecesCalculation(
                productData,
                boxQuantity,
                outOfBoxQuantity
              ) + " pcs."}
        </p>
        <p>
          Pallet Weight ={" "}
          {!productData
            ? 0 + " lbs."
            : totalWeightCalculation(
                productData,
                boxQuantity,
                outOfBoxQuantity
              ) + " lbs."}
        </p>
      </div>
    </div>
  );
}

export default ProductForm;
