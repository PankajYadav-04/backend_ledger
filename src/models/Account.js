const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["active","frozen","closed"],
            message:"Status must be either active, frozen or closed",
            
        },
        default:"active"
    },
    currency:{
        type:String,
        required:true,
        default:"INR"
    },
},{timestamps:true});

accountSchema.index({ user: 1 ,  status:1});//compound index 

module.exports = mongoose.model("Account",accountSchema);