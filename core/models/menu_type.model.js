import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const MenuTypeSchema = new Schema({
	title: {
		type: String,
        require: true,
        index: true        
	},
	description: {
		type: String,
        require: false,
        default: null
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

MenuTypeSchema.plugin(mongoosePaginate)
const MenuTypes = mongoose.model('menu_types', MenuTypeSchema)

export default MenuTypes