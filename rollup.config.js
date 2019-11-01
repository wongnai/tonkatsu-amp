import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import includePaths from 'rollup-plugin-includepaths'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

module.exports = {
	input: 'src/index.ts',
	output: [
		{
			file: 'lib/index.js',
			format: 'cjs',
		},
		{
			file: 'lib/index.es.js',
			format: 'esm',
		},
		{
			file: 'lib/index.iife.js',
			format: 'iife',
			name: 'tonakatsu-amp.iife.js',
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
