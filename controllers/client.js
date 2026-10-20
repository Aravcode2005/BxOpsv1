const {validatecreateClient}=require('../clientHelpers/mainhelpers.js');
const {clientModel}=require('../models/userCreationModel.js');
const {injectToCrm}=require('../crmPipeline/crmhelpers.js');
exports.getClient=(req,res,next)=>{
return res.status(200).json({
  "message":"We are up and running"
 })
}
exports.createClient = async (req, res, next) => {
  const client = req.body;
  console.log(`${JSON.stringify(client)}`);

  if (!client.name || !client.email || !client.phone || !client.company || !client.service || !client.budget || !client.urgency) {
    return res.status(400).json({
      message: 'Incomplete Client Information,please fill in all the details',
    });
  }

  let finalClient;
  try {
    finalClient = validatecreateClient(client);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ "User saved": "No" });
  }
 const crmKey=await injectToCrm(finalClient);

if(crmKey!=="-1"){
console.log(`yoo we got the key ${crmKey}`);
try{

const info={
 name: finalClient.name,
 crmKey: crmKey,
 email: finalClient.email,
 company: finalClient.company,
 service: finalClient.service,
 budget: finalClient.budget,
 urgency: finalClient.urgency,
 phone: finalClient.phone,
    }






const saveProfile=await clientModel.create(info);
 if(saveProfile){
  console.log(`Saved ${saveProfile}`);
   return res.status(200).json({
     "message":"Yoooo"
    })
 }
 

else if(!saveProfile){
   console.log(`Noo`); 
   return res.status(400).json({
     "message":"no"
    })
}

}

catch(error){
console.error(`Error is ${error} `);
   return res.status(500).json({
     "message":"Internal Server Error"
    })
  }
 }
};

