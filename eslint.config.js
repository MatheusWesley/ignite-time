import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,tsx}"],
    ...pluginJs.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "quotes": ["error", "double"],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...tseslint.configs.recommended,
    languageOptions: {
      parser: tseslint.parser, // Adiciona o parser do typescript
      parserOptions: {
        project: true, // Habilita a analise de projeto do typescript
      },
    },
    rules: {
      "quotes": ["error", "double"],
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Detecta a versão do React automaticamente
      },
    },
  },
];