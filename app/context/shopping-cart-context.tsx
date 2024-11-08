import { createContext, useReducer } from "react";

import type { Dispatch } from "react";
import type { Product } from "~/utils/types";

export interface CartProduct extends Product {
  quantity: number;
}

interface ShoppingCartState {
  modal: { isOpen: boolean };
  products: CartProduct[];
}

type ShoppingCartReducerAction =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "INCREMENT_PRODUCT_QUANTITY"; payload: { productId: string } }
  | { type: "DECREASE_PRODUCT_QUANTITY"; payload: { productId: string } }
  | {
      type: "ADD_PRODUCT";
      payload: { product: Product };
    }
  | { type: "REMOVE_PRODUCT"; payload: { productId: string } };

const shoppingCartReducer = (
  state: ShoppingCartState,
  action: ShoppingCartReducerAction
): ShoppingCartState => {
  const newState = state;

  switch (action.type) {
    case "OPEN_MODAL": {
      return { ...newState, modal: { isOpen: true } };
    }
    case "CLOSE_MODAL": {
      return { ...newState, modal: { isOpen: false } };
    }
    case "ADD_PRODUCT": {
      const products = newState.products;

      const newProduct: CartProduct = { ...action.payload.product, quantity: 1 };

      return {
        ...newState,
        products: [...products, newProduct],
      };
    }
    case "INCREMENT_PRODUCT_QUANTITY": {
      const newProducts = [...state.products].map((product) =>
        product.id === action.payload.productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

      return { ...newState, products: newProducts };
    }
    case "DECREASE_PRODUCT_QUANTITY": {
      const newProducts = [...state.products].map((product) =>
        product.id === action.payload.productId
          ? {
              ...product,
              quantity: product.quantity === 0 ? product.quantity : product.quantity - 1,
            }
          : product
      );

      return { ...newState, products: newProducts };
    }
    case "REMOVE_PRODUCT": {
      const newProducts = [...state.products].filter(
        (product) => product.id !== action.payload.productId
      );

      return { ...newState, products: newProducts };
    }
    default: {
      throw new Error(`Action not handled: ${action}`);
    }
  }
};

interface ShoppingCartContext {
  modal: { isOpen: boolean };
  products: CartProduct[];
  subtotal: number;
  dispatch: Dispatch<ShoppingCartReducerAction>;
  getProductQuantity: ({ product }: { product: Product }) => number;
  shoppingCartContainsProduct: ({ product }: { product: Product }) => boolean;
}

export const shoppingCartContext = createContext<ShoppingCartContext | undefined>(
  undefined
);

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    modal: { isOpen: false },
    products: [],
  });

  const products = state.products;
  const subtotal = state.products
    .map((product) => product.price.value)
    .reduce((acc, curr) => acc + curr, 0);

  const getProductQuantity = ({ product }: { product: Product }): number => {
    const productFound = state.products.find(({ id }) => id === product.id);

    return productFound?.quantity || 0;
  };

  const shoppingCartContainsProduct = ({ product }: { product: Product }): boolean => {
    const isProductInShoppingCart = !!state.products.find(({ id }) => id === product.id);

    return isProductInShoppingCart;
  };

  const contextValue: ShoppingCartContext = {
    modal: state.modal,
    products,
    subtotal,
    dispatch,
    shoppingCartContainsProduct,
    getProductQuantity,
  };

  return (
    <shoppingCartContext.Provider value={contextValue}>
      {children}
    </shoppingCartContext.Provider>
  );
};
