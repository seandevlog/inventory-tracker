import Joi from 'joi';
import featureSchema from './feature.schema.js';

const schema = Joi.object({
  code: Joi.string()
        .required()
        .pattern(/^[A-Z0-9-]+$/, "uppercase letters, numbers, and dash only")
        .pattern(/(?:.*[A-Z]){3,}/, "at least 3 uppercase letters")
        .messages({
          "string.empty": "Field is required",
          "string.pattern.name": "Code must have {#name}"
        }),

  name: Joi.string()
        .required()
        .messages({
          "string.empty": "Name is required"
        }),

  notes: Joi.string()
        .optional(),

  feature: featureSchema,

  // Ignore
  public_id: Joi.any().strip(),
  intent: Joi.any().strip()
})

export default schema;