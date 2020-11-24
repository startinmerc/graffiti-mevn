const Joi = require('joi');

module.exports.artistSchema = Joi.object({
	name: Joi.string().required(),
}).required();
