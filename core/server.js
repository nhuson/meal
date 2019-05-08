import configs from './config'
import createError from 'http-errors'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import api from './routes/api'
import crossAllowOrigin from './middleware/crossOrigin'
import errorHandle from './middleware/errorHandle'

const port = configs.server.port || 3000
var app = express()
app.set('views', __dirname + '/docs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/docs/dist'))
app.use(morgan('dev'))
app.use(crossAllowOrigin)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }))
// Docs swagger
app.get('/docs', (req, res, next) => {
	res.render('dist/index')
})

//Routes
app.use('/api/v1', api)
// connect mongoo
mongoose
	.connect(
		configs.mongoo.url,
		{ useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }
	)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(errorHandle)

app.listen(port, () => {
	console.log(`API server is running.... on port ${port}`)
})
