const express = require('express');
const router = express.Router()

const {sequelize, Money} = require('./../models/index');
const { QueryTypes  } = require('sequelize');

router.get('/',async (req,res)=>{
     try{

        const result = await sequelize.query(`
                SELECT COALESCE(SUM(amount),0) as money from "Money" m where "userID" = $userID`, {
                bind: {
                    userID: req.user.id
                },
                type: QueryTypes.SELECT,
                raw: true
            });

        return res.json(result);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching money'});
    }
})

router.post('/',async (req,res)=>{
    
    try{

        const { amount} = req.body;

        const money = Money.build({   
            amount: amount,
            userID: req.user.id
        });

        await money.save();

        return res.json(money);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while adding money'});
    }
})

module.exports = router;