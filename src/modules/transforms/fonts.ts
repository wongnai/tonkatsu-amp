import parse5 from 'parse5'
import { getAttribute } from 'modules/utils/dom'

export default function transformFont(node: parse5.DefaultTreeElement) {
	node.nodeName = 'span'
	node.tagName = 'span'
	node.attrs = [
		{ name: 'style', value: `color: ${getAttribute(node, 'color')}` },
	]
}
