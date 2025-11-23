const express = require('express');
const router = express.Router()

const {Expense} = require('./../models/index');

const ManyExpenseSchema = require("./../schema/expense/manyExpenseSchema");
const  {z} =  require('zod');
const ZodErrorParser = require('./../utils/ZodErrorParser');


router.post('/',async (req,res)=>{
     try{
              
        const expenses = await ManyExpenseSchema.parseAsync([ ...req.body.expenses]); 
        
        await Expense.bulkCreate(expenses);

        return res.json({message: 'expenses added successfully'});

     }catch(error){

        global.reportAppError(error);

        if(error instanceof z.ZodError){
            return res.status(400).json(ZodErrorParser(error));
        }

        return res.status(500).json({message: 'something went wrong while creating expense'});
    }
})

module.exports = router;