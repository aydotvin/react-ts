# React TS Setup

## Steps:

- Create the folders `src`, `build` in root directory.
- `npm init -y`
- Create and setup `.prettierrc` file in the root.

```
	{
		"printWidth": 120,
		"tabWidth": 2,
		"useTabs": false,
		"semi": true,
		"singleQuote": false,
		"quoteProps": "consistent",
		"jsxSingleQuote": false,
		"trailingComma": "all",
		"bracketSpacing": true,
		"bracketSameLine": false,
		"arrowParens": "always",
		"endOfLine": "lf",
		"singleAttributePerLine": false
	}
```

### TS setup:

- `npm i -D typescript @types/react @types/react-dom`
- Create and setup `tsconfig.json` in the root.

```
	{
		"compilerOptions": {
			"baseUrl": "./",
			"paths": {
				"@configs/*": ["./src/configs/*"],
				"@apis/*": ["./src/apis/*"],
				"@components/*": ["./src/components/*"],
				"@layouts/*": ["./src/layouts/*"],
				"@services/*": ["./src/services/*"],
				"@pages/*": ["./src/pages/*"],
				"@assets/*": ["./src/assets/*"],
				"@styles/*": ["./src/styles/*"],
				"@state/*": ["./src/state/*"],
				"@utils/*": ["./src/utilities/*"],
				"@slices": ["./src/state/slices/index"],
				"@selectors": ["./src/state/selectors/index"],
				"@types": ["./src/types/index"]
			},
			"target": "es5",
			"module": "esnext",
			"lib": ["dom", "dom.iterable", "esnext"],
			"jsx": "react-jsx",
			"strict": true,
			"esModuleInterop": true,
			"skipLibCheck": true,
			"forceConsistentCasingInFileNames": true,
			"moduleResolution": "node",
			"resolveJsonModule": true,
			"noEmit": true,
			"outDir": "build",
			"sourceMap": true,
			"declaration": true
		},
		"include": ["src/**/*"],
		"exclude": ["node_modules", "build"]
	}
```

### Babel setup:

- Install babel packages. `npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript`
- Create `.babelrc` file in root folder and add the babel presets. This will convert modern js features to format that browsers can understand.

```
	{
		"presets": [
			"@babel/preset-env",
			[
				"@babel/preset-react",
				{
					"runtime": "automatic"
				}
			],
			"@babel/preset-typescript"
		]
	}
```

### Basics:

- Create `index.html` file inside the src folder and setup root div.
- `npm i react react-dom`
- Create `index.tsx` in the src folder and add createRoot and root.render code in it.

### Webpack setup:

- Install webpack packages. `npm i -D webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin babel-loader css-loader style-loader sass sass-loader @pmmmwh/react-refresh-webpack-plugin tsconfig-paths-webpack-plugin dotenv-webpack serve`
- Setup the webpack environment configs in a webpack folder:
  - `webpack.common.js` - entry, output, common plugins, common module.rules, etc.
  - `webpack.dev.js` - mode set to development, dev specific properties such as devtool, devServer, dev specific extra plugins, etc.
  - `webpack.prod.js` - mode set to production, prod specific optimisation stuff added here.
  - Import the common config in dev and prod files and use it with merge function.
  - `@pmmmwh/react-refresh-webpack-plugin` - this preserves the state values when OTHER files/styles are updated in the browser due to webpack listening to changes.

### Absolute path setup:

- npm i -D tsconfig-paths-webpack-plugin (already installed in the above webpack step)
- Add the following compiler options to the `tsconfig.json`

```
	"baseUrl": "./",
	"paths": {
		"@src/*": ["./src/*"],
		"@components/*": ["./src/components/*"],
		"@assets/*": ["./src/assets/*"],
		"@styles/*": ["./src/styles/*"]
		... add paths as required. Available in the tsconfig data.
	},
```

- In `webpack.common.js` import the following package and use it in resolve.plugins under common webpack module exports

```
	const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
	...
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
		plugins: [new TsconfigPathsPlugin()],	<< THIS
	},
	...
```

- This works in scss and css files too.

### .env file setup: (TODO: env files for different environments)

- Create .env file in root directory and add the keys as required.

```
	ENVKEY1=ENVVALUE1
```

- `npm i -D dotenv-webpack` (already installed in the above webpack step)
- Import the following in common webpack config and call it under plugins.

