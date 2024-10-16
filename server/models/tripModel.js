import mongoose from "mongoose";

const tripSchema=new mongoose.Schema({
    date:{
        type:Date,
    },
    time:{
        type:String,
    },
    startLocation:{
        type:String,
    },
    destination:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    },
    expired:{
        type:Boolean,
        default:false,
    }

})


export const Trip=new mongoose.model("Trips",tripSchema);