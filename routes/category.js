const express = require('express');
const router = express.Router()

const {Category} = require('./../models/index');
const { Op } = require('sequelize');

router.get('/',async (req,res)=>{
     try{

        const categories = await Category.findAll({
            where: {
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            }
        });

        return res.json(categories);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching categories'});
    }
})

router.get('/:categoryID',async (req,res)=>{
     try{

        const {categoryID} = req.params;

        const category = await Category.findOne({   
            where: {
                id: categoryID,
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            }
        });

        return res.json(category ?? []);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while fetching category'});
    }
})

router.post('/',async (req,res)=>{
    
    try{

        const {title} = req.body;

        const category = Category.build({   
            title: title,
            userID: req.user.id
        });

        await category.save();

        return res.json(category);

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while creating new category'});
    }
})

router.patch('/:categoryID',async (req,res)=>{
    
    try{

        const {categoryID} = req.params;

        let {title} = req.body;

         await Category.update({title},{
            where: {
                id: categoryID,
                userID: req.user.id,
                deleted: {
                    [Op.is]: null,     
                }
            }
        })

        return res.json({message: 'category updated'});

     }catch(error){
        global.reportAppError(error);
        return res.status(500).json({message: 'something went wrong while updating category'});
    }
})

module.exports = router;