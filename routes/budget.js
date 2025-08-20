const express = require('express');
const router = express.Router()

const {Budget} = require('./../models/index');
const { Op } = require('sequelize');

router.get('/',async (req,res)=>{
     try{

        const budgets = await Budget.findAll({
            where: {
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            }
        });

        return res.json(budgets);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching budgets'});
    }
})

router.get('/:budgetID',async (req,res)=>{
     try{

        const {budgetID} = req.params;

        const budget = await Budget.findOne({   
            where: {
                id: budgetID,
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            }
        });

        return res.json(budget ?? []);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching budget'});
    }
})

router.post('/',async (req,res)=>{
    
    try{

        const {title} = req.body;

        const budget = Budget.build({   
            title: title,
            userID: req.user.id
        });

        await budget.save();

        return res.json(budget);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while creating new budget'});
    }
})

router.patch('/:budgetID',async (req,res)=>{
    
    try{

        const {budgetID} = req.params;

        let {title} = req.body;

         await Budget.update({title},{
            where: {
                id: budgetID,
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            }
        })

        return res.json({message: 'budget updated'});

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while updating user'});
    }
})

module.exports = router;