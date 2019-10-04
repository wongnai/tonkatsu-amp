import { ParentNode, Node, DefaultTreeParentNode } from 'parse5'

export async function walk(
	node: ParentNode,
	callback: (node: ParentNode | Node) => void | boolean | Promise<void>,
): Promise<void | boolean> {
	let res = await callback(node)
	if (res === false) {
		return false
	} else {
		let parentNode = node as DefaultTreeParentNode
		if (parentNode.childNodes) {
			for (let child of parentNode.childNodes) {
				if ((await walk(child, callback)) === false) {
					return false
				}
			}
		}
	}
}
