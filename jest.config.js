module.exports = {
	"transform": {
		"\\.(ts)$": "ts-jest",
	},
	"moduleDirectories": [
		"src",
		"node_modules"
	],
	"testMatch": [
		"<rootDir>/src/**/__tests__/**/*.(ts)",
		"<rootDir>/src/**/?(*.)(spec|test).(ts)"
	],
	"moduleFileExtensions": [
		"ts",
	],
	"collectCoverageFrom": [
		"src/**/*.{ts}"
	],
	"transformIgnorePatterns": [
		"<rootDir>/node_modules/(?!lodash-es/.*)"
	],
	"moduleNameMapper": {
		"^lodash-es$": "<rootDir>/node_modules/lodash/index.js"
	},
	"coverageReporters": [
		"html",
		"text"
	]
}
