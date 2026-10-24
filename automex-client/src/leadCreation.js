import contracts from "./apiContract.json";
const production = import.meta.env.VITE_PROD;
const SERVER_URL = production==="1"?import.meta.env.VITE_PROD_SERVER_URL:import.meta.env.VITE_DEV_SERVER_URL;
const PORT = production==="1"?import.meta.env.VITE_PROD_PORT:import.meta.env.VITE_DEV_PORT;
function constructURL(name) {
  const path = contracts?.endpoints?.[name];
  
  if (!path || typeof path !== "string") {
    throw new Error(
      `Missing endpoints.${name} in apiContract.json`
    );
  }
  if (!SERVER_URL) {
    throw new Error(
      `Missing ${production==="1"?VITE_PROD_SERVER_URL:VITE_DEV_SERVER_URL}`
    );
  }
  console.log(`We  have the url with us ${SERVER_URL}`);
  if(!PORT){
    throw new Error(
      `Missing ${production==="1"?VITE_PROD_PORT:VITE_DEV_PORT}`
    );
  }
  let portedUrl;
  try{
  portedUrl= SERVER_URL+PORT;
  }
  catch(error){
   throw new Error(error);
  }
   
  if(portedUrl){
     console.log(`Added the port ${portedUrl}`);
  }

  let constructedUrl;
  try{
  constructedUrl=new URL(path,portedUrl);
   console.log(`We have the final url now ${constructedUrl}`);
  }
  catch(error){
  throw new Error(error);
  }
   return constructedUrl?constructedUrl:"";
}

export async function homePage() {
  try{
  const requestHomePage=await fetch(constructURL("homePage"),{
   method:"GET",
   headers:{ 
    "Content-Type":"application/json"
   },
  });
  
  const canRenderPage=await requestHomePage.json();
   if(!canRenderPage.ok){
     return "-1";
   }
   else {
    return "ok";
   }
 }

 catch(error){ 
  throw new Error(error);
  }
}

export async function healthCheck() {
 try{
  const performHealthCheck=await fetch(constructURL("healthCheck") ,{
   method:"GET",
   headers:{ 
    "Content-Type":"application/json"
   },
  });

  
  const healthCheck=await performHealthCheck.json(); 
   if(!healthCheck.ok){
     return "-1";
   }
   else {
    return "ok";
   }
 }
  catch(error){
   throw new Error(error);
  }
}
export async function getLeadPage() {
  
 try{
  const requestLeadPage=await fetch(constructURL("getcreateClient"),{
   method:"GET",
   headers:{ 
   "Content-Type":"application/json"
   },
 });  
  const canRenderLeadPage=await requestLeadPage.json(); 
   if(!canRenderLeadPage.ok){
     return "-1";
   }
   else {
    return "ok";
   }
 }
  catch(error){
  throw new Error(error);
  }
}
export async function createLead(body) {
  try{
   const createClient=await fetch(constructURL("createClient"),{
   method:"POST",
   headers:{ 
    "Content-Type":"application/json"
    },
   body:JSON.stringify(body),
  });
  const createClientInfo=await createClient.json(); 
   if(!createClientInfo.ok){
     return "-1";
   }
   else {
    return "ok";
   }
 }
   catch(error){
    throw new Error(error);
   }
}
