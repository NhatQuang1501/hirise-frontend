export const BatchMatchingProgress = ({
  elapsedTime,
  totalApplications,
}: {
  elapsedTime: number;
  totalApplications: number;
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Analyzing applications...</span>
          <span className="text-blue-600">{elapsedTime}s elapsed</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
            style={{
              width: `${Math.min((elapsedTime / 30) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-center text-sm text-gray-500">
          Processing {totalApplications} applications... This may take a few minutes
        </p>
      </div>
    </div>
  );
};
