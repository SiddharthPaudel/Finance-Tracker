
import Category from "../models/Category.js";

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

export const deleteCategory=async(req,res)=>{
    const{categoryId}=req.params;
    try{
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({message:"Category deleted sucessfully"});
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message});
        console.log(error);
    }


}

export const updateCategory=async(req,res)=>{
    const{categoryId}=req.params;
    const{name,icon,color,budgetLimit}=req.body;
    try{
        const category=await Category.findById(categoryId)
        if(!category){
            return res.status(404).json({message:"Category not found"});
        }
        category.name=name||category.name;
        category.icon=icon||category.icon;
        category.color=color||category.color;
        category.budgetLimit=budgetLimit||category.budgetLimit;

        await category.save();
        res.status(200).json({message:"Category updated sucessfully",category});
    }
    catch(error){
        res.status(500).json({message:"Server error", error:error.message})
    }
}