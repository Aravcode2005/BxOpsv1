
function isAlphanumeric(x){
if(x>='a' && x <='z' || x>='A' && x<='Z' || x>='0' && x<='9' || x==='!' || x==='@'||x==='#'||x==='$'||x==='+'||x==='-'||x==='.'){
return true;
 }
return false;
}

function isValidEmail(email){
return (
typeof email==='string' && 
email.length<=254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 );
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
const city=normalize(client.city);
let email;
if(isValidEmail(client.email)){
email=client.email;
}
else if(!isValidEmail(client.email)){
   return "-1";
}
const phone=normalize(client.phone);
const company=normalize(client.company);
const service=(client.service).toLowerCase();
const budget=client.budget;
const urgency=(client.urgency).toLowerCase();
const processedRequest={
"name":name,
"city":city,
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
