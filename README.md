# DHIS2 Dashboard Exercise
> React + TypeScript + Vite

[Demo on Netlify](https://sunny-gecko-395f0b.netlify.app/)

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

## CI/CD
All [GitHub Actions](https://github.com/isaniomoraes/dashboards-project/actions) are set in `.github/workflows/main.yml` file, currently, we have simple Lint and Cypress E2E testing for every git push and pull request creation.

Preview:
<img width="1351" alt="Screenshot 2023-11-09 at 18 15 07" src="https://github.com/isaniomoraes/dashboards-project/assets/3224086/9871fb99-06ba-43f5-8d99-8f401cd9ae5a">
<img width="1351" alt="Screenshot 2023-11-09 at 18 15 15" src="https://github.com/isaniomoraes/dashboards-project/assets/3224086/176828dd-fc4a-42e4-8acc-679f128ad03b">


## Improvements / TODOs
- [ ] Run more webvitals profile process to improve any performance gap.
- [ ] Add key handler to add the ability to favorite a dashboard using shortcut.
- [ ] Integrate DHIS2 Colors and Components if required, for the time beam I just used Radix-UI + Tailwind CSS.
- [ ] Move the favorites data storage from localStorage to a real API (Firebase, Supabase, Prisma, etc)

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
