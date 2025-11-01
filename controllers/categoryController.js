import Catrgory from "../models/Category.js";

export const addCategory=async(req,res)=>{
    const{userId,name,icon,color,budgetLimit}=req.body;
    if(!userId || !name){
        return res.status(400).json({message:"Please fill all required fields"});
    }
    try {
        const category=new Category({
            user:userId,
            name,
            icon,
            color,
            budgetLimit
        })
        await category.save();
        res.status(201).json({message:"Category added sucessfully",category})
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}


export const getCategories=async(req,res)=>{
    const{userId}=req.params;
    try{
        const category=await Category.find({user:userId});
        res.status(200).json({sucess:true,category:category})
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}
