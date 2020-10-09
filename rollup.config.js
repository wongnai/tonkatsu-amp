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

const esm = {
	input: 'src/index.ts',
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
				'parse5',
				'lodash/filter',
				'lodash/get',
				'lodash/merge',
				'image-size',
				'cache-manager',
				'cache-manager-ioredis',
			],
		}),
		cjs(),
		resolve(),
		typescript(),
		terser(),
		visualizer({
			filename: './dist/stats.esm.html',
		}),
	],
}

export default [esm]
