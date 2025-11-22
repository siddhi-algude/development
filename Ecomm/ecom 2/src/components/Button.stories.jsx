import Button from "./Button";

export default {
  title: "Ecom/Button",
  component: Button,
  argTypes: {
    children: { control: "text" },
    variant: { control: { type: "select", options: ["primary", "secondary", "ghost"] }},
    size: { control: { type: "select", options: ["sm", "md", "lg"] }},
    disabled: { control: "boolean" },
  },
};

export const Default = {
  args: {
    children: "Add to Cart",
    variant: "primary",
    size: "md",
    disabled: false,
  },
};
