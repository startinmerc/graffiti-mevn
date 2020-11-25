const Joi = require("joi");

module.exports.artistSchema = Joi.object({
	name: Joi.string().required(),
}).required();

module.exports.artworkPostSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	artist: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/)
		.required(),
	coord_lat: Joi.string().required(),
	coord_long: Joi.string().required(),
}).required();

module.exports.artworkPutSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	artist: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/)
		.required(),
	coord_lat: Joi.string().required(),
	coord_long: Joi.string().required(),
	photos: Joi.object({
		url: Joi.string().uri(),
		filename: Joi.string(),
	}),
}).required();
