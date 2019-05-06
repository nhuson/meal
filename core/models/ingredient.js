import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const IngredientSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
			index: true,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			require: true,
		},
		image: {
			type: String,
			require: false,
			default: null,
		},
		unit: {
			type: String,
			require: false,
			default: null,
		},
		type_ingredient: {
			type: Schema.Types.ObjectId,
			ref: 'type_ingredients',
			require: true,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

IngredientSchema.plugin(mongoosePaginate)
const Ingredient = mongoose.model('ingredients', IngredientSchema)

export default Ingredient
