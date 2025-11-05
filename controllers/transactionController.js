import Transaction from "../models/Transaction.js";

export const addTransaction=async(req,res)=>{
    const{userId,type,amount,categoryId,note,date}=req.body;
    if(!userId || !type || !amount ){
        return res.status(400).json({message:"Please fill all required fields"});
    }
    else if(amount<=0){
        return res.status(400).json({message:"Amount should be greater than zero"})

    }
    
    try {
        const transaction=new Transaction({

            userId,
            type,
            amount,
            category:categoryId,
            note,
            date

        })
        await transaction.save();
        res.status(201).json({message:"Transaction added sucessfully",transaction})
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
    

}

export const getTransactions=async(req,res)=>{
    const{userId}=req.params;
    try{
        const transactions=await Transaction.find({userId}).populate("category","name color icon budgetLimit").sort({date:-1});
        res.status(200).json({message:"Transactions fetched sucessfully",transactions})
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }

}

export const deleteTransaction=async(req,res)=>{
    const{transactionId}=req.params;
    try{
        await Transaction.findByIdAndDelete(transactionId);
        res.status(200).json({message:"Transaction deleted sucessfully"})
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}
