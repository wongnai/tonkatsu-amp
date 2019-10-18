import { getCachedImageSize } from 'imageSize'
import { filter } from 'lodash'
import parse5 from 'parse5'
import { getAttribute, setAttribute, wrap } from 'domUtils'
import { responsive } from '../constants'

export default async function transformImg(node: parse5.DefaultTreeElement) {
	let imageSize
	const imageSrc = getAttribute(node, 'src')
	try {
		imageSize = await getCachedImageSize(imageSrc!)
	} catch (e) {
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
		{ name: 'width', value: imageSize.width.toString() },
		{ name: 'height', value: imageSize.height.toString() },
	]

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', `width: 100vw; margin: 0 calc(50% - 50vw);`)
	wrap(node, wrapper)
}
