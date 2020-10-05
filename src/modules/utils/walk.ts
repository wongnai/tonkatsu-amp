import { ParentNode, Node, DefaultTreeParentNode } from 'parse5'

export async function walk(
	node: ParentNode,
	callback: (node: ParentNode | Node) => void | boolean | Promise<void>,
): Promise<void | boolean> {
	const res = await callback(node)
	if (res === false) {
		return false
	} else {
		const parentNode = node as DefaultTreeParentNode
		if (parentNode.childNodes) {
			for (const child of parentNode.childNodes) {
				if ((await walk(child, callback)) === false) {
					return false
				}
			}
		}
	}
}
