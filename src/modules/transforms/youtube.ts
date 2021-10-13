import { DEFAULT_HEIGHT, DEFAULT_WIDTH, responsive } from 'modules/constants/image'
import { getAttribute, setAttribute, wrap } from 'modules/utils/dom'
import { Element, parseFragment } from 'parse5'

export default function transformYoutube(node: Element) {
	const youtubeSrc = getAttribute(node, 'src') ?? ''
	const videoWidth = getAttribute(node, 'width') ?? DEFAULT_WIDTH
	const videoHeight = getAttribute(node, 'height') ?? DEFAULT_HEIGHT
	const regex = /youtube\.com\/embed\/([^?]+)/
	const matches = regex.exec(youtubeSrc)
	if (!matches) {
		return
	}
	node.nodeName = 'amp-youtube'
	node.tagName = 'amp-youtube'
	node.childNodes = []
	node.attrs = [
		responsive,
		{ name: 'width', value: videoWidth },
		{ name: 'height', value: videoHeight },
		{ name: 'data-videoid', value: matches[1] },
		{ name: 'style', value: 'margin-top: 16px; margin-bottom: 16px;' },
	]

	const wrapper = parseFragment('<div />').childNodes[0] as Element
	setAttribute(wrapper, 'style', 'width: 100vw; margin: 0 calc(50% - 50vw);')
	wrap(node, wrapper)
}
