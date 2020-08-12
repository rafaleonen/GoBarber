import Redis, { Redis as RedisClient } from 'ioredis'

import ICacheProvider from '../models/ICacheProvider'
import cacheConfig from '@config/cache'

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient

    constructor() {
        this.client = new Redis(cacheConfig.config.redis)
    }

    public async save(key: string, value: string): Promise<void> {

    }

    public async recover(key: string): Promise<void> {

    }

    public async invalidate(key: string): Promise<void> {

    }
}
