import parse5 from 'parse5'
import { walk } from './walk'
import { getAttribute } from './domUtils'
import transformImg from 'transforms/image'
import transformInstagram from 'transforms/instagram'
import transformTwitter from 'transforms/twitter'
import transformYoutube from 'transforms/youtube'
import transformFacebook from 'transforms/facebook'
import transformIframe from 'transforms/iframe'
import transformFont from 'transforms/fonts'

function filterOut(node: parse5.DefaultTreeElement) {
	node.nodeName = 'div'
	node.tagName = 'div'
	node.attrs.length = 0
	node.childNodes.length = 0
}

export default async function htmlToAmp(htmlString: string) {
	const ast = parse5.parse(htmlString.trim()) as parse5.DefaultTreeDocument

	await walk(ast, async node => {
		const treeNode = node as parse5.DefaultTreeElement
		switch (treeNode.nodeName) {
			case 'img':
				await transformImg(treeNode)
				break
			case 'blockquote':
				switch (getAttribute(treeNode, 'class')) {
					case 'instagram-media':
						await transformInstagram(treeNode)
						break
					case 'twitter-tweet':
						await transformTwitter(treeNode)
						break
				}
				break
			case 'iframe':
				if (!getAttribute(treeNode, 'src')) {
					filterOut(treeNode)
				} else if (
					getAttribute(treeNode, 'src')!.search('https://www.youtube.com/') ===
					0
				) {
					transformYoutube(treeNode)
				} else if (
					getAttribute(treeNode, 'src')!.search('https://www.facebook.com/') ===
					0
				) {
					transformFacebook(treeNode)
				} else {
					transformIframe(treeNode)
				}
				break
			case 'font':
				if (treeNode.nodeName === 'font') {
					transformFont(treeNode)
				}
				break
			case 'object':
				filterOut(treeNode)
				return
			default:
				return
		}
	})
	return parse5.serialize(
		(ast.childNodes[0] as parse5.DefaultTreeDocument).childNodes[1],
	)
}
