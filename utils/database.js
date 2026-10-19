require('dotenv').config();
const mongoose=require('mongoose');
const mongoOptions={
    serverSelectionTimeoutMS: 30000,
     connectTimeoutMS: 30000,
     socketTimeoutMS: 45000, 
     maxPoolSize: 50,
     minPoolSize: 2,  
     retryWrites: true
 }
const ConnectDB=mongoose.connect( (process.env.MONGODB_URI||'mongo://127.0.0.1:27017'),mongoOptions).then(()=>{
console.log('Connected to the database');
 }).catch((error)=>{
console.error(error);
})
mongoose.connection.on('connected',()=>{
console.log('Connected to the db');
 }
)
mongoose.connection.on('disconnected',(err)=>{
console.error(`disconnected from the db`,err);
})
mongoose.connection.on('reconnected',()=>{
console.log('Reconnected to the db');
})
module.exports=ConnectDB;
 
