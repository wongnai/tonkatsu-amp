import { DEFAULT_HEIGHT, DEFAULT_WIDTH, responsive } from 'modules/constants/image'
import { getAttribute, setAttribute, wrap } from 'modules/utils/dom'
import { Element, parseFragment } from 'parse5'

export default function transformIframe(node: Element) {
	const frameWidth = getAttribute(node, 'width') ?? DEFAULT_WIDTH
	const frameHeight = getAttribute(node, 'height') ?? DEFAULT_HEIGHT
	let src = getAttribute(node, 'src') ?? ''
	if (src.startsWith('//')) {
		src = `https:${src}`
	}
	if (src.startsWith('http://')) {
		src = src.replace('http://', 'https://')
	}

	node.nodeName = 'amp-iframe'
	node.tagName = 'amp-iframe'
	const placeholder = {
		nodeName: 'amp-img',
		tagName: 'amp-img',
		attrs: [
			responsive,
			{
				name: 'alt',
				value: 'loading',
			},
			{
				name: 'placeholder',
				value: '',
			},
			{
				name: 'src',
				value: '/assets/loading.gif',
			},
			{
				name: 'width',
				value: '100',
			},
			{
				name: 'height',
				value: '100',
			},
		],
		namespaceURI: 'http://www.w3.org/1999/xhtml',
		parentNode: node,
		childNodes: [],
	} as Element
	node.childNodes.push(placeholder)
	node.attrs = [
		responsive,
		{ name: 'width', value: frameWidth },
		{ name: 'height', value: frameHeight },
		{ name: 'src', value: src },
		{ name: 'sandbox', value: 'allow-scripts allow-same-origin' },
	]

	const wrapper = parseFragment('<div />').childNodes[0] as Element
	setAttribute(wrapper, 'style', 'width: 100%; margin: auto;')
	wrap(node, wrapper)
}
