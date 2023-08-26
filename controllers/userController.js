const userModel =require('../models/userModel');
const bcrypt = require('bcrypt');
const  getAllUsers =async(req,res)=>{
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:"all users data",
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status({
            success:false,
            message:"error get in all user",
            error
        })
    }
};
const registerController= async (req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:'please fill all fields'
            });
        }
        const exisitingUser = await userModel.findOne({email});
        if (exisitingUser) {
            return res.status(401).send({
                success:false,
                message:'user already exisits'
            });
        }
        const hashpassword = await bcrypt.hash(password,10);
   
        const user = new userModel({ username,email,password:hashpassword});
        await user.save();
        return res.status(201).send({
            success:true,
            message:"New user Created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:'error in register callback',
            success:false,
            error
        })
    }
};
const loginController =async(req,res)=>{
    try {
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(400).send({
                success:false,
                message:"Not provide email and password",
            })
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(500).send({
                success:false,
                message:"Error in login callback",
                error
            })
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Invlid username or password'
            })
        }
        return res.status(200).send({
            success:true,
            message:"login successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in login callback",
            error
        })
    }
};
module.exports={getAllUsers , registerController, loginController}

