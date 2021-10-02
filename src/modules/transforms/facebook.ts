import { DEFAULT_HEIGHT, DEFAULT_WIDTH, responsive } from 'modules/constants/image'
import { getAttribute, setAttribute, wrap } from 'modules/utils/dom'
import { Element, parseFragment } from 'parse5'

export default function transformFacebook(node: Element) {
	const postWidth = getAttribute(node, 'width') ?? DEFAULT_WIDTH
	const postHeight = getAttribute(node, 'height') ?? DEFAULT_HEIGHT
	const src = decodeURIComponent(getAttribute(node, 'src') ?? '')
	const regex = /https:\/\/www\.facebook\.com\/plugins\/(.+)\.php\?href=(.+)/
	const matches = regex.exec(src)
	if (!matches) {
		return
	}
	node.nodeName = 'amp-facebook'
	node.tagName = 'amp-facebook'
	node.childNodes = []
	node.attrs = [
		responsive,
		{ name: 'width', value: postWidth },
		{ name: 'height', value: postHeight },
		{ name: 'data-embed-as', value: matches[1] },
		{ name: 'data-href', value: matches[2] },
	]

	const wrapper = parseFragment('<div />').childNodes[0] as Element
	setAttribute(wrapper, 'style', `max-width: ${postWidth}px; margin: auto;`)
	wrap(node, wrapper)
}
