import cjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import cleaner from 'rollup-plugin-cleaner'
import includePaths from 'rollup-plugin-includepaths'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import config from './package.json'

const globalsLibraries = {
	parse5: 'parse5',
	lodash: 'lodash',
	http: 'http',
	https: 'https',
	'image-size': 'image-size',
	url: 'url',
	'cache-manager': 'cache-manager',
	'cache-manager-ioredis': 'cache-manager-ioredis',
}

export default {
	input: config.main,
	output: {
		dir: config.deploy,
		format: 'cjs',
		globals: globalsLibraries,
		sourcemap: true,
	},
	plugins: [
		cleaner({
			targets: [config.deploy],
		}),
		includePaths({
			paths: ['./src'],
			extensions: ['.ts'],
			external: [
				'cache-manager',
				'cache-manager-ioredis',
				'http',
				'https',
				'url',
				'fs',
				'path',
				'events',
				'util',
			],
		}),
		resolve(),
		cjs(),
		typescript(),
		terser(),
		visualizer({
			filename: './dist/stats.esm.html',
		}),
	],
}
