const errorHandle = (err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		success: false,
		message: err.message,
	});
};

export default errorHandle;
