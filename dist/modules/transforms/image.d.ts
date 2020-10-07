import cacheManager from 'cache-manager'
import parse5 from 'parse5'
export default function transformImg(
	node: parse5.DefaultTreeElement,
	cache: cacheManager.Cache,
): Promise<void>
