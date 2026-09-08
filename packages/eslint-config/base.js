import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

const importSortGroups = [
	["^node:"],
	["^react", "^next"],
	["^@?\\w"],
	["^@/"],
	["^\\u0000"],
	["^\\.\\.(?!/?$)", "^\\.\\./?$"],
	["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
];

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	{
		plugins: {
			import: importPlugin,
			"simple-import-sort": simpleImportSort,
			superdao: {
				rules: {},
			},
			turbo: turboPlugin,
		},
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					fixStyle: "separate-type-imports",
					prefer: "type-imports",
				},
			],
			"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
			"quote-props": ["error", "as-needed"],
			"simple-import-sort/imports": ["error", { groups: importSortGroups }],
			"simple-import-sort/exports": "error",
			"@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
			"turbo/no-undeclared-env-vars": "warn",
		},
	},
	{
		plugins: {
			onlyWarn,
		},
	},
	{
		ignores: ["dist/**", ".next/**", "**/.turbo/**", "**/coverage/**"],
	},
];
