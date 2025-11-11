// src/components/Button.jsx
export default function Button({
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  children,
  ...rest
}) {
  const base = "btn";
  const v = `btn-${variant}`;
  const s = `btn-${size}`;
  const b = block ? "btn-block" : "";
  const classes = [base, v, s, b].join(" ");
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
