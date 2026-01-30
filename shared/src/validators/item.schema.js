import Joi from 'joi';
import featureSchema from './feature.schema.js';

const allowedCategory = ['room', 'food', 'amenities', 'housekeeping', 'services', 'events', 'retail', 'technology', 'fees', 'maintenance'];

const allowedActive = ['active', 'inactive'];

export const selections = {
  category: allowedCategory,
  isActive: allowedActive
}

const schema = Joi.object({
  sku: Joi.string()
        .required()
        .pattern(/^[A-Z0-9-]+$/, "uppercase letters, numbers, and dash only")
        .pattern(/(?:.*[A-Z]){3,}/, "at least 3 uppercase letters")
        .messages({
          "string.empty": "Field is required",
          "string.pattern.name": "SKU must have {#name}"
        }),

  name: Joi.string()
        .required()
        .messages({
          "string.empty": "Name is required"
        }),

  unit: Joi.string()
        .optional()
        .allow(null, ''),

  reorderPoint: Joi.number()
        .min(0)
        .required()
        .messages({
          'number.base': 'Reorder Point must be a number',
          'number.min': 'Reorder Point cannot be a negative amount',
          'any.required': 'Reorder Point is required'
        }),

  category: Joi.string()
        .valid(...allowedCategory)
        .required()
        .messages({
          'any.only': `Category must be one of: ${allowedCategory.join(", ")}`,
          'string.empty': 'Category is required',
          'any.required': 'Category is required' 
        }),

  isActive: Joi.string()
        .valid(...allowedActive)
        .required()
        .messages({
          'any.only': `Status must be either ${allowedActive.join(", ")}`,
          'string.empty': 'Status is required',
          'any.required': 'Status is required'
        }),

  feature: featureSchema,

  // Ignore
  public_id: Joi.any().strip(),
  intent: Joi.any().strip()
})

export default schema;