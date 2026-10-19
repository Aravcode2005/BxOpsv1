require('dotenv').config();
const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const PORT=Number(process.env.PORT||8080);
const clientRoutes=require('./routes/clientRoutes.js')
app.use(express.json());
app.use(clientRoutes);
const connectDB=require('./utils/database.js');
app.get('/businessOps',(req,res,next)=>{
return res.status(200).json({
  'message':'We are up and running',
  'status':'Ok'
 })
}) 
connectDB.then(()=>{
   server.listen(PORT,()=>{
    console.log(`Local development url http://localhost:${PORT}`);
   })
}).catch((error)=>{
console.error(error);
})




