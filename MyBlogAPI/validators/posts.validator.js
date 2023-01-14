const Joi = require("joi");

const PostSchema = Joi.object({
  title: Joi.string().min(3).max(255).trim().required(),
  description: Joi.string().min(3).max(500).optional().trim(),
  tags: Joi.array().items(Joi.string()).optional(),
  state: Joi.string(),
  read_count: Joi.number(),
  reading_time: Joi.number(),
  body: Joi.string().required(),
  author: Joi.string(),
  createdAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
  // year: Joi.number().integer().required().max(2022),
  // isbn: Joi.string().min(10).max(13).required(),
  // price: Joi.number().min(0).required(),
  // longDescription: Joi.string().min(10).optional().trim(),
});

const postUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(255).trim(),
  description: Joi.string().min(1).max(500).trim(),
  tags: Joi.array().items(Joi.string()),
  state: Joi.string(),
  read_count: Joi.number(),
  reading_time: Joi.number(),
  body: Joi.string().required(),
});

async function postValidationMiddleWare(req, res, next) {
  const postPayload = req.body;

  try {
    await PostSchema.validateAsync(postPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function updatePostValidationMiddleware(req, res, next) {
    const postPayLoad = req.body

    try {
        await postUpdateSchema.validateAsync(postPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = {
    postValidationMiddleWare,
    updatePostValidationMiddleware,
}
