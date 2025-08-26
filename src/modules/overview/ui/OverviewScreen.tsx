import React from "react";

const OverviewScreen = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <h3 className="text-sm text-gray-300 mb-2">Current Balance</h3>
          <p className="text-2xl font-bold">$4,836.00</p>
        </div>
        <div className="bg-white border p-6 rounded-lg">
          <h3 className="text-sm text-gray-500 mb-2">Income</h3>
          <p className="text-2xl font-bold text-gray-900">$3,814.25</p>
        </div>
        <div className="bg-white border p-6 rounded-lg">
          <h3 className="text-sm text-gray-500 mb-2">Expenses</h3>
          <p className="text-2xl font-bold text-gray-900">$1,700.50</p>
        </div>
      </div>

      {/* Pots Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pots</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              See Details
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Savings</span>
              </div>
              <span className="font-semibold">$159.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Concert Ticket</span>
              </div>
              <span className="font-semibold">$110.00</span>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white border p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Emma Richardson</p>
                <p className="text-sm text-gray-500">19 Aug 2024</p>
              </div>
              <span className="font-semibold text-green-600">+$75.50</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Savory Bites Bistro</p>
                <p className="text-sm text-gray-500">19 Aug 2024</p>
              </div>
              <span className="font-semibold text-red-600">-$55.50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Budgets and Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Budgets</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              See Details
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Entertainment</span>
              </div>
              <span className="font-semibold">$50.00 of $50.00</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white border p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recurring Bills</h2>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              See Details
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Paid Bills</span>
              <span className="font-semibold">$190.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Upcoming</span>
              <span className="font-semibold">$194.98</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-600">Due Soon</span>
              <span className="font-semibold text-red-600">$59.98</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewScreen;
