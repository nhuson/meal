import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const VersionSchema = new Schema(
	{
		version: {
			type: String,
			require: true,
			index: true,
        },
        os: {
			type: String,
			require: true,
			index: true,
        },
        url: {
			type: String,
			require: true,
			index: true,
		},
		force: {
			type: Boolean,
            require: true,
            default: false
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

VersionSchema.plugin(mongoosePaginate)
const Versions = mongoose.model('versions', VersionSchema)

export default Versions
