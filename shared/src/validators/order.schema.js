import Joi from 'joi';
import featureSchema from './feature.schema.js';

const allowedStatus = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export const selections = {
  status: allowedStatus
}

const schema = Joi.object({
  email: Joi.string()
        .required()
        .messages({
          "string.empty": "Supplier is required"
        }),

  sku: Joi.string()
        .required()
        .messages({
          "string.empty": "Item is required"
        }),

  status: Joi.string()
        .valid(...allowedStatus)
        .required()
        .messages({
          'any.only': `Status must be one of: ${allowedStatus.join(", ")}`,
          'string.empty': 'Status is required',
          'any.required': 'Status is required' 
        }),

  qty: Joi.number()
        .min(0)
        .required()
        .messages({
          'number.base': 'Quantity must be a number',
          'number.min': 'Quantity cannot be a negative amount',
          'any.required': 'Quantity is required'
        }),

  unitCost: Joi.string()
        .pattern(/^\d+\.\d{2,}$/, 'at least 2 decimal places')
        .required()
        .messages({
          'string.base': 'Unit cost must be a number',
          'any.required': 'Unit cost is required',
          'string.pattern.name': 'Unit cost should have {#name}'
        }),

  feature: featureSchema,

  // Ignore
  public_id: Joi.any().strip(),
  intent: Joi.any().strip()
})

export default schema;