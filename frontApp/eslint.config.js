import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
   { ignores: ["dist/**", "node_modules/**"] },
   eslint.configs.recommended,
   ...tseslint.configs.recommended,
   ...pluginVue.configs["flat/recommended"],
   {
      files: ["**/*.vue"],
      languageOptions: {
         parserOptions: {
            parser: tseslint.parser,
         },
      },
      rules: {
         "vue/multi-word-component-names": "off",
      },
   },
   {
      files: ["src/**/*.ts", "src/**/*.vue"],
      languageOptions: {
         globals: globals.browser,
      },
   },
   {
      files: ["vite.config.ts"],
      languageOptions: {
         globals: globals.node,
      },
   },
   eslintConfigPrettier
);
