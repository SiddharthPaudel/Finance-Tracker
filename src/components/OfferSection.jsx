import React from "react";
import expense from "../images/expenses.png"
import saving from "../images/savings.png"
import data from "../images/data-visualization.png"

const OfferSection = () => {
  return (
    <section className="bg-white py-16 px-8">
      {/* Section Title */}
      {/* <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        What We Offer
      </h2> */}

      {/* Long Horizontal Box */}
      <div className="bg-white-500 rounded-2xl  flex flex-col md:flex-row justify-around items-center p-10 space-y-8 md:space-y-0 md:space-x-10">
        {/* Feature 1 */}
        <div className="text-center max-w-sm">
          <img
            src={expense}
            alt="Expense Tracking"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Smart Expense Tracking
          </h3>
          <p className="text-gray-600">
            Easily monitor your daily, weekly, and monthly expenses with visual
            analytics and breakdowns.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="text-center max-w-sm">
          <img
            src={saving}
            alt="Budget Planning"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            AI Savings Suggestions
          </h3>
          <p className="text-gray-600">
            Set personalized saving goals and monthly budgets to stay on track
            with your financial targets.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="text-center max-w-sm">
          <img
            src={data}
            alt="Insights"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
           Insights & Reports
          </h3>
          <p className="text-gray-600">
            Get detailed insights and reports on your financial habits to make
            smarter investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
