# SpeakGPT + FALL-E

Ten szablon stanowi minimalne przygotowanie do pracy z React w Vite z HMR i pewnymi regułami ESLint.

Aktualnie dostępne są dwa oficjalne wtyczki:

- @vitejs/plugin-react używa Babel dla szybkiego odświeżania
- @vitejs/plugin-react-swc używa SWC dla szybkiego odświeżani

## Rozszerzanie konfiguracji ESLint

Jeśli tworzy się aplikację produkcyjną, zalecane zaktualizowanie konfiguracji, aby włączyć reguły eslinta:

- Konfiguracja właściwości `parserOptions` na najwyższym poziomie:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Zamienić `plugin:@typescript-eslint/recommended` na `plugin:@typescript-eslint/recommended-type-checked` albo `plugin:@typescript-eslint/strict-type-checked`
- Opcjonalnie dodać `plugin:@typescript-eslint/stylistic-type-checked`
- Zainstalować [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) i dodać `plugin:react/recommended` & `plugin:react/jsx-runtime` do `extends` listy
