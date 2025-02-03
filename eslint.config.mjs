import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import eslintJs from "@eslint/js"
import importPlugin from "eslint-plugin-import"
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths"
import prettierRecommended from "eslint-plugin-prettier/recommended"
import tailwind from "eslint-plugin-tailwindcss"
import unicorn from "eslint-plugin-unicorn"
import unusedImports from "eslint-plugin-unused-imports"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  { ignores: ["**/.vitepress/", "**/dist/", "**/esm/", "**/.next/", "**/.next-local/", "./README.md"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  eslintJs.configs.recommended,
  prettierRecommended,
  {
    name: "절대 경로 import",
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: true, rootDir: "src", prefix: "@" },
      ],
    },
  },
  ...tailwind.configs["flat/recommended"],
  {
    settings: {
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl"],
        config: "tailwind.config.js",
        cssFiles: ["**/*.css", "!**/node_modules", "!**/.*", "!**/dist", "!**/build"],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [],
        classRegex: "^class(Name)?$",
      },
    },
  },
  {
    name: "사용하지 않는 import 제거",
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    name: "Config LanguageOption",
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: "import order",
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/order": [
        2,
        {
          groups: ["builtin", "external", ["parent", "sibling"], "index"],
          alphabetize: {
            order: "asc",
            caseInsensitive: false,
          },
        },
      ],
    },
  },
  {
    name: "파일 네임 지정",
    plugins: { unicorn },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  },
  {},
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "unicorn/prevent-abbreviations": "off",
    },
  },
  {
    files: ["**/*.{jsx,tsx,ts,jx"],
    rules: {
      "no-console": "warn",
    },
  },
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
]

export default eslintConfig
