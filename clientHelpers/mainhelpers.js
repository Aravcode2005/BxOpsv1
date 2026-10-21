function isAlphanumeric(x){

if(x>='a' && x <='z' || x>='A' && x<='Z' || x>='0' && x<='9' || x==='!' || x==='@'||x==='#'||x==='$'||x==='+'||x==='-'){
return true;
 }
return false;
}
function normalize(str){
let normalizedstring="";
for(let i=0;i<str.length;i++){
if(isAlphanumeric(str.charAt(i))){
  normalizedstring+=str.charAt(i);
 }
}
return normalizedstring.toLowerCase();
}

function validatecreateClient(client){
const name=String(client.name).trim();
const email=String(client.email).trim().toLowerCase();
const phone=String(client.phone).trim();
const company=String(client.company).trim();
const service=String(client.service).trim();
const budget=Number(client.budget);
const urgency=String(client.urgency).trim().toLowerCase();

const processedRequest={
"name":name,
"email":email,
"phone":phone,
"company":company,
"service":service,
"budget":budget,
"urgency":urgency,
 }
return processedRequest;
}
module.exports={validatecreateClient};
