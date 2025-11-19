import ProductCard from "./ProductCard";

export default {
  title: "Ecom/ProductCard",
  component: ProductCard,
  argTypes: {
    title: { control: "text" },
    price: { control: "number" },
    image: { control: "text" },
    rating: { control: "number" },
    inStock: { control: "boolean" },
  }
};

export const Default = {
  args: {
    title: "Nike Air Zoom",
    price: 1999,
    image: "https://placehold.co/400",
    rating: 4.5,
    inStock: true,
  },
};
