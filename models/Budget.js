import mongoose from mongoose;

const budgetSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref: "User",required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category",reqiuired:true},
    amount:{type:Number,required:true},
    period:{type:String,enum:["monthly","weekly","yearly"],default:"monthly"},
    startDate:{type:Date, default:Date.now}
    
    }
)

const Budget=mongoose.model("Budget",budgetSchema);
export default Budget;