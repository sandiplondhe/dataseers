const Joi = require("joi");

const taskSchema = Joi.object({
  task_name: Joi.string().min(3).max(30).required(),
  user_id: Joi.number(),
  description: Joi.string(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
});
module.exports = taskSchema;
