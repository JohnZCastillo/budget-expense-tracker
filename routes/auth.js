const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {User} = require('./../models/index');
const { where } = require('sequelize');
const { raw } = require('body-parser');

router.post('/login',async (req,res)=>{
     try{

        const {email, password} = req.body;

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

        console.log('user before deletion: ', user);
        delete user.password;

        console.log('user after deletion: ', user);

        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);

        return res.json({token: token});

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching users'});
    }
})

router.post('/register',async (req,res)=>{
    try{
        const {name,email,password} = req.body;

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
        return res.status(500).json({message: 'something went wrong while creating new user'});
    }
})

module.exports = router;