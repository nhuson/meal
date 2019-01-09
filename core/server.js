import configs from './config';
import createError from 'http-errors';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './routes/api';
import crossAllowOrigin from './middleware/crossOrigin';
import errorHandle from './middleware/errorHandle';

const port = configs.server.port || 3000;
var app = express();
app.use(morgan('dev'));
app.use(crossAllowOrigin);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(errorHandle);

app.listen(port, () => {
	console.log(`API server is running.... on port ${port}`);
});
