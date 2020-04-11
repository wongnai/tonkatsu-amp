module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'\\.(ts)$': 'ts-jest',
	},
	moduleDirectories: ['src', 'node_modules'],
	testMatch: [
		'<rootDir>/**/__tests__/**/*.(ts)',
		'<rootDir>/**/?(*.)(spec|test).(ts)',
	],
	collectCoverageFrom: ['src/**/*.{ts}'],
	transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es/.*)'],
	moduleNameMapper: {
		'^lodash-es$': '<rootDir>/node_modules/lodash/index.js',
	},
	coverageReporters: ['html', 'text'],
	verbose: true,
}
