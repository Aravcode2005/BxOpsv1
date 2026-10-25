const express=require('express');
const router=express.Router();
const clientController=require('../controllers/client.js');
router.get('/businessOps',clientController.healthCheck);
router.get('/',clientController.homePage);                                                    
router.get('/businessOps/clientServerSignup',clientController.getClient);
router.post('/businessOps/createClient',clientController.createClient);
module.exports=router;






