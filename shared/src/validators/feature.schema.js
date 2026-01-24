import Joi from 'joi';

const schema = Joi.object({
  url: Joi.string(),
  public_id: Joi.string(),

  // ignore
  path: Joi.any().strip()
})

export default schema;
