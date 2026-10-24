require('dotenv').config();
const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const cors=require('cors');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
const rateLimiter=require('express-rate-limit');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const limiter=rateLimiter({
windowMs:15*60*1000,
limit:100,
message:{
"topic":"Too many requests,please try again after a while",
},
standardHeaders:'draft-8',
legacyHeaders:false,
ipv6Subnet:56,
})
const PORT=Number(process.env.PORT_PROD||8500);
const clientRoutes=require('./routes/clientRoutes.js');
app.set('view engine','ejs');
app.set('views','views');
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(clientRoutes);
const connectDB=require('./utils/database.js');
connectDB.then(()=>{
   server.listen(PORT,()=>{
    console.log(`Local development url http://localhost:${PORT}`);
   })
}).catch((error)=>{
console.error(error);
})




