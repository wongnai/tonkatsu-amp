import cacheManager from 'cache-manager'
import http from 'http'
import https from 'https'
import { imageSize } from 'image-size'
import { ISizeCalculationResult } from 'image-size/dist/types/interface'
import { parse as urlParse } from 'url'

const CACHE_PREFIX = 'img_size:'

export function getImageSize(url: string): Promise<ISizeCalculationResult> {
	return new Promise((resolve, reject) => {
		let requestFunction
		const parsedUrl = urlParse(url)

		if (parsedUrl.protocol === 'http:') {
			requestFunction = http.get
		} else if (parsedUrl.protocol === 'https:') {
			requestFunction = https.get
		} else {
			return reject(new Error('Unsupported scheme'))
		}

		const req = requestFunction(parsedUrl, (res) => {
			let chunks = Buffer.alloc(0)
			let lastError: Error

			if (res.statusCode !== 200) {
				req.abort()
				reject(Error('Cannot fetch image'))
				return
			}
			const contentType = res.headers['content-type']
			if (!contentType || !contentType.startsWith('image/')) {
				req.abort()
				reject(Error('File is not image'))
				return
			}

			res.on('data', (chunk) => {
				chunks = Buffer.concat([chunks, chunk])

				try {
					const size = imageSize(chunks)

					if (size) {
						req.abort()
						resolve(size)
					}
				} catch (e) {
					lastError = e
				}
			})

			res.on('end', () => {
				reject(lastError)
			})
		})

		req.on('error', (err) => {
			reject(err)
		})
	})
}

export function getCachedImageSize(
	url: string,
	cache: cacheManager.Cache,
): Promise<ISizeCalculationResult> {
	return cache.wrap(CACHE_PREFIX + url, () => getImageSize(url))
}
