const  {z}  =  require('zod');
const requiredField = require('./../../utils/requiredField');

const Schema = z.object({ 
  email: z
      .email({error: requiredField})
      .trim(),
  password: z
      .string({error: requiredField})
      .trim()
      .min(8)
      .max(1000),
});

module.exports = Schema.required();