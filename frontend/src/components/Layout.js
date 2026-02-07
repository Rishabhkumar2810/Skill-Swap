function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold text-blue-600">
          SkillSwap
        </h1>
        <span className="text-sm text-gray-500">
          Learn by exchanging skills
        </span>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
}

export default Layout;
