import { useContext } from "react";
import { shoppingCartContext } from "~/context/shopping-cart-context";

export const useShoppingCart = () => {
  const context = useContext(shoppingCartContext);

  if (!context) {
    throw new Error("useShoppingCart must be used withn a ShoppingCartProvider");
  }

  return context;
};
