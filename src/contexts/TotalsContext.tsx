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
  saveProduct: (product: Product) => void;
  // updateProduct: (id: number) => void;
}

export const TotalContextProvider = ({ children }: TotalProps) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  const saveProduct = (product: Product) => {
    console.log(products);
    const newProduct: Product = {
      id: product.id,
      name: product.name,
      totalWeight: product.totalWeight,
      totalCount: product.totalCount,
    };

    let updatedProducts = [];

    if (products === null) {
      updatedProducts = [newProduct];
    } else {
      updatedProducts = products.map((product) => {
        if (product.id === newProduct.id) {
          return newProduct;
        } else {
          return product;
        }
      });
    }

    console.log(updatedProducts);

    setProducts(updatedProducts);
  };

  // const updateTodo = (id: number) => {
  //   products.filter((product:Product ) => {
  //     if (product.id === id) {
  //       product.status = true
  //       setProducts([...products])
  //     }
  //   })
  // }

  return (
    <TotalContext.Provider value={{ products, saveProduct }}>
      {children}
    </TotalContext.Provider>
  );
};
