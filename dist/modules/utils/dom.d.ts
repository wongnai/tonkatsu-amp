import parse5 from 'parse5'
export declare function getAttribute(
	node: parse5.DefaultTreeElement,
	nameToFind: string,
): string | undefined
export declare function setAttribute(
	node: parse5.DefaultTreeElement,
	name: string,
	value: string,
): void
export declare function wrap(
	node: parse5.DefaultTreeElement,
	wrapped: parse5.DefaultTreeElement,
): parse5.DefaultTreeElement
