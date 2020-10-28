import parse5 from 'parse5'
import { get } from 'lodash'

export function getAttribute(
	node: parse5.DefaultTreeElement,
	nameToFind: string,
) {
	return get(
		node.attrs.find((e) => e.name === nameToFind),
		'value',
	)
}

export function setAttribute(
	node: parse5.DefaultTreeElement,
	name: string,
	value: string,
) {
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

export function wrap(
	node: parse5.DefaultTreeElement,
	wrapped: parse5.DefaultTreeElement,
) {
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
