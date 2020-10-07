import { ParentNode, Node } from 'parse5'
export declare function walk(
	node: ParentNode,
	callback: (node: ParentNode | Node) => void | boolean | Promise<void>,
): Promise<void | boolean>
