const  {z}  =  require('zod');
const requiredField = require('./../../utils/requiredField');

const Schema = z.object({ 
    title: z
      .string({error: requiredField})
      .trim()
      .min(3,"Name must be atleast 3 character length")
      .max(100),
    
    amount: z
      .float64({error: requiredField})
      .min(0,"Amount must be greather than or equal to zero"),

      budgetDetailID: z.int({error: requiredField}),

      categoryID: z.int({error: requiredField}),

      coverage: z.iso.date('Coverage must be in date format YYYY-MM-DD'),
});

module.exports = Schema.required();