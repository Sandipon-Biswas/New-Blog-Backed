const mongoose = require('mongoose');
const { schema } = require('./userModel');
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true," titile is required"]
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "user id is required"],
      },
},{timestamps:true});
const blogModel = mongoose.model("Blog",blogSchema);
module.exports=blogModel;