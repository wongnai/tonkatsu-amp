import parse5 from 'parse5'
import { getAttribute, setAttribute, wrap } from '../domUtils'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, responsive } from '../constants'

export default function transformFacebook(node: parse5.DefaultTreeElement) {
	const postWidth = getAttribute(node, 'width') || DEFAULT_WIDTH
	const postHeight = getAttribute(node, 'height') || DEFAULT_HEIGHT
	const src = decodeURIComponent(getAttribute(node, 'src')!)
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
		{ name: 'width', value: postWidth! },
		{ name: 'height', value: postHeight! },
		{ name: 'data-embed-as', value: matches[1] },
		{ name: 'data-href', value: matches[2] },
	]

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', `max-width: ${postWidth}px; margin: auto;`)
	wrap(node, wrapper)
}
