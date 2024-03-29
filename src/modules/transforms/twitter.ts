import { height, responsive, width } from 'modules/constants/image'
import { walk } from 'modules/lib/walk'
import { getAttribute } from 'modules/utils/dom'
import { Element } from 'parse5'

export default function transformTwitter(node: Element) {
	const regex = /https:\/\/twitter\.com\/.+\/status[es]*\/([0-9]+).*/
	return walk(node, subNode => {
		const treeNode = subNode as Element
		switch (treeNode.nodeName) {
			case 'a':
				if (getAttribute(treeNode, 'href')?.search('https://twitter.com/') === 0) {
					const tweetUrl = getAttribute(treeNode, 'href') ?? ''
					const matches = regex.exec(tweetUrl)
					if (!matches) {
						return
					}
					node.nodeName = 'amp-twitter'
					node.tagName = 'amp-twitter'
					node.attrs = [responsive, width, height, { name: 'data-tweetid', value: matches[1] }]
					node.childNodes.splice(0, node.childNodes.length)
				}
				break
			default:
				break
		}
	})
}
