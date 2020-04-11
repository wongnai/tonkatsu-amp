declare module 'cache-manager-ioredis' {
	import { RedisOptions, ClusterOptions, ClusterNode, KeyType } from 'ioredis'
	import { caching } from 'cache-manager'

	function create(port?: number, host?: string, options?: RedisOptions): any
	function create(host?: string, options?: RedisOptions): any
	function create(
		options?: RedisOptions & { clusterConfig: CMIoRedis.ClusterConfig },
	): any
	export default create

	export namespace CMIoRedis {
		interface ClusterConfig {
			nodes: ClusterNode[]
			options?: ClusterOptions
		}

		interface RedisCache extends ReturnType<typeof caching> {
			name: 'redis'

			reset(cb?: (err: Error, result: string) => any): void
			keys(cb?: (err: Error, result: string[]) => any): void
			keys(pattern: string, cb?: (err: Error, result: string[]) => any): void
			ttl(key: KeyType, cb: (err: Error, res: number) => void): void
			isCacheableValue(value: any): boolean
		}
	}
}
