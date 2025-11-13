import { formatMoney } from "../utils/money";
export default function Price({ amount, className }) {
  return <span className={className}>{formatMoney(amount)}</span>;
}
