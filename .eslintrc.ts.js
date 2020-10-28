module.exports = {
	files: ['*.ts', '*.tsx'],
	plugins: ['@typescript-eslint', 'jest'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	extends: [
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
		'prettier/react',
		'prettier/@typescript-eslint',
	],
	rules: {
		'class-methods-use-this': 'off',
		'no-return-assign': 'off',
		'global-require': 'off',
		'spaced-comment': 'off',
		'no-useless-constructor': 'off',
		'no-shadow': 'off',
		'no-tabs': 'off',
		'object-curly-newline': 'off',
		'implicit-arrow-linebreak': 'off',
		'no-param-reassign': 'off',
		'consistent-return': 'off',
		'prefer-destructuring': 'off',
		'dot-notation': 'off',
		'no-else-return': 'off',
		'func-names': 'off',
		'no-plusplus': 'off',
		'guard-for-in': 'off',
		'no-restricted-syntax': 'off',
		'no-restricted-globals': 'off',
		'max-classes-per-file': 'off',

		// typescript
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false,
			},
		],
		'@typescript-eslint/await-thenable': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/prefer-regexp-exec': 'off',
		'@typescript-eslint/no-unused-expressions': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',

		// import
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				mjs: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'import/prefer-default-export': 'off',
		'import/no-dynamic-require': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/no-cycle': 'off',
		'import/no-mutable-exports': 'off',

		// prefer typescript validator instead
		'import/no-unresolved': 'off',
		'@typescript-eslint/no-unused-vars': 'off',

		'no-await-in-loop': 'off',
	},
}
