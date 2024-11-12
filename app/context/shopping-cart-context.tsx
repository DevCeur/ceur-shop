import { createContext, useEffect, useReducer } from "react";

import type { Dispatch } from "react";
import type { Product } from "~/utils/types";

export interface CartProduct extends Product {
  quantity: number;
}

interface ShoppingCartState {
  modal: { isOpen: boolean; highlightedProduct: string | null };
  products: CartProduct[];
}

type ShoppingCartReducerAction =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "INITIALIZE"; payload: { initialState: ShoppingCartState } }
  | { type: "SHOW_PRODUCT_IN_CARD"; payload: { productId: string } }
  | { type: "REMOVE_HIGHLIGHTED_PRODUCT" }
  | { type: "INCREMENT_PRODUCT_QUANTITY"; payload: { productId: string } }
  | { type: "DECREASE_PRODUCT_QUANTITY"; payload: { productId: string } }
  | {
      type: "ADD_PRODUCT";
      payload: { product: Product };
    }
  | { type: "REMOVE_PRODUCT"; payload: { productId: string } }
  | { type: "EMPTY_CART" };

const shoppingCartReducer = (
  state: ShoppingCartState,
  action: ShoppingCartReducerAction
): ShoppingCartState => {
  const newState = state;

  switch (action.type) {
    case "OPEN_MODAL": {
      return { ...newState, modal: { ...newState.modal, isOpen: true } };
    }
    case "CLOSE_MODAL": {
      return { ...newState, modal: { ...newState.modal, isOpen: false } };
    }
    case "INITIALIZE": {
      return { ...newState, ...action.payload.initialState };
    }
    case "SHOW_PRODUCT_IN_CARD": {
      return {
        ...newState,
        modal: {
          ...newState,
          isOpen: true,
          highlightedProduct: action.payload.productId,
        },
      };
    }
    case "REMOVE_HIGHLIGHTED_PRODUCT": {
      return { ...newState, modal: { ...newState.modal, highlightedProduct: null } };
    }
    case "ADD_PRODUCT": {
      const { products } = newState;

      const newProduct: CartProduct = { ...action.payload.product, quantity: 1 };

      const updatedProducts = [...products, newProduct];

      const updatedState = {
        ...newState,
        products: updatedProducts,
      };

      localStorage.setItem("cart", JSON.stringify(updatedState));

      return updatedState;
    }
    case "INCREMENT_PRODUCT_QUANTITY": {
      const updatedProducts = [...state.products].map((product) =>
        product.id === action.payload.productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

      const updatedState = { ...newState, products: updatedProducts };

      localStorage.setItem("cart", JSON.stringify(updatedState));

      return updatedState;
    }
    case "DECREASE_PRODUCT_QUANTITY": {
      const { products } = state;

      const updatedProducts = [...products].map((product) =>
        product.id === action.payload.productId
          ? {
              ...product,
              quantity: product.quantity === 0 ? product.quantity : product.quantity - 1,
            }
          : product
      );

      const updatedState = { ...newState, products: updatedProducts };

      localStorage.setItem("cart", JSON.stringify(updatedState));

      return updatedState;
    }
    case "REMOVE_PRODUCT": {
      const { products } = state;

      const updatedProducts = [...products].filter(
        (product) => product.id !== action.payload.productId
      );

      const updatedState = { ...newState, products: updatedProducts };

      localStorage.setItem("cart", JSON.stringify(updatedState));

      return updatedState;
    }
    case "EMPTY_CART": {
      const updatedState = {
        ...newState,
        products: [],
        modal: { ...newState.modal, isOpen: false },
      };

      localStorage.setItem("cart", JSON.stringify(updatedState));

      return updatedState;
    }
    default: {
      throw new Error(`Action not handled: ${action}`);
    }
  }
};

interface ShoppingCartContext extends ShoppingCartState {
  products: CartProduct[];
  subtotal: number;
  totalProducts: number;
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

const initialState: ShoppingCartState = {
  modal: { isOpen: false, highlightedProduct: null },
  products: [],
};

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  const products = state.products;
  const subtotal = state.products
    .map((product) => product.price * product.quantity)
    .reduce((acc, curr) => acc + curr, 0);
  const totalProducts = state.products
    .map((product) => product.quantity)
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
    totalProducts,
    dispatch,
    shoppingCartContainsProduct,
    getProductQuantity,
  };

  useEffect(() => {
    const cartState = JSON.parse(
      localStorage.getItem("cart") as string
    ) as ShoppingCartState;

    dispatch({
      type: "INITIALIZE",
      payload: { initialState: cartState || initialState },
    });
  }, []);

  return (
    <shoppingCartContext.Provider value={contextValue}>
      {children}
    </shoppingCartContext.Provider>
  );
};
