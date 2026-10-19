const {validatecreateClient}=require('../clientHelpers/mainhelpers.js');
const {injectToCrm}=require('../crmPipeline/crmhelpers.js');
const {clientModel}=require('../models/userCreationModel.js');                                                         
exports.getcreateClientStatus=(req,res,next)=>{
return res.status(200).json({
'message':'Endpoints Works well',
})

}
exports.createClient=async (req,res,next)=>{
const client=req.body;
console.log(`${JSON.stringify(client)}`);
if(!client.name||!client.email||!client.phone||!client.company||!client.service||!client.budget||!client.urgency){
return res.status(500).json({
 'message':'Incomplete Client Information,please fill in all the details',
  })
}
const finalClient=validatecreateClient(client);
const crmResult=await injectToCrm(finalClient);

if(!crmResult || !crmResult.crmKey){
  return res.status(500).json({
    "message":"We are so sorry!Trying to fix the error",
  });
}

const {crmKey, leadStatus}=crmResult;
console.log(`Yoo we got the key ${crmKey}`);
console.log(`Jus saving to the db now`);
const clientEntry=await clientModel.create({
"name":finalClient.name,
"crmKey":crmKey,
"leadStatus":leadStatus,
"email":finalClient.email,
"company":finalClient.company,
"service":finalClient.service,
"budget":finalClient.budget,
"urgency":finalClient.urgency,
"phone":finalClient.phone,
})

if(!clientEntry){
console.log(`Internal Server Error!We are trying to fix it !`);
return res.status(500).json({
'message':`We are trying to fix the error`,
  })
}
else if(clientEntry){
console.log(`User Successfully registered!`);
return res.status(201).json({
  "message":"Success",
  "lead_status":leadStatus
})
 }
}
	
