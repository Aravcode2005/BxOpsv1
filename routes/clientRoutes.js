const express=require('express');
const router=express.Router();
const clientController=require('../controllers/client.js');                                                    
router.get('/businessOps/clientServerSignup',clientController.getcreateClientStatus);
router.post('/businessOps/createClient',clientController.createClient);
module.exports=router;






