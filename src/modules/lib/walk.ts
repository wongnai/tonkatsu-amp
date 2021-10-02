/* eslint-disable no-await-in-loop */
import { Element, ParentNode } from 'parse5'

export async function walk(
	node: ParentNode | Element,
	callback: (node: ParentNode | Element) => void | boolean | Promise<void>,
): Promise<void | boolean> {
	const res = await callback(node)
	if (res === false) {
		return false
	} else {
		const parentNode = node
		if (parentNode.childNodes) {
			for (const child of parentNode.childNodes) {
				if ((await walk(child as ParentNode, callback)) === false) {
					return false
				}
			}
		}
	}
}
