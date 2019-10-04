import cacheManager from 'cache-manager'
// import redisStore from 'cache-manager-ioredis'

const cacheDriver = /*config.get('cacheDriver') || */ 'memory'
// let args = {}
switch (cacheDriver) {
	// case 'redis':
	// 	cacheDriver = redisStore
	// 	args = config.get('redis')
	// 	break
	case 'memory':
		// noop
		break
	default:
		throw new Error('Cache driver must be either redis or memory')
}

export default cacheManager.caching({
	store: cacheDriver as any, // the typedef in package is incorrect
	ttl: 10, // parseInt(config.get('cacheTTL'), 10),
	// ...args,
})
