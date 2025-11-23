const  {z}  =  require('zod');
const requiredField = require('./../../utils/requiredField');

const Schema = z.object({ 

    month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Invalid month format").optional(),

    categoryID: z.string().refine(v => { let n = Number(v); return !isNaN(n) && v?.length > 0}, {error: requiredField})

});

module.exports = Schema.required();