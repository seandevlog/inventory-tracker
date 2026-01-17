import Joi from 'joi';

const schema = Joi.object({
  url: Joi.string(),
  public_id: Joi.string()
})

export default schema;
