## Monorepo for DAO-strategies by DAOStack

The packages in this monorepo have cross-depencies among them (The code in `core` is used in `contracts` and `frontend`). This `core` package is not even published. For this reason we need to use yarn workspaces to install the dependencies of all packages.

On the root folder run

```
yarn install
```

Now, we need to build the `@dao-strategies/core` library so that it can be used in the tests and in the frontend:

```
cd core
yarn build
```

This will create the `./dist` folder into the `core` package that other packages will use for now (instead of the npm public repository).

Then cd into `packages/contracts` and run

```
yarn compile
yarn chain
```

Open another terminal and run

```
yarn deploy
```

Then you can test with

```
yarn test
```

The `.vscode` folder has a launch configuration to run the tests and debug them (the JS part). You can, thus, run the tests from the VSCode Run & Debug view and add breakpoints in the `main.test.ts` file.

If you want to develop the `core` folder, adding new features, you migh want to run `yarn watch` instead of `yarn build` to re-build it at every change.