```
	const Dotenv = require("dotenv-webpack");
	...
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "..", "./src/index.html"),
		}),
		new Dotenv(),	<< THIS
	],
	...
```

- Access in the files the following way.

```
	console.log(process.env.ENVKEY1);
```

### Declarations setup:

- Add the declarations file (declarations.d.ts) in src folder with the following code in it.

```
	declare module "*.module.css";
	declare module "*.module.scss";
	declare module "*.jpg";
	... more to be added here
```

### package.json script setup:

- Add the following scripts.

```
	"scripts": {
		"dev": "webpack serve --config ./webpack/webpack.dev.js --env flag1=value1 flag2=value2 flag3",
		"build": "webpack --config ./webpack/webpack.prod.js --env flag1=value1",
		"serve": "serve -s -l 9001 build",
		"prod": "npm run build && npm run serve",
    "test": "jest --config=jest.config.js"
	},
```

- All the flags passed after --env will be available in the first param in the module.exports function in webpack config file.

```
	module.exports = (envs, args) => {
		console.log(envs);	//	{ WEBPACK_SERVE: true, flag1: 'value1', flag2: 'value2', flag3: true }
		...
	}
```

---

## Redux toolkit setup:

- `npm install @reduxjs/toolkit react-redux @types/react-redux`
- Create a `store.ts` file in src/state/`here`
  - In this, combine the reducers. (reducers come from the slice files)
  - Configure and export the store.
- Wrap the app component or the router component with the react-redux `Provider` and pass the store prop.
- Create slice files and define and export reducer and async thunk methods/actions from `src/state/slices/moduleSlice.ts` via `index.ts` in the same `slices` folder.
- Create selector files and define and export each selector from `src/state/selectors/moduleSelector.ts` via `index.ts` in the same `selectors` folder.

## Redux persist setup:

- `npm install redux-persist`
- In the store.ts, create the `persisted reducer` and `persisted store`.
- Import the persisted store in the index.tsx file. Within the redux provider, wrap the app with `PersistGate` and pass the `persistor` prop and use persisted store as its value.

---

## Testing setup:

- `npm i -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom identity-obj-proxy`
- Setup `jest.config.js` in the root.

```
	module.exports = {
		preset: "ts-jest",
		testEnvironment: "jsdom",
		// testEnvironment: 'jest-environment-jsdom',
		moduleNameMapper: {
			"^@configs/(.*)$": "<rootDir>/src/configs/$1",
			"^@apis/(.*)$": "<rootDir>/src/apis/$1",
			"^@components/(.*)$": "<rootDir>/src/components/$1",
			"^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
			"^@services/(.*)$": "<rootDir>/src/services/$1",
			"^@pages/(.*)$": "<rootDir>/src/pages/$1",
			"^@assets/(.*)$": "<rootDir>/src/assets/$1",
			"^@styles/(.*)$": "<rootDir>/src/styles/$1",
			"^@state/(.*)$": "<rootDir>/src/state/$1",
			"^@utils/(.*)$": "<rootDir>/src/utilities/$1",
			"^@slices$": "<rootDir>/src/state/slices/index",
			"^@selectors$": "<rootDir>/src/state/selectors/index",
			"^@types$": "<rootDir>/src/types/index",
			"\\.(css|less|scss)$": "identity-obj-proxy",
		},
		setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
		collectCoverage: true,
		coverageReporters: ["html", "text"],
	};
```

---

## Folder structure:

- `apis` - All the api calls that is made to backend/external apis.
- `assets` - fonts, images and stuff.
- `components` - navbar, footer, buttons, tooltips, input helpers and stuff. (component file, style file, test file)
- `configs` - acts as a intermediary between env file and the app files.
- `layouts` - wrapper components for the main content. (component file, style file, test file)
- `pages` - components for each route. (component file, style file, test file)
- `routes` - router file with post and pre login route checks.
- `services` - module wise service files to handle all the logic part of the flow and to call APIs.
- `state` - contains the `store`, individual `slices` exported via index file and individual `selectors` exported via index file.
- `styles` - defining all the fonts, html resets, utility classes, scss variables and importing everything in index file and importing the index file in `index.tsx`
- `types` - module wise type definitions to be exported via the index file. The type names needs to start with module name to prevent overlap of varibles in the index file while exporting.
- `utilities` - custom error wrapper, common util functions and stuff.

---
