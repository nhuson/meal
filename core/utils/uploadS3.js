import AWS from 'aws-sdk'
import uuid from 'uuid-v4'

if (process.env.ENV === 'development') {
    // For dev purposes only
    AWS.config.update({
        accessKeyId: 'AKIAIEADGJNIRMKS32PQ',
        secretAccessKey: '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'
    });
}

class Upload {
    constructor() {
        this.S3 = new AWS.S3()
    }

    /**
     * Upload signle file to S3 bucket
     * @param {Object} file 
     * @return {string}
     */
    async excute(file, path) {
        let name = this.generateFileName()
        let [, mimeType] = file.mimetype.split('/')
        await this.S3.putObject({
            Bucket: `meal-life/${path}`,
            Key: `${name}.${mimeType}`,
            Body: file.buffer,
            Metadata: { "Content-Type": file.mimetype},
            ACL: 'public-read'
        }, function (resp) {
            console.log(resp);
            console.log('Successfully uploaded package.');
        })

        return `${path}/${name}.${mimeType}`
    }

    async push (files, path) {
        let uploadFile = files.map(file => this.excute(file, path))
        let resp = await Promise.all(uploadFile)
        return resp

    }
   
    generateFileName() {
        let fileName = uuid().replace(/-/g, '')
        return fileName + Date.now()
    }
}

export default new Upload()