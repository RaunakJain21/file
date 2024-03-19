const cloudinary=require('cloudinary').v2;
const File=require('../models/file');
exports.localfileupload=async(req,res)=>{
try{
    // file uploaded to local system
    // recieved from req body.files

    const file=req.files.files;
    console.log("FILE AAGYI ",file);

    let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
    console.log("PATH->",path);

    file.mv(path,(err)=>{
        console.log(err);
    });
    res.json({
        success:true,
        message:"Local File Uploaded Succesfully",
    })
}
catch(err)
{
    res.json({
        success:false,
        message:err,
    })
}
}

async function uploadFileToCloudinary(file, folder) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    // if(quality) {
    //     options.quality = quality;
    // }

    // options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
function isFileSupported(file,supportedTypes)
{
    return supportedTypes.includes(file.name.split('.')[1]);
}
exports.imageUpload = async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        const supportedTypes=["jpg","jpeg","png"];
        
        if(!isFileSupported(file,supportedTypes))
        {
            return res.status(400).json({ 
                success:false,
                message:"File format is not supported"
            })
        }

        const response=await uploadFileToCloudinary(file,"Project1");
        console.log(response);

       await File.create({
            name,
            email,
            tags,
            imageURL:response.secure_url
        })
        res.json({
            success:true,
            message:"image uploaded to cloudinary"
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ 
            success:false,
            message:"Error while uploading the image"
        })

    }
}
exports.check = async (req,res)=>{
    try{
    const {name,email}=req.body;
    console.log(name,email);
    res.json({
        success:true,
        message:"image uploaded to cloudinary"
    })
}
catch(err){
    console.log(err);
    res.json({
        success:false,
        message:err
    })
}
}