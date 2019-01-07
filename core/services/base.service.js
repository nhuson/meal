import knex from '../db/database'

class BaseService {
    constructor () {
        this.tableName = ''
    }

    async create (data) {
        return await knex(this.tableName).create(data)
    }

    async update (data, option) {
        return await knex(this.tableName).where(option).update(data)
    }

    async delete (option) {
        return await knex(this.tableName).where(option).delete()
    }

    async findAll () {
        return await knex(this.tableName).all()
    }

    async findOne (option) {
        return await knex(this.tableName).where(option).first()
    }
}

export default BaseService