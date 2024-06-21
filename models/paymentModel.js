import mongoose from "mongoose";
const {Schema,model}=mongoose;
const paymentSchema=new Schema({
    oid:{
      type:"String",
      required:true,
      unique:true
    },
    name:{
        type:String,
        required:true
    },
    to_user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    message:{
        type:String
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: 'Amount must be greater than zero.'
        }
    },
    email:{
        type:String,
        required:true
    },
    done:{type:Boolean,default:false}
    },{timestamps:true});
    const Payment=mongoose.models.payments||mongoose.model("payments",paymentSchema);
    export default Payment;