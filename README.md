# DHIS2 Dashboard Exercise
> React + TypeScript + Vite

This template offers a streamlined setup to quickly integrate React into Vite with Hot Module Replacement (HMR) and essential ESLint rules.

The core technologies include:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Radix-UI](https://www.radix-ui.com/primitives)
- [Tailwind CSS](https://tailwindcss.com/)
- [DHIS2 UI](https://ui.dhis2.nu/)

## Radix-UI
To build component primitives that support assistive technology (WAI-ARIA compliant, Keyboard navigation, Focus management, and Screen reader tested), I utilize [Radix-UI](https://www.radix-ui.com/primitives).

> Radix-UI provides the component primitive unstyled, allowing the team to customize it according to their preferences.

## react-query
I leverage react-query to handle API calls and states directly at the component level. However, the structure can be adapted based on team or project alignment. This approach enhances Developer Experience (DX) and maintainability by consolidating the main logic in one location.

## Install and Run
```bash
yarn install && yarn dev
```

## Running Cypress End-to-End Tests
```bash
yarn cypress
```

## Expanding the ESLint Configuration

For production applications, consider updating the ESLint configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property as follows:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
