import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintConfigPrettier from 'eslint-config-prettier'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import importPlugin from 'eslint-plugin-import'
import sonarjs from 'eslint-plugin-sonarjs'

const sonarjsRecommended = sonarjs.configs.recommended

const sonarjsWarn = {
  ...sonarjsRecommended,
  rules: Object.fromEntries(
    Object.entries(sonarjsRecommended.rules)
      .filter(([, severity]) => severity !== 'off')
      .map(([rule, severity]) => [
        rule,
        severity === 'error' ? 'warn' : severity,
      ])
  ),
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  betterTailwindcss.configs['recommended-warn'],
  sonarjsWarn,
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
    rules: {
      // Prettier + prettier-plugin-tailwindcss ya formatean className
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import/first': 'error',
      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'warn',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  eslintConfigPrettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
