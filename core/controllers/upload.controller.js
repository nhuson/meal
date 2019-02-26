import uploader from '../utils/uploadS3'

/**
 * @route   POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const upload = async (req, res, next) => {
	try {
        const { location } = req.params
        const target = ['users/avatar', 'categories']
        if (!target.includes(location)){
            throw createError(400, `The location must be one off ${target}`)
        }

		const resp =await uploader.push([req.files.filepond], location)
		res.status(200).json({
			success: 'success',
			message: 'Image uploaded successfully.',
			data: resp
		})
	} catch (err) {
		next(err)
	}
}

export { upload}