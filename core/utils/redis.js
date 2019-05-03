import Redis from 'ioredis'
import config from '../config'

class Caching {
	constructor() {
		this.redis = new Redis({
			host: config.redis.host,
			port: config.redis.port,
			db: config.redis.db,
			password: config.redis.password,
			keyPrefix: config.redis.prefix,
		})
	}

	async hset(hash, key, data, timeLive = config.redis.timetolive) {
		let body = await this.redis.hget(hash, key)
		if (!body) {
			const p = this.redis.pipeline()
			p.hset(hash, key, JSON.stringify(data))
			p.expire(hash, timeLive)
			p.exec()
		}

		return body
	}

	async hget(hash, key, json = true) {
		let data = await this.redis.hget(hash, key)
		if (json) {
			return JSON.parse(data)
		}

		return data
	}

	async hdel(hash, key = false) {
		if (key) {
			await this.redis.hdel(hash, key)
			return
		}

		return await this.redis.del(hash)
	}
}

export default new Caching()
