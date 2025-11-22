export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 w-3/4" />
        <div className="h-4 bg-gray-200 w-1/2" />
        <div className="h-9 bg-gray-200 w-full rounded-xl" />
      </div>
    </div>
  );
}
