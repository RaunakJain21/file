const express = require('express');
const { imageUpload, check, localfileupload} = require('../controllers/fileupload');
const router=express.Router();

router.post('/localfileupload',localfileupload);
router.post('/imageUpload',imageUpload);
router.post('/check',check);
router.get('/', (req, res) => {
      res.send('Hello World!')
    })
module.exports=router;