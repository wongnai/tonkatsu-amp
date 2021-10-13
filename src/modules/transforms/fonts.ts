import { getAttribute } from 'modules/utils/dom'
import { Element } from 'parse5'

export default function transformFont(node: Element) {
	node.nodeName = 'span'
	node.tagName = 'span'
	node.attrs = [
		{
			name: 'style',
			value: `color: ${getAttribute(node, 'color') ?? '#333333'}`,
		},
	]
}
