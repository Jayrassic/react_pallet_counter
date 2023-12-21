import { createContext, useState, Dispatch, SetStateAction } from "react";

// export const TotalContext = createContext<ProductContext | null>(null);

// type TotalProps = { children: React.ReactNode };

// interface Product {
//   productName: string;
//   totalWeight: number;
//   totalCount: number;
// }

// type ProductContext = [Product[], Dispatch<SetStateAction<Product[]>>];

// export const TotalContextProvider = ({ children }: TotalProps) => {
//   const [products, setProducts] = useState<Product[]>([]);

//   return (
//     <TotalContext.Provider value={[products, setProducts]}>
//       {children}
//     </TotalContext.Provider>
//   );
// };

export const TotalContext = createContext<ProductContext | null>(null);

type TotalProps = { children: React.ReactNode };

export interface Product {
  id: number;
  name: string;
  totalWeight: number;
  totalCount: number;
}

export interface ProductContext {
  products: Product[];
  setProducts: () => void;
  saveNewProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
}

export const TotalContextProvider = ({ children }: TotalProps) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  const saveNewProduct = (product: Product) => {
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

  const updateProduct = (
    id: number
    // name: string,
    // totalWeight: number,
    // totalCount: number
  ) => {
    if (products) {
      const update = products.find((product: Product) => product.id === id.id);

      update.name = id.name;
      update.totalWeight = id.totalWeight;
      update.totalCount = id.totalCount;

      const newArr = [...products];
      newArr[id.id] = update;
      setProducts(newArr);
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
