const errorHandle = (err, req, res, next) => {
	console.log(err)
	res.status(err.status || 500)
	res.json({
		success: 'failed',
		message: err.message,
	})
}

export default errorHandle
