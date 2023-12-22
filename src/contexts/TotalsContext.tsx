import { createContext, useState } from "react";

export const TotalContext = createContext<null | ProductContext>(null);

type TotalProps = { children: React.ReactNode };

export interface Product {
  id: number;
  name: string | null;
  totalWeight: number | null;
  totalCount: number | null;
}

export interface ProductContext {
  products: Product[];
  setProducts: () => void;
  saveNewProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
}

export const TotalContextProvider = ({ children }: TotalProps) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  const saveNewProduct = (product: Product): void => {
    const newProduct: Product = {
      id: product.id,
      name: product.name,
      totalWeight: product.totalWeight,
      totalCount: product.totalCount,
    };

    let updatedProducts = [];

    if (products) {
      updatedProducts = products;
      updatedProducts.push(newProduct);
    } else {
      updatedProducts.push(newProduct);
    }

    setProducts(updatedProducts);
  };

  const updateProduct = (newProduct: Product): void => {
    if (products) {
      const update: Product | undefined = products.find(
        (product: Product) => product.id === newProduct.id
      );

      if (update) {
        update.name = newProduct.name;
        update.totalWeight = newProduct.totalWeight;
        update.totalCount = newProduct.totalCount;

        const newArr = [...products];
        newArr[newProduct.id] = update;
        setProducts(newArr);
      }
    }
  };

  return (
    <TotalContext.Provider
      value={{ products, setProducts, saveNewProduct, updateProduct }}
    >
      {children}
    </TotalContext.Provider>
  );
};
