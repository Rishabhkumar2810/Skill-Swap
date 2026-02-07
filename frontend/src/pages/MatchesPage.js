import Matches from "../components/Matches";

function MatchesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Matches
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View and manage your skill matches.
        </p>
      </div>

      {/* Matches List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <Matches />
      </div>
    </div>
  );
}

export default MatchesPage;
