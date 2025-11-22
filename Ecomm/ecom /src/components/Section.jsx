// export default function Section({ title, action, children }) {
//   return (
//     <section className="space-y-3">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         {action}
//       </div>
//       {children}
//     </section>
//   );
// }

export default function Section({ title, children, className }) {
  return (
    <div className={`mt-10 ${className || ""}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
