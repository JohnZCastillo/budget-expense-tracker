const  {z}  =  require('zod');
const requiredField = require('./../../utils/requiredField');

const Schema = z.object({ 
  name: z
      .string({error: requiredField})
      .trim()
      .min(3,"Name must be atleast 3 character length")
      .max(100),
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