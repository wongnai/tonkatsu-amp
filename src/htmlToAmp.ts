import parse5 from 'parse5'
import { walk } from './walk'
import { getAttribute, setAttribute, wrap } from './domUtils'
import { getCachedImageSize } from './imageSize'
import { filter } from 'lodash'

const height = { name: 'height', value: '1280' }
const width = { name: 'width', value: '1920' }
const responsive = { name: 'layout', value: 'responsive' }
const DEFAULT_HEIGHT = '1280'
const DEFAULT_WIDTH = '1920'

async function transformImg(node: parse5.DefaultTreeElement) {
	let imageSize
	const imageSrc = getAttribute(node, 'src')
	try {
		imageSize = await getCachedImageSize(imageSrc!)
	} catch (e) {
		console.error(`Failed to get image size: ${imageSrc}`, e)
		imageSize = { width: 1920, height: 1280 }
	}
	node.nodeName = 'amp-img'
	node.tagName = 'amp-img'
	node.attrs = filter(node.attrs, attr => attr.name !== 'width')
	node.attrs = filter(node.attrs, attr => attr.name !== 'height')
	node.attrs = [
		...node.attrs,
		responsive,
		{ name: 'width', value: imageSize.width.toString() },
		{ name: 'height', value: imageSize.height.toString() },
	]

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', `width: 100vw; margin: 0 calc(50% - 50vw);`)
	wrap(node, wrapper)
}

function transformInstagram(node: parse5.DefaultTreeElement) {
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

function transformYoutubeVideo(node: parse5.DefaultTreeElement) {
	const youtubeSrc = getAttribute(node, 'src')
	const videoWidth = getAttribute(node, 'width') || DEFAULT_WIDTH
	const videoHeight = getAttribute(node, 'height') || DEFAULT_HEIGHT
	const regex = /https\:\/\/www\.youtube\.com\/embed\/([^\?]+)/
	const matches = regex.exec(youtubeSrc!)
	if (!matches) {
		return
	}
	node.nodeName = 'amp-youtube'
	node.tagName = 'amp-youtube'
	node.childNodes = []
	node.attrs = [
		responsive,
		{ name: 'width', value: videoWidth! },
		{ name: 'height', value: videoHeight! },
		{ name: 'data-videoid', value: matches[1] },
		{ name: 'style', value: 'margin-top: 16px; margin-bottom: 16px;' },
	]

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', 'width: 100vw; margin: 0 calc(50% - 50vw);')
	wrap(node, wrapper)
}

function transformFont(node: parse5.DefaultTreeElement) {
	node.nodeName = 'span'
	node.tagName = 'span'
	node.attrs = [
		{ name: 'style', value: `color: ${getAttribute(node, 'color')}` },
	]
}

function transformTwitter(node: parse5.DefaultTreeElement) {
	const regex = /https:\/\/twitter\.com\/.+\/status[es]*\/([0-9]+).*/
	return walk(node, async subNode => {
		const treeNode = subNode as parse5.DefaultTreeElement
		switch (treeNode.nodeName) {
			case 'a':
				if (
					getAttribute(treeNode, 'href')!.search('https://twitter.com/') === 0
				) {
					const tweetUrl = getAttribute(treeNode, 'href') as string
					const matches = regex.exec(tweetUrl)
					if (!matches) {
						return
					}
					node.nodeName = 'amp-twitter'
					node.tagName = 'amp-twitter'
					node.attrs = [
						responsive,
						width,
						height,
						{ name: 'data-tweetid', value: matches[1] },
					]
					node.childNodes.splice(0, node.childNodes.length)
				}
				break
		}
	})
}

function transformFacebook(node: parse5.DefaultTreeElement) {
	const postWidth = getAttribute(node, 'width') || DEFAULT_WIDTH
	const postHeight = getAttribute(node, 'height') || DEFAULT_HEIGHT
	const src = decodeURIComponent(getAttribute(node, 'src')!)
	const regex = /https:\/\/www\.facebook\.com\/plugins\/(.+)\.php\?href=(.+)/
	const matches = regex.exec(src)
	if (!matches) {
		return
	}
	node.nodeName = 'amp-facebook'
	node.tagName = 'amp-facebook'
	node.childNodes = []
	node.attrs = [
		responsive,
		{ name: 'width', value: postWidth! },
		{ name: 'height', value: postHeight! },
		{ name: 'data-embed-as', value: matches[1] },
		{ name: 'data-href', value: matches[2] },
	]

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', `max-width: ${postWidth}px; margin: auto;`)
	wrap(node, wrapper)
}

function transformIframe(node: parse5.DefaultTreeElement) {
	const frameWidth = getAttribute(node, 'width') || DEFAULT_WIDTH
	const frameHeight = getAttribute(node, 'height') || DEFAULT_HEIGHT
	let src = getAttribute(node, 'src')!
	const regex = /^\/\//
	const regexHttp = /^http\:\/\//
	if (regex.test(src)) {
		src = `https:${src}`
	}
	if (regexHttp.test(src)) {
		src = src.replace('http://', 'https://')
	}

	node.nodeName = 'amp-iframe'
	node.tagName = 'amp-iframe'
	const placeholder = {
		nodeName: 'amp-img',
		tagName: 'amp-img',
		attrs: [
			responsive,
			{
				name: 'alt',
				value: 'loading',
			},
			{
				name: 'placeholder',
				value: '',
			},
			{
				name: 'src',
				value: '/assets/loading.gif',
			},
			{
				name: 'width',
				value: '100',
			},
			{
				name: 'height',
				value: '100',
			},
		],
		namespaceURI: 'http://www.w3.org/1999/xhtml',
		parentNode: node,
		childNodes: [],
	} as parse5.DefaultTreeElement
	node.childNodes.push(placeholder)
	node.attrs = [
		responsive,
		{ name: 'width', value: frameWidth! },
		{ name: 'height', value: frameHeight! },
		{ name: 'src', value: src! },
		{ name: 'sandbox', value: 'allow-scripts allow-same-origin' },
	]

	const wrapper = (parse5.parseFragment(
		'<div />',
	) as parse5.DefaultTreeDocumentFragment)
		.childNodes[0] as parse5.DefaultTreeElement
	setAttribute(wrapper, 'style', `width: 100%; margin: auto;`)
	wrap(node, wrapper)
}

function filterOut(node: parse5.DefaultTreeElement) {
	node.nodeName = 'div'
	node.tagName = 'div'
	node.attrs.length = 0
	node.childNodes.length = 0
}

export default async function htmlToAmp(ast: parse5.DefaultTreeDocument) {
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
					transformYoutubeVideo(treeNode)
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
		((ast as parse5.DefaultTreeDocument)
			.childNodes[0] as parse5.DefaultTreeDocument).childNodes[1],
	)
}
