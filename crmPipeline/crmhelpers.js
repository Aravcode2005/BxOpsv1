require('dotenv').config();
const  bcrypt=require('bcryptjs');
const crypto=require('crypto');

async function injectToCrm(finalClient){
const n8nResponse =await fetch(process.env.N8N_URL,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(finalClient),
});
const data=await n8nResponse.json();
if(!data){
  return "";
 }
else if(data){
console.log(`Yooooo we got a reponse ${JSON.stringify(data)}`);
const key=crypto.randomUUID();
const encryptedKey=await bcrypt.hash(key,12);
if(encryptedKey){
return encryptedKey;
  }
 }
}
module.exports={injectToCrm};

