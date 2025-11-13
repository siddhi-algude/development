// import { cn } from "../utils/cn";

// export default function Button({ as: As = "button", className, variant = "primary", ...rest }) {
//   const styles = variant === "ghost" ? "btn-ghost" : "btn-primary";
//   return <As className={cn(styles, className)} {...rest} />;
// }

import { forwardRef } from "react";
import { cn } from "../utils/cn";

const Button = forwardRef(
  ({ as: Comp = "button", variant = "primary", className, ...props }, ref) => {
    const variantClass =
      variant === "ghost"
        ? "btn-ghost"
        : variant === "outline"
        ? "btn btn-ghost"
        : "btn-primary";

    return (
      <Comp
        ref={ref}
        className={cn(variantClass, className)}
        {...props}
      />
    );
  }
);

export default Button;
