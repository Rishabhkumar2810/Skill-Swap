function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Profile
      </h2>

      {/* Name */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Name
        </p>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {user?.name}
        </p>
      </div>

      {/* Email */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Email
        </p>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {user?.email}
        </p>
      </div>

      {/* Skills Offered */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Skills Offered
        </p>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {user?.skillsOffered?.join(", ") || "—"}
        </p>
      </div>

      {/* Skills Wanted */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Skills Wanted
        </p>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {user?.skillsWanted?.join(", ") || "—"}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
