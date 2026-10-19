const mongoose=require('mongoose');
const {Schema,model}=mongoose;
const clientexModel=new Schema({
name:{
        type: String,
        required: true
     },
crmKey:{
        type: String,
        required: true
       },

email:{
        type: String,
        required: true
      },
company:{
        type: String,
        required: true
        },
service:{
        type: String,
        required: true
        },
budget: {
        type: String,
        required: true
        },
urgency: {
        type: String,
        required: true
        },
phone: {
        type: String,
        required: true
        },
},
{
timestamps:true
} 
);
const clientModel=model('userCreationModel',clientexModel);
module.exports={clientModel};

