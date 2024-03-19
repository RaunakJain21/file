const express = require('express');
const { imageUpload, localfileupload, videoUpload, imageReduceupload} = require('../controllers/fileupload');
const router=express.Router();

router.post('/localfileupload',localfileupload);
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload)
router.post('/reducedimageupload',imageReduceupload);
router.get('/', (req, res) => {
      res.send('Hello World!')
    })
module.exports=router;