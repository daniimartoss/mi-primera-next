export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        <span className="text-white">Loading...</span>
      </div>
    </div>
  );
}