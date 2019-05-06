import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const PageSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
			index: true,
		},
		url: {
			type: String,
			require: true,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

PageSchema.plugin(mongoosePaginate)
const Pages = mongoose.model('pages', PageSchema)

export default Pages
