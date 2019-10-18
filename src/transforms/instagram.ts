import parse5 from 'parse5'
import { getAttribute } from 'domUtils'
import { walk } from 'walk'
import { responsive, width, height } from '../constants'

export default function transformInstagram(node: parse5.DefaultTreeElement) {
	const regex = /https:\/\/www.instagram\.com\/p\/([A-Za-z0-9]+)\//

	return walk(node, async subNode => {
		const treeNode = subNode as parse5.DefaultTreeElement
		switch (treeNode.nodeName) {
			case 'a':
				if (
					getAttribute(treeNode, 'href')!.search(
						'https://www.instagram.com/',
					) === 0
				) {
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
		}
	})
}
