import Joi from 'joi';
import profileSchema from './profile.schema.js';

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

  isActive: Joi.boolean()
        .required()
        .default(false),

  profile: profileSchema,

  // Ignore
  public_id: Joi.any().strip(),
  intent: Joi.any().strip()
})

export default schema;