import { height, responsive, width } from 'modules/constants/image'
import { walk } from 'modules/lib/walk'
import { getAttribute } from 'modules/utils/dom'
import { Element } from 'parse5'

export default function transformInstagram(node: Element) {
	const regex = /https:\/\/www.instagram\.com\/p\/([A-Za-z0-9]+)\//

	return walk(node, subNode => {
		const treeNode = subNode as Element
		switch (treeNode.nodeName) {
			case 'a':
				if (getAttribute(treeNode, 'href')?.search('https://www.instagram.com/') === 0) {
					const instagramUrl = getAttribute(treeNode, 'href') as string
					const matches = regex.exec(instagramUrl)
					if (!matches) {
						return
					}
					node.nodeName = 'amp-instagram'
					node.tagName = 'amp-instagram'
					node.attrs = [
						responsive,
						width,
						height,
						{ name: 'data-shortcode', value: matches[1] },
						{ name: 'data-captioned', value: '' },
					]
					node.childNodes.splice(0, node.childNodes.length)
				}
				break
			default:
				break
		}
	})
}
