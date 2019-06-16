const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    autor: {
        type: String,
        require:true                                                                                            
    },
    place:String,
    description:String,
    hashtags:String,
    image:String,
    dataCreate: {
        type:Date,
        default: Date.now
    },
    likes:{
        type:Number,
        default:0
    }   
},
{
    timestamps:true
});



module.exports = mongoose.model('Post', PostSchema);