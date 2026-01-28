import Joi from 'joi';
import featureSchema from './feature.schema.js';

const schema = Joi.object({
  email: Joi.string()
        .required()
        .pattern(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          'a valid email format'
        )
        .messages({
          'string.empty': 'Field is required',
          'any.required': 'Field is required',
          'string.pattern.name': 'Email must have {#name}'
        }),

  name: Joi.string()
        .required()
        .messages({
          "string.empty": "Name is required"
        }),

  phone: Joi.string()
        .optional(),

  address: Joi.string()
  .optional(),

  feature: featureSchema,

  // Ignore
  public_id: Joi.any().strip(),
  intent: Joi.any().strip()
})

export default schema;