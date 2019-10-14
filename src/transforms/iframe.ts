import parse5 from 'parse5'
import { getAttribute, setAttribute, wrap } from '../domUtils'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, responsive } from '../constants'

export default function transformIframe(node: parse5.DefaultTreeElement) {
	const frameWidth = getAttribute(node, 'width') || DEFAULT_WIDTH
	const frameHeight = getAttribute(node, 'height') || DEFAULT_HEIGHT
	let src = getAttribute(node, 'src')!
	const regex = /^\/\//
	const regexHttp = /^http\:\/\//
	if (regex.test(src)) {
		src = `https:${src}`
	}
	if (regexHttp.test(src)) {
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
	} as parse5.DefaultTreeElement
	node.childNodes.push(placeholder)
	node.attrs = [
		responsive,
		{ name: 'width', value: frameWidth! },
		{ name: 'height', value: frameHeight! },
		{ name: 'src', value: src! },
		{ name: 'sandbox', value: 'allow-scripts allow-same-origin' },
	]

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', `width: 100%; margin: auto;`)
	wrap(node, wrapper)
}
