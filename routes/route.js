const express = require('express');
const { imageUpload} = require('../controllers/fileupload');
const router=express.Router();

// router.post('/localfileupload',localfileupload);
router.post('/imageUpload',imageUpload);
// router.post('/check',check);
module.exports=router;