# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
Todo List App

A simple Todo List application built with React and Vite.
Features

    Add, edit, and delete tasks
    Filter tasks by priority and status
    Pagination for task lists

Installation

Follow these steps to set up and run the project locally:
Prerequisites

Ensure you have the following installed:

    Node.js (version 16 or higher recommended)
    npm (comes with Node.js)

Steps

    Clone this repository:

git clone <repository-url>

Navigate to the project folder:

cd todo-list-app

Install dependencies:

    npm install

Development

To start the development server:

npm run dev

This command will start the Vite development server. Open http://localhost:5173 in your browser to view the app.
Build for Production

To build the project for production:

npm run build

The output files will be located in the dist folder.
License

This project is licensed under the MIT License.
