
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'user',
    },
    cartItems:[
        {
            product:{type:mongoose.Types.ObjectId ,ref:"product"},
            quantity:{
                type:Number, 
                default:1
            },
            price:{
                type:Number,
            } 
        }
    ],
    totalPrice:Number,

},{timeStamps:true})



export const cartmodel = mongoose.model('cart',schema)