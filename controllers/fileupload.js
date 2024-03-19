const cloudinary=require('cloudinary').v2;
const File=require('../models/file');
const Video=require('../models/video');
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

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
async function uploadFileToCloudinary(file, folder,quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
function isFileSupported(file,supportedTypes)
{
    return supportedTypes.includes(file.name.split('.')[1]);
}
// function isFile(file)
// {
//     if(file.size())
// }
function isVideoSizeValid(file) {
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB in bytes
    return file.size <= maxSizeBytes;
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
        // console.log(file.size());

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

exports.videoUpload = async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        // console.log(file);

        const supportedTypes=["mp4","mkv","mov"];
        
        if(!isFileSupported(file,supportedTypes) && isVideoSizeValid(file))
        {
            return res.status(400).json({ 
                success:false,
                message:"File format is not supported"
            })
        }

        const response=await uploadFileToCloudinary(file,"Project1");
        console.log(response);

       await Video.create({
            name,
            email,
            tags,
            videoURL:response.secure_url
        })
        res.json({
            success:true,
            message:"video uploaded to cloudinary"
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ 
            success:false,
            message:"Error while uploading the video"
        })

    }
}
exports.imageReduceupload = async(req,res)=>{
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
        // console.log(file.size());

        const response=await uploadFileToCloudinary(file,"Project1",70);
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