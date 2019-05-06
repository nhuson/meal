import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const MealSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			index: true,
			require: true,
		},
		image: {
			type: String,
			require: true,
		},
		instructions: [
			{
				idx: {
					type: Number,
					require: true,
				},
				text: {
					type: String,
					require: true,
				},
			},
		],
		time: {
			type: Number,
			index: true,
			require: true,
		},
		serving: {
			type: Number,
			require: true,
			index: true,
			default: 2,
		},
		calorie: {
			type: Number,
			require: false,
			index: true,
			default: null,
		},
		count_rate: {
			type: Number,
			require: false,
			default: null,
		},
		rate: {
			type: Number,
			require: false,
			index: true,
			default: null,
		},
		album: {
			type: [Schema.Types.ObjectId],
			require: false,
			default: null,
		},
		is_pro: {
			type: Number,
			require: true,
			default: 0,
		},
		description: {
			type: String,
			require: false,
			default: null,
		},
		category: {
			type: Schema.Types.ObjectId,
			index: true,
			ref: 'categories',
		},
		menu_type: {
			type: Schema.Types.ObjectId,
			index: true,
			ref: 'menu_types',
		},
		allergy: {
			type: Schema.Types.ObjectId,
			index: true,
			ref: 'allergi_types',
		},
		ingredients: [
			{
				ingredient: {
					type: Schema.Types.ObjectId,
					ref: 'ingredients',
				},
				amount: {
					type: Number,
					require: true,
				},
				status: {
					type: Boolean,
					require: true,
					default: 0,
				},
			},
		],
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

MealSchema.plugin(mongoosePaginate)
const Users = mongoose.model('meals', MealSchema)

export default Users
