import mongoose  from "mongoose";

const categorySchema=new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
name:{type:String, required:true},
icon:{type:String},
color:{type:String},
budgetLimit:{type:Number, default:0}
})

const Category=mongoose.model("Category",categorySchema);
export default Category;