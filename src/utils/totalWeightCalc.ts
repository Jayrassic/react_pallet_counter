import { ProductDataInterface } from "../components/ProductForm";

export default function totalWeightCalculation(
  productData: ProductDataInterface,
  boxQuantity: number,
  outOfBoxQuantity: number
): number {
  const boxWeight = productData.weight * boxQuantity;
  const looseWeight = productData.single * outOfBoxQuantity;
  return boxWeight + looseWeight;
}
