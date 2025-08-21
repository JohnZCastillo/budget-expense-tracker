const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {User} = require('./../models/index');
const UserSchema = require("./../schema/user/userSchema");
const AuthSchema = require("./../schema/auth/authSchema");

const  {z} =  require('zod');

const ZodErrorParser = require('./../utils/ZodErrorParser');

router.post('/login',async (req,res)=>{
     try{

        const {email, password} =  await AuthSchema.parseAsync({ ...req.body}); 

        const user = await User.findOne({   
            attributes: ['id','name','email','password'],
            where: {
                email: email
            },
            raw: true
        });

        if(!user ){
            return res.status(401).json({message: "Incorrect email/password"});
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if(!isCorrectPassword ){
            return res.status(401).json({message: "Incorrect email/password"});
        }

        delete user.password;

        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);

        return res.json({
            user: user,
            token: token
        });

     }catch(error){
        global.reportAppError(error);

        if(error instanceof z.ZodError){
            return res.status(400).json(ZodErrorParser(error));
        }

        return res.status(500).json({message: 'something went wrong while fetching users'});
    }
})

router.post('/register',async (req,res)=>{
    try{

        const {name,email,password} = await UserSchema.parseAsync({ ...req.body}); 
        
        const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

        const user = User.build({   
            name: name,
            email: email,
            password: hashPassword
        });

        await user.save();

        delete user.password;

        return res.json(user);

    }catch(error){

        global.reportAppError(error);

        if(error instanceof z.ZodError){
            return res.status(400).json(ZodErrorParser(error));
        }
        
        return res.status(500).json({message: 'something went wrong while creating new user'});
    }
})

module.exports = router;