import Transaction from "../models/Transaction.js";

export const getDashboardSummary = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId });

    let totalIncome = 0;
    let totalExpense = 0;
    let totalpocketMoney=0;

    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else if (t.type === "pocketMoney") totalpocketMoney += t.amount;
      else if (t.type === "expense") totalExpense += t.amount;
    });

    // If no income recorded, avoid showing negative balance
    let balance = totalIncome + totalpocketMoney - totalExpense;
    let message = "Dashboard summary fetched successfully";

    if (totalIncome === 0 || totalpocketMoney ===0 && totalExpense > 0) {
      
      message = "Add income to calculate your balance accurately";
    }

    res.status(200).json({
      message,
      totalIncome ,
      totalpocketMoney,
      totalExpense,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching summary",
      error: error.message,
    });
  }
};
