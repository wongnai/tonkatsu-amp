import cacheManager from 'cache-manager'
import filter from 'lodash/filter'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, responsive } from 'modules/constants/image'
import { getAttribute, setAttribute, wrap } from 'modules/utils/dom'
import { getCachedImageSize } from 'modules/utils/imageSize'
import { Element, parseFragment } from 'parse5'

export default async function transformImg(node: Element, cache: cacheManager.Cache) {
	let imageSize
	const imageSrc = getAttribute(node, 'src') ?? ''
	try {
		imageSize = await getCachedImageSize(imageSrc, cache)
	} catch (e) {
		// eslint-disable-next-line no-console
		console.warn(`Failed to get image size: ${imageSrc}`, e)
		imageSize = { width: 1920, height: 1280 }
	}
	node.nodeName = 'amp-img'
	node.tagName = 'amp-img'
	node.attrs = filter(node.attrs, attr => attr.name !== 'width')
	node.attrs = filter(node.attrs, attr => attr.name !== 'height')
	node.attrs = [
		...node.attrs,
		responsive,
		{ name: 'width', value: imageSize.width?.toString() ?? DEFAULT_WIDTH },
		{ name: 'height', value: imageSize.height?.toString() ?? DEFAULT_HEIGHT },
	]

	const wrapper = parseFragment('<div />').childNodes[0] as Element
	setAttribute(wrapper, 'style', 'width: 100vw; margin: 0 calc(50% - 50vw);')
	wrap(node, wrapper)
}
