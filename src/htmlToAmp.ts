import cacheManager from 'cache-manager'
import { walk } from 'modules/lib/walk'
import transformFacebook from 'modules/transforms/facebook'
import transformFont from 'modules/transforms/fonts'
import transformIframe from 'modules/transforms/iframe'
import transformImg from 'modules/transforms/image'
import transformInstagram from 'modules/transforms/instagram'
import transformTwitter from 'modules/transforms/twitter'
import transformYoutube from 'modules/transforms/youtube'
import { getAttribute } from 'modules/utils/dom'
import parse5 from 'parse5'

const filterOut = (node: parse5.DefaultTreeElement) => {
	node.nodeName = 'div'
	node.tagName = 'div'
	node.attrs.length = 0
	node.childNodes.length = 0
}

export default async function htmlToAmp(htmlString: string, cache: cacheManager.Cache) {
	const ast = parse5.parse(htmlString.trim()) as parse5.DefaultTreeDocument

	await walk(ast, async node => {
		const treeNode = node as parse5.DefaultTreeElement
		switch (treeNode.nodeName) {
			case 'img':
				await transformImg(treeNode, cache)
				break
			case 'blockquote':
				switch (getAttribute(treeNode, 'class')) {
					case 'instagram-media':
						await transformInstagram(treeNode)
						break
					case 'twitter-tweet':
						await transformTwitter(treeNode)
						break
					default:
						break
				}
				break
			case 'iframe':
				if (!getAttribute(treeNode, 'src')) {
					filterOut(treeNode)
				} else if (getAttribute(treeNode, 'src')?.search(/youtube/) !== -1) {
					transformYoutube(treeNode)
				} else if (getAttribute(treeNode, 'src')?.search(/facebook/) !== -1) {
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
				break
			default:
				break
		}
	})
	return parse5.serialize((ast.childNodes[0] as parse5.DefaultTreeDocument).childNodes[1])
}
