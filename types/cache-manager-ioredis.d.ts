declare module 'cache-manager-ioredis' {
	import { Cache, CacheOptions, CachingConfig, Store } from 'cache-manager'
	import * as IORedis from 'ioredis'

	interface SingleNodeCache extends Cache {
		store: RedisSingleNodeStore
	}

	interface ClusterCache extends Cache {
		store: RedisClusterStore
	}

	interface RedisStoreConstructor {
		create:
			| ((...options: RedisStoreSingleNodeConfig[]) => RedisSingleNodeStore)
			| ((...options: RedisStoreClusterConfig[]) => RedisClusterStore)
	}

	type RedisStoreSingleNodeConfig = CachingConfig &
		IORedis.RedisOptions & {
			store: RedisStoreConstructor
			max?: number
		} & CacheOptions

	type RedisStoreClusterConfig = CachingConfig & {
		store: RedisStoreConstructor
		max?: number
		clusterConfig: ClusterOptions
	} & CacheOptions

	interface RedisStore extends Store {
		getClient(): IORedis.Redis | IORedis.Cluster
		name: 'redis'
		isCacheableValue(value: any): boolean
		del(...args: any[]): Promise<any>
		reset(...args: any[]): Promise<any>
		keys(...args: any[]): Promise<any>
		ttl(...args: any[]): Promise<any>
	}

	interface RedisSingleNodeStore extends RedisStore {
		getClient(): IORedis.Redis
	}

	interface RedisClusterStore extends RedisStore {
		getClient(): IORedis.Cluster
	}

	interface ClusterOptions {
		nodes: IORedis.ClusterNode[]
		options: IORedis.ClusterOptions
	}
}
