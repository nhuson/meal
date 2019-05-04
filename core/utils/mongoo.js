import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(
	config.mongoo.url,
	{ useNewUrlParser: true },
)

export default mongoose
