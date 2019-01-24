import Redis from 'ioredis'
import config from '../config'

const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    db: config.redis.db,
    password: config.redis.password,
    keyPrefix: config.redis.prefix
})

class Caching {

    async hset(hash, key, data, timeLive = config.redis.timetolive) {
        let body = await redis.hget(hash, key)
        if (!body) {
            const p = redis.pipeline()
            p.hset(hash, key, data)
            p.expire(hash, timeLive)
            p.exec()
        }

        return body
    }

    async hget(hash, key, json = true) {
        let data = await redis.hget(hash, key)
        if (json) {
            return JSON.parse(data)
        }

        return data
    }
}

export default new Caching
