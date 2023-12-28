import { createContext, useState, Dispatch, SetStateAction } from "react";

export const TotalContext = createContext<null | ProductContext>(null);

type TotalProps = { children: React.ReactNode };

export interface Product {
  id: number;
  name: string | null;
  totalWeight: number | null;
  totalCount: number | null;
}

export interface ProductContext {
  products: Product[] | null;
  setProducts: Dispatch<SetStateAction<Product[] | null>>;
  saveNewProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
}

export const TotalContextProvider = ({ children }: TotalProps) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  // Used to create a new product in the products State for future modifications.
  const saveNewProduct = (product: Product): void => {
    const newProduct: Product = {
      id: product.id,
      name: product.name,
      totalWeight: product.totalWeight,
      totalCount: product.totalCount,
    };

    // Empty array used to push products into.
    let updatedProducts = [];

    if (products) {
      updatedProducts = products;
      updatedProducts.push(newProduct);
    } else {
      updatedProducts.push(newProduct);
    }

    setProducts(updatedProducts);
  };

  // Used to update a product with new information
  const updateProduct = (newProduct: Product): void => {
    if (products) {
      // Searches for product and saves data into variable.
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
