import Joi from 'joi';

const allowedRoles = ['admin', 'staff'];

const schema =  Joi.string()
                .valid(...allowedRoles)
                .required()

export default schema;
