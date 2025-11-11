
// ListView component keys n lists
export default function ListView({ items }) {
  return (
    <div>
        <ul>
        { items.map((item) => (
          <li key= {item}>{item}</li> // works only when items are unique
        ))}
        </ul>
    
    </div>
  );
} 