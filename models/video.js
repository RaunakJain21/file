const mongoose=require('mongoose');
const VideoSchema=new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    videoURL:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }

})
const Video=mongoose.model('Video',VideoSchema);
module.exports=Video;