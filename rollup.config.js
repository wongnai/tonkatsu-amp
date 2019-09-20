import { terser } from "rollup-plugin-terser"
import typescript from 'rollup-plugin-typescript2'
import includePaths from 'rollup-plugin-includepaths'

module.exports = {
	input: 'src/index.ts',
	output: [
		{
			file: 'lib/index.js',
			format: 'cjs'
		},
		{
			file: 'lib/index.es.js',
			format: 'esm'
		},
		{
			file: 'lib/index.iife.js',
			format: 'iife'
		},
	],
	plugins: [
		terser({ 
			exclude: [ '*es*' ]
		}),
		typescript(),
		includePaths({
			paths: [
				"src"
			]
		})
	]
}
