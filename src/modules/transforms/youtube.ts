import parse5 from 'parse5'
import { getAttribute, setAttribute, wrap } from 'modules/utils/dom'
import {
	DEFAULT_WIDTH,
	DEFAULT_HEIGHT,
	responsive,
} from 'modules/constants/image'

export default function transformYoutube(node: parse5.DefaultTreeElement) {
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

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', 'width: 100vw; margin: 0 calc(50% - 50vw);')
	wrap(node, wrapper)
}
