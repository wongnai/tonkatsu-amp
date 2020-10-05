import includePaths from 'rollup-plugin-includepaths'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

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

module.exports = {
	input: 'src/index.ts',
	output: [
		{
			file: 'lib/index.js',
			format: 'cjs',
			globals: globalsLibraries,
		},
		{
			file: 'lib/index.es.js',
			format: 'esm',
			globals: globalsLibraries,
		},
	],
	plugins: [
		terser({
			module: true,
		}),
		typescript(),
		includePaths({
			paths: ['src'],
		}),
	],
	external: [
		'parse5',
		'lodash',
		'image-size',
		'cache-manager',
		'cache-manager-ioredis',
	],
}
