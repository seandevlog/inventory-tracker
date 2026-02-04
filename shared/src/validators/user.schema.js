import Joi from 'joi';
import featureSchema from './feature.schema.js';

const allowedRoles = ['admin', 'manager', 'staff'];

const allowedActive = ['active', 'inactive'];

export const selections = {
  role: allowedRoles,
  isActive: allowedActive
}

const schema = Joi.object({
  username: Joi.string()
        .required()
        .messages({
          "string.empty": "Username is required"
        }),

  password: Joi.string()
        .required()
        .min(12)
        .pattern(/[a-z]/, "lowercase")
        .pattern(/[A-Z]/, "uppercase")
        .pattern(/\d/, "number")
        .pattern(/[^\da-zA-Z]/, "special")
        .messages({
          "string.min" : "Password should have 12 or more characters",
          "string.pattern.name": "Password should have {#name}",
          "string.empty": "Password is required"
        }),

  givenName: Joi.string()
        .required()
        .messages({
          "string.empty": "Given name is required"
        }),

  familyName: Joi.string()
        .required()
        .messages({
          "string.empty": "Family name is required"
        }),

  contact: Joi.string()
        .required()
        .messages({
          "string.empty": "Contact is required"
        }),

  address: Joi.string()
        .required()
        .messages({
          "string.empty": "Address is required"
        }),

  isActive: Joi.string()
        .valid(...allowedActive)
        .required()
        .messages({
          'any.only': `Status must be either ${allowedActive.join(", ")}`,
          'string.empty': 'Status is required',
          'any.required': 'Status is required'
        }),

  role: Joi.string()
        .valid(...allowedRoles)
        .required()
        .messages({
          'any.only': `Role must be either ${allowedRoles.join(", ")}`,
          'string.empty': 'Role is required',
          'any.required': 'Role is required'
        }),

  feature: featureSchema,

  // Ignore
  public_id: Joi.any().strip(),
  intent: Joi.any().strip()
})

export default schema;