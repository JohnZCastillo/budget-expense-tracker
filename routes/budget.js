const express = require('express');
const router = express.Router()

const {Budget, BudgetDetail,BudgetVisibility} = require('./../models/index');
const { Op } = require('sequelize');

router.get('/',async (req,res)=>{
     try{

        const budgets = await Budget.findAll({
            where: {
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            },
            include: [
                {model: BudgetDetail}
            ]
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
            },
           include: [
                {model: BudgetDetail}
            ]
        });

        return res.json(budget ?? []);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching budget'});
    }
})

router.post('/',async (req,res)=>{
    
    try{

        const {title, amount, coverage, visibility} = req.body;

        const budget = Budget.build({   
            title: title,
            userID: req.user.id
        });

        await budget.save();

        if(coverage){
        
            for(const month of coverage){
                
                const budgetDetail = BudgetDetail.build({
                    amount: amount,
                    budgetID: budget.id,
                    coverage: month,
                    init: false
                })

                await budgetDetail.save();
            }
        }else{
            const budgetDetail = BudgetDetail.build({
                amount: amount,
                budgetID: budget.id,
                coverage: coverage,
                init: coverage ? false : true
            })

            await budgetDetail.save();
        }

        if(visibility){
        
            for(const visible of visibility){
                
                const budgetVisibility = BudgetVisibility.build({
                    coverage: new Date(visible.coverage),
                    categoryID: visible.categoryID,
                    budgetID: budget.id
                })

                await budgetVisibility.save();
            }
        }
     
        const saveBudget = await Budget.findOne({
            where: {
                id: budget.id,
                userID: req.user.id,
                 deleted: {
                    [Op.is]: null,     
                }
            },
           include: [
                {model: BudgetDetail}
            ]
        });

        return res.json(saveBudget);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while creating new budget'});
    }
})

router.patch('/:budgetID',async (req,res)=>{
    
    try{

        const {budgetID} = req.params;

        const {title, amount, coverage} = req.body;

         await Budget.update({title},{
            where: {
                id: budgetID,
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            }
        })

        if(coverage){
            for(const month of coverage){
               await BudgetDetail.upsert({
                    amount: amount,
                    coverage: month,
                    init: false,
                    budgetID: budgetID
                }, 
                {
                    conflictFields: ["budgetID", "init", "coverage"]
                }
            )
            }
        }else{
            await BudgetDetail.update({amount: amount}, 
                {
                    where: {
                        budgetID: budgetID,
                        init: true,
                          deleted: {
                            [Op.is]: null,     
                        }
                    }
                }
            )
        }
     
        return res.json({message: 'budget updated'});

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while updating user'});
    }
})

module.exports = router;