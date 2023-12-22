import { useState, useContext, useEffect } from "react";
import { TotalContext, ProductContext } from "../contexts/TotalsContext";

function ProductForm({ id }: { id: number }) {
  const [boxQuantity, setBoxQuantity] = useState<number>(0);
  const [outOfBoxQuantity, setOutOfBoxQuantity] = useState<number>(0);
  const [productData, setProductData] = useState<any>(null);

  const { updateProduct } = useContext(TotalContext) as ProductContext;

  useEffect(() => {
    if (productData) {
      updateProduct({
        id: id,
        name: productData.name,
        totalWeight:
          productData.weight * boxQuantity +
          productData.single * outOfBoxQuantity,
        totalCount: boxQuantity + outOfBoxQuantity,
      });
    }
  }, [productData, boxQuantity, outOfBoxQuantity]);

  return (
    <>
      <form>
        <label htmlFor="productSelection">Select Product:</label>
        <select
          name="productSelection"
          id="productSelection"
          onChange={(e) => setProductData(e.target.selectedOptions[0].dataset)}
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

        <label htmlFor="boxQuantity">Box Quantity:</label>
        <input
          id="boxQuantity"
          type="number"
          value={boxQuantity}
          min={0}
          onChange={(e) => setBoxQuantity(+e.target.value)}
        />

        <label htmlFor="outOfBoxQty">Out of Box Quantity:</label>
        <input
          id="outOfBoxQty"
          type="number"
          value={outOfBoxQuantity}
          min={0}
          onChange={(e) => setOutOfBoxQuantity(+e.target.value)}
        />
      </form>

      <div>
        <p>
          Product Quantity ={" "}
          {!productData
            ? 0
            : productData.quantity * boxQuantity + outOfBoxQuantity}
        </p>
        Pallet Weight ={" "}
        {!productData
          ? 0
          : productData.weight * boxQuantity +
            productData.single * outOfBoxQuantity}
      </div>
    </>
  );
}

export default ProductForm;
