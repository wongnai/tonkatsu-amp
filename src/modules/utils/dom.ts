import get from 'lodash/get'
import { Element } from 'parse5'

export function getAttribute(node: Element, nameToFind: string) {
	return get(
		node.attrs.find(e => e.name === nameToFind),
		'value',
	)
}

export function setAttribute(node: Element, name: string, value: string) {
	for (const item of node.attrs) {
		if (item.name === name) {
			item.value = value
			return
		}
	}

	node.attrs.push({
		name,
		value,
	})
}

export function wrap(node: Element, wrapped: Element) {
	// replace node in parent by wrapped
	for (let i = 0; i < node.parentNode.childNodes.length; i++) {
		if (node.parentNode.childNodes[i] === node) {
			node.parentNode.childNodes[i] = wrapped
		}
	}

	// attach node to wrapped
	wrapped.childNodes.push(node)
	return wrapped
}
