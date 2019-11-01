import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import includePaths from 'rollup-plugin-includepaths'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

const globalsLibraries = {
	parse5: "parse5",
	lodash: "lodash",
	http: "http",
	https: "https",
	"image-size": "image-size",
	url: "url",
	"cache-manager": "cache-manager",
}

module.exports = {
	input: 'src/index.ts',
	output: [
		{
			file: 'lib/index.js',
			format: 'cjs',
			globals: globalsLibraries
		},
		{
			file: 'lib/index.es.js',
			format: 'esm',
			globals: globalsLibraries
		},
	],
	plugins: [
		globals(),
		builtins(),
		terser({ 
			exclude: [ '*es*' ]
		}),
		typescript(),
		includePaths({
			paths: [
				"src"
			]
		}),
	],
	external: [
		"parse5",
		"lodash",
		"image-size",
		"cache-manager",
	]
}
