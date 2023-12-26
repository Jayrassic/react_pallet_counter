import { useState, useContext, useEffect } from "react";
import { TotalContext, ProductContext } from "../contexts/TotalsContext";

export interface ProductDataInterface {
  name: string;
  quantity: number;
  single: number;
  weight: number;
}

function ProductForm({ id }: { id: number }) {
  const [boxQuantity, setBoxQuantity] = useState<number>(0);
  const [outOfBoxQuantity, setOutOfBoxQuantity] = useState<number>(0);
  const [productData, setProductData] = useState<ProductDataInterface | null>(
    null
  );

  const { updateProduct } = useContext(TotalContext) as ProductContext;

  function totalWeightCalculation(
    productData: ProductDataInterface,
    boxQuantity: number,
    outOfBoxQuantity: number
  ): number {
    const boxWeight = productData.weight * boxQuantity;
    const looseWeight = productData.single * outOfBoxQuantity;
    return boxWeight + looseWeight;
  }

  function totalPiecesCalculation(
    productData: ProductDataInterface,
    boxQuantity: number,
    outOfBoxQuantity: number
  ) {
    return productData.quantity * boxQuantity + outOfBoxQuantity;
  }

  useEffect(() => {
    if (productData) {
      updateProduct({
        id: id,
        name: productData.name,
        totalWeight: totalWeightCalculation(
          productData,
          boxQuantity,
          outOfBoxQuantity
        ),
        totalCount: boxQuantity + outOfBoxQuantity,
      });
    }
  }, [productData, boxQuantity, outOfBoxQuantity]);

  function productChangeHandler(e: React.ChangeEvent<HTMLSelectElement>): void {
    const data = JSON.parse(
      JSON.stringify(e.target.selectedOptions[0].dataset)
    );

    setProductData(data);
  }

  return (
    <div className="form-holder">
      <form>
        <div className="input-container">
          <label htmlFor="productSelection">Select Product:</label>
          <select
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
            <option
              id="ACS-12-26"
              className="item"
              data-name="ACS-12-26"
              data-quantity="50"
              data-weight="44"
              data-single=".88"
            >
              ACS-12-26
            </option>
            <option
              id="ACS-10-32S"
              className="item"
              data-name="ACS-10-32S"
              data-quantity="25"
              data-weight="20"
              data-single=".8"
            >
              ACS-10-32S
            </option>
            <option
              id="ACS-10-32B"
              className="item"
              data-name="ACS-10-32B"
              data-quantity="25"
              data-weight="33"
              data-single="1.32"
            >
              ACS-10-32B
            </option>
            <option
              id="ACS-34-15"
              className="item"
              data-name="ACS-34-15"
              data-quantity="10"
              data-weight="30"
              data-single="3"
            >
              ACS-34-15
            </option>
            <option
              id="ACS-31-15MS"
              className="item"
              data-name="ACS-31-15MS"
              data-quantity="10"
              data-weight="30"
              data-single="3"
            >
              ACS-31-15MS
            </option>
            <option
              id="ACS-12-22"
              className="item"
              data-name="ACS-12-22"
              data-quantity="50"
              data-weight="33"
              data-single=".66"
            >
              ACS-12-22
            </option>
            <option
              id="ACS-10-28"
              className="item"
              data-name="ACS-10-28"
              data-quantity="25"
              data-weight="24.3"
              data-single=".97"
            >
              ACS-10-28
            </option>
            <option
              id="ACS-10-36"
              className="item"
              data-name="ACS-10-36"
              data-quantity="25"
              data-weight="30"
              data-single="3"
            >
              ACS-10-36
            </option>
            <option
              id="ACS-10-40"
              className="item"
              data-name="ACS-10-40"
              data-quantity="25"
              data-weight="42"
              data-single="1.68"
            >
              ACS-10-32B
            </option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="boxQuantity">Box Quantity:</label>
          <input
            id="boxQuantity"
            type="number"
            value={boxQuantity}
            min={0}
            onChange={(e) => setBoxQuantity(+e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="outOfBoxQty">Out of Box Quantity:</label>
          <input
            id="outOfBoxQty"
            type="number"
            value={outOfBoxQuantity}
            min={0}
            onChange={(e) => setOutOfBoxQuantity(+e.target.value)}
          />
        </div>
      </form>

      <div className="totals-box">
        <p>
          Product Quantity ={" "}
          {!productData
            ? 0
            : totalPiecesCalculation(
                productData,
                boxQuantity,
                outOfBoxQuantity
              )}
        </p>
        Pallet Weight ={" "}
        {!productData
          ? 0
          : totalWeightCalculation(productData, boxQuantity, outOfBoxQuantity)}
      </div>
    </div>
  );
}

export default ProductForm;
