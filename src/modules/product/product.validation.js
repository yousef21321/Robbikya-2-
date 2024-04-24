import Joi from "joi";

const addproductval = Joi.object({
    
    name: Joi.string().min(2).trim(),
    description: Joi.string().min(50).max(1500).trim(),
    price: Joi.number().min(0),
    quantity: Joi.number().min(0).required(),
    quality:Joi.string().valid('Used like new','Used good','Used fair').required(),
    category:Joi.string().hex().length(24).required(),
    subcategory:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).optional()

})

const paramsproductval = Joi.object({
    
    id:Joi.string().hex().length(24).required(),
})


const updateproductval = Joi.object({
    
    name: Joi.string().min(2).trim(),
    description: Joi.string().min(50).max(1500).trim(),
    price: Joi.number().min(0),
    quantity: Joi.number().min(0),
    quality:Joi.string(),
    category:Joi.string().hex().length(24),
    subcategory:Joi.string().hex().length(24),
    createdBy:Joi.string().hex().length(24).optional()

})
export{
    addproductval,
    paramsproductval,
    updateproductval

}