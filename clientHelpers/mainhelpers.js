
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
const name=normalize(client.name);
const email=normalize(client.email);
const phone=normalize(client.phone);
const company=normalize(client.company);
const service=normalize(client.service);
const budget=normalize(client.budget);
const urgency=normalize(client.urgency);

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
