import cacheManager from 'cache-manager'
import redisStore from 'cache-manager-ioredis'
import htmlToAmp from 'htmlToAmp'
import merge from 'lodash/merge'
import { CacheServerConfigType } from 'types/config'

export default class App {
	cacheDriver: cacheManager.Cache

	constructor()

	constructor(
		cacheTTL?: number,
		cacheDriver?: string,
		config?: CacheServerConfigType,
	) {
		let cacheConfig = {
			store: 'memory' as any,
			ttl: cacheTTL ?? 30,
		}

		if (config) {
			cacheConfig = merge(cacheConfig, config)
		}

		if (cacheDriver === 'redis') {
			cacheConfig = merge(cacheConfig, {
				store: redisStore,
			})
		}

		this.cacheDriver = cacheManager.caching(cacheConfig)
	}

	async amplify(htmlString: string) {
		return htmlToAmp(htmlString, this.cacheDriver)
	}
}
