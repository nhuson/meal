const fs = require('fs')

function getFileData(pathFile) {
	const dataFile = fs.readFileSync(pathFile, 'utf8')
	return JSON.parse(dataFile.toString())
}

function writeFileData(path, data) {
	return fs.writeFileSync(path, JSON.stringify(data))
}

;((rDir, wDir) => {
	const fileNames = fs.readdirSync(rDir)
	let dataJson = {}
	fileNames.forEach((filename) => {
		const dataFile = getFileData(`${rDir}/${filename}`)
		dataJson = {
			...dataJson,
			...dataFile
		}
	})
	let template = {
		swagger: '2.0',
		info: {
			version: '1.0.0',
			title: 'Meal Plan Apis (Add token with Bearer token: Bearer {token})'
		},
		host: 'localhost:3000',
		basePath: '/api/v1',
		schemes: ['https', 'http']
	}
	template.paths = dataJson
	try {
		const wData = writeFileData(`${wDir}/index.json`, template)
	} catch (err) {
		console.log(err)
	}
})('./data', './dist/data')
