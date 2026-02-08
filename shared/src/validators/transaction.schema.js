import Joi from 'joi';
import featureSchema from './feature.schema.js';

const allowedTypes = ['purchase', 'sale', 'returnFromCustomer', 'returnToSupplier', 'transfer', 'adjustment', 'scrap', 'production', 'consignmentIn', 'consignmentOut'];

export const selections = {
  type: allowedTypes
}

const schema = Joi.object({
  type: Joi.string()
        .valid(...allowedTypes)
        .required()
        .messages({
          'any.only': `Type must be one of: ${allowedTypes.join(", ")}`,
          'string.empty': 'Type is required',
          'any.required': 'Type is required' 
        }),

  sku: Joi.string()
        .required()
        .messages({
          "string.empty": "Item is required"
        }),

  qty: Joi.number()
        .min(0)
        .required()
        .messages({
          'number.base': 'Quantity must be a number',
          'number.min': 'Quantity cannot be a negative amount',
          'any.required': 'Quantity is required'
        }),

  fromLocationCode: Joi.alternatives()
        .conditional('type', {
            is: Joi.string().valid(
                  'purchase', 'returnFromCustomer', 'production', 'consignmentIn', 'adjustment', 'transfer'),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null, '')
        }),

  toLocationCode: Joi.alternatives()
        .conditional('type', {
            is: Joi.string().valid(
                  'sale', 'returnToSupplier', 'scrap', 'consignmentOut', 'transfer'),
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null, '')
        }),

  unitCost: Joi.string()
        .pattern(/^\d+\.\d{2,}$/, 'at least 2 decimal places')
        .optional()
        .allow(null, '')
        .messages({
          'string.base': 'Unit cost must be a number',
          'string.pattern.name': 'Unit cost should have {#name}'
        }),

  note: Joi.string()
        .optional()
        .allow(null, ''),

  createdBy: Joi.string()
        .required()
        .messages({
          "string.empty": "Created by is required"
        }),

  feature: featureSchema,

  // Ignore
  public_id: Joi.any().strip(),
  intent: Joi.any().strip()
})

export default schema;