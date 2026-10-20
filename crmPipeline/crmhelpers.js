require('dotenv').config();
const  bcrypt=require('bcryptjs');
const auth = Buffer.from(`${process.env.N8N_USER}:${process.env.N8N_PASS}`).toString("base64")
const crypto=require('crypto');
async function injectToCrm(finalClient){
console.log('Injecting into the pipeline');
console.log(`${JSON.stringify(finalClient)}`);
try{
const n8nResponse =await fetch(process.env.N8N_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(finalClient),
});

console.log(n8nResponse.status);
const finalResp=await n8nResponse.text();

if(!n8nResponse.ok){
return "-1";
}
if(finalResp){
console.log(finalResp);
const encryptedKey=await bcrypt.hash(crypto.randomUUID(),12);
if(encryptedKey){
 console.log('Returning the key');
   return encryptedKey;
 }
else if(!encryptedKey){
  let gotit;
  for(let i=1;i<=5;i++){
   let finalKeyx=await bcrypt.hash(crypto.randomUUID(),12);
   if(finalKeyx){
     return finalKeyx;
   }
}
if(!gotit){
  return "-1";
 }
}
else if(!finalResp){
return "-1";
   }
 }
}
catch(error){
 console.error(error);
 return "-1";
 }
}
module.exports={injectToCrm};

