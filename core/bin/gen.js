const fs = require('fs')
const path = require('path')

const { argv } = process

async function excute(args) {
    try {
        let [,, name, table, valid] = args
        name = name.replace('--name=', '')
        table = table.replace('--table=', '')
        valid = valid.replace('--valid=', '')

        // Get and save controller
        let controllerTemp = path.join(__dirname, 'template', 'controller.temp')
        let controller = fs.readFileSync(controllerTemp).toString()
        controller = controller.replace(new RegExp('typeIngredientService', 'g'), `${name.charAt(0).toUpperCase() + name.slice(1)}Service`)
        controller = controller.replace('service_file', name)
        const controllerFile = path.join(__dirname, '../controllers', `${name}.controller.js`)
        await fs.writeFileSync(controllerFile, controller)
        console.log(`Created: ${controllerFile}`)

        // Get and save service
        let serviceTemp = path.join(__dirname, 'template', 'service.temp')
        let service = fs.readFileSync(serviceTemp).toString()
        service = service.replace(new RegExp('ServiceReplate', 'g'), `${name.charAt(0).toUpperCase() + name.slice(1)}Service`)
        service = service.replace('$table_name', table)
        const serviceFile = path.join(__dirname, '../services', `${name}.service.js`)
        await fs.writeFileSync(serviceFile, service)
        console.log(`Created: ${serviceFile}`)

        // Get and save validate
        if (valid == 'true') {
            let validTemp = path.join(__dirname, 'template', 'validate.temp')
            let validation = fs.readFileSync(validTemp).toString()
            const validFile = path.join(__dirname, '../validations', `${name}.schema.js`)
            await fs.writeFileSync(validFile, validation)
            console.log(`Created: ${validFile}`)
        }
    } catch (err) {
        console.log(err)
    }
}

async function run() {
    try {
        await excute(argv)
    } catch (e) {
        console.log(e)
    }
}

run()