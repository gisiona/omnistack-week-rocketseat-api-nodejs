const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    autor: String,
    place:String,
    description:String,
    hashtags:String,
    image:String,
    likes:{
        type:Number,
        default:0
    }   
},
{
    timestamps:true
});



module.exports = mongoose.model('Post', PostSchema);