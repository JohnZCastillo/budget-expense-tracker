const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const {User} = require('./../models/index');

router.get('/',async (req,res)=>{
     try{

        const users = await User.findAll({   
            attributes: ['id','name','email'],
        });

        return res.json(users);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching users'});
    }
})

router.get('/:userID',async (req,res)=>{
     try{

        const {userID} = req.params;

        const user = await User.findOne({   
            attributes: ['id','name','email'],
            where: {
                id: userID
            }
        });

        return res.json(user);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching user'});
    }
})

router.post('/',async (req,res)=>{
    
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

router.patch('/:userID',async (req,res)=>{
    
    try{

        const {userID} = req.params;

        let formBody = req.body;

        if(formBody?.password){
            formBody.password = await bcrypt.hash(formBody.password, +process.env.SALT_ROUNDS);
        }

        const user = await User.update(formBody,{
            where: {
                id: userID
            }
        })

        delete user.password;

        return res.json(user);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while updating user'});
    }
})

module.exports = router;