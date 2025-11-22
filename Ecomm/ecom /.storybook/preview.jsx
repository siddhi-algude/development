import { CartProvider } from "../src/context/CartContext.jsx";
import { WishlistProvider } from "../src/context/WishlistContext.jsx";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import { MemoryRouter } from "react-router-dom";

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Story />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  ),
];

export default {
  parameters: {
    layout: "centered",
  },
};
