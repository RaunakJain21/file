// app create
const express = require('express');
const app = express()

// port find krna ha
require('dotenv').config();
const port=3000;

// middleware add krne ha
const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(fileUpload);

// db connect
const dbConnect = require('./config/database');
dbConnect();

// cloud connect
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// api route mount krna ha
const Upload = require('./routes/route');
app.use('/api/v1/upload',Upload);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// activate server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})