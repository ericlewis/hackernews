const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = 'eslint-rules';

module.exports = {
	extends: ['airbnb', 'prettier', 'prettier/react'],
	plugins: [
		'react',
		'react-native',
		'jsx-a11y',
		'import',
		'prettier',
		'rulesdir',
	],
	parser: 'babel-eslint',
	env: {
		es6: true,
		node: true,
	},
	rules: {
		'no-tabs': 0,
		'import/extensions': 0,
		'import/no-dynamic-require': 0,
		'import/no-unresolved': 2,
		'import/no-commonjs': 2,
		'import/prefer-default-export': 0,
		'new-cap': 0,
		'arrow-body-style': 0,
		'no-else-return': 0,
		'class-methods-use-this': 1,
		'object-shorthand': 0,
		'dot-notation': 0,
		'no-shadow': 0,
		camelcase: 0,
		'no-return-assign': 0,
		'prefer-destructuring': 1,
		'default-case': 0,
		'no-class-assign': 0,
		'no-duplicate-imports': 0,
		'no-plusplus': 0,
		'no-underscore-dangle': 0,
		'no-unused-expressions': 0,
		'no-use-before-define': 0,
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				useTabs: true,
				jsxBracketSameLine: true,
				trailingComma: 'all',
			},
		],
		'react-native/no-unused-styles': 2,
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'react/jsx-filename-extension': 0,
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'react/sort-comp': 0,
		'react/prop-types': 0,
		'react/no-multi-comp': 0,
		'react/require-default-props': 0,
		'react/forbid-prop-types': 0,
		'react/no-array-index-key': 1,
		'react/prefer-stateless-function': 0,
		'rulesdir/no-stylesheet-flatten': 2,
	},
	settings: {
		'import/resolver': {
			'babel-module': {},
		},
	},
};
