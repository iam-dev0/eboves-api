# Eboves APIs
**Online eCommerce Shop** [https://github.com/awais000/eboves-website](https://github.com/awais000/eboves-website)

**Managment System** [https://github.com/awais000/eboves-management-portal](https://github.com/awais000/eboves-management-portal)


# We used TypeScript-Node-Starter as boilerplate.
[![Dependency Status](https://david-dm.org/Microsoft/TypeScript-Node-Starter.svg)](https://david-dm.org/Microsoft/TypeScript-Node-Starter) [![Build Status](https://travis-ci.org/Microsoft/TypeScript-Node-Starter.svg?branch=master)](https://travis-ci.org/Microsoft/TypeScript-Node-Starter)

**Live Demo**: [https://typescript-node-starter.azurewebsites.net/](https://typescript-node-starter.azurewebsites.net/)

The main purpose of this repository to build a headless eCommerce platform that can be set up easily and with minimal changes and you can have your own eCommerce platform up and running in no time.
# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Deploying the app](#deploying-the-app)
	- [Pre-reqs](#pre-reqs-1)
	- [Deploying to Azure App Service](#deploying-to-azure-app-service)
- [TypeScript + Node](#typescript--node)
	- [Getting TypeScript](#getting-typescript)
	- [Project Structure](#project-structure)
	- [Building the project](#building-the-project)
	- [Type Definition (`.d.ts`) Files](#type-definition-dts-files)
	- [Debugging](#debugging)
	- [Testing](#testing)
	- [ESLint](#eslint)
- [Dependencies](#dependencies)
	- [`dependencies`](#dependencies-1)
	- [`devDependencies`](#devdependencies)
- [Hackathon Starter Project](#hackathon-starter-project)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MySql](https://www.mysql.com/downloads/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/awais000/eboves-api.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your MySQl server
create a database (dev).
Enter Your credentials into .env file.
```

# Database Information on development
DEV_DATABASE_NAME=dev
DEV_DATABASE_USER=root
DEV_DATABASE_PASSWORD=password
DEV_DATABASE_HOST=127.0.0.1
DEV_DATABASE_PORT=3306


# Database Information on test
TEST_DATABASE_NAME=dev
TEST_DATABASE_USER=root
TEST_DATABASE_PASSWORD=password
TEST_DATABASE_HOST=127.0.0.1
TEST_DATABASE_PORT=3306


# Database Information on production
PRO_DATABASE_NAME=dev
PRO_DATABASE_USER=root
PRO_DATABASE_PASSWORD=password
PRO_DATABASE_HOST=127.0.0.1
PRO_DATABASE_PORT=3306


```

Note: if you are using mysql 8.0 sequilize does not caching_sha2_password then you might need to configure my_native_possword to make it work. Here is the link to an article that can help.[https://medium.com/codespace69/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server-consider-8afadc2385e2](https://medium.com/codespace69/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server-consider-8afadc2385e2) 

-Run the project in Development
```
yarn dev
```
Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you.

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links), but this project has been pre-configured for use with [VS Code](https://code.visualstudio.com/).
Throughout the README We will try to call out specific places where VS Code really shines or where this project has been setup to take advantage of specific features.

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

# Deploying the app
There are many ways to deploy an Node app, and in general, nothing about the deployment process changes because you're using TypeScript.
In this section, I'll walk you through how to deploy this app to Azure App Service using the extensions available in VS Code because I think it is the easiest and fastest way to get started, as well as the most friendly workflow from a developer's perspective.

## Prerequisites
- [**Azure account**](https://azure.microsoft.com/en-us/free/) - If you don't have one, you can sign up for free.
The Azure free tier gives you plenty of resources to play around with including up to 10 App Service instances, which is what we will be using.
- [**VS Code**](https://code.visualstudio.com/) - We'll be using the interface provided by VS Code to quickly deploy our app.
- [**Azure App Service VS Code extension**](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) - In VS Code, search for `Azure App Service` in the extension marketplace (5th button down on the far left menu bar), install the extension, and then reload VS Code.
- **Create a cloud database** -
For local development, running MySQl on localhost is fine, however once we deploy we need a database with high availability.
The easiest way to achieve this is by using a managed cloud database.

## Deploying to Azure App Service
Deploying from VS Code can be broken into the following steps:
1. Authenticate your Azure account in VS Code
2. Build your app
3. Zip deploy using the Azure App Service extension

### Sign in to your Azure account
1. Open VS Code
2. Expand the Azure App Service menu in the explorer menu
    - If you don't see this, you might not have the `Azure App Service` extension installed.
    See the pre-reqs section.
3. Click `Sign in to Azure...`
4. Choose `Copy & Open` from the resulting dialog
    - This will open `aka.ms/devicelogin` in a browser window.
    If it doesn't, just navigate there manually.
5. Paste in the code that is on your clipboard.
6. Go back to VS Code, you should now be signed in.
You can confirm that everything worked by seeing your Azure subscription listed in the Azure App Service section of the explorer window.
Additionally you should see the email associated with your account listed in the status bar at the bottom of VS Code.

### Build the app
Building the app locally is required to generate a zip to deploy because the App Service won't execute build tasks.
Build the app however you normally would:
- `ctrl + shift + b` - kicks off default build in VS Code
- execute `npm run build or yarn build` from a terminal window

### Zip deploy from VS Code
1. Make sure your app is built, whatever is currently in your `dist` and `node_modules` folders will be the app that is deployed.
2. Click the blue up arrow (Deploy to Web App) on the Azure App Service section of the explorer window.
3. Choose the entire project directory.
If you haven't changed the name, this will be `TypeScript-Node-Starter`.
4. Choose the subscription you want this app to be billed to (don't worry, it will be free).
5. Choose `Create New Web App`
6. Enter a globally unique name -
This will be part of the URL that azure generates so it has to be unique, but if you're planning on adding a custom domain later, it's not that important. I usually just add random numbers to the end of the app name, ie. typescript-node-starter-15121214.
7. Choose a resource group -
If you don't know what this is, just create a new one.
If you have lots of cloud resources that should be logically grouped together (think an app service and a database that supports that app) then you would want to put them in the same resource group.
This can always be updated later though.
If you create a new resource group, you'll also be prompted to pick a location for that group.
Pick something geographically close to where your users are.
8. Choose `Create new App Service Plan` -
An app service plan mainly is what determines the size and cost of the hardware your app will run on, but it also manages some other settings which we can ignore for now.
9. Choose `B1 - Basic` - This one is free.
If you know what you're doing, feel free to select a stronger pricing tier.
10. Choose your target node runtime version - We are deploying to Linux machines, and in addition we can choose the exact node runtime we want.
If you don't know what you want, choose whatever the current LTS build is.
11. Grab a cup of coffee - You'll see everything you just selected getting created in the output window.
All of this is powered by the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/overview?view=azure-cli-latest) and can be easily replicated if you decide you want to customize this process.
This deployment is not the fastest option (but it is the easiest!). We are literally bundling everything in your project (including the massive node_modules folder) and uploading it to our Azure app service. Times will vary, but as a baseline, my deployment took roughly 6 minutes.
12. Add `NODE_ENV` environment variable - In the App Service section of the explorer window, expand the newly created service, right click on **Application Settings**, select **Add New Settings...**, and add `NODE_ENV` as the key and `production` as the value.
This setting determines which database to point to.
If you haven't created a cloud database yet, see [the setup instructions](#mlab).
13. Profit! If everything worked you should see a page that looks like this: [TypeScript Node Starter Demo Site](https://typescript-node-starter.azurewebsites.net/)

### Troubleshooting failed deployments
Deployment can fail for various reasons, if you get stuck with a page that says *Service Unavailable* or some other error, [open an issue](https://github.com/Microsoft/TypeScript-Node-Starter/issues/new) and I'll try to help you resolve the problems.

# TypeScript + Node
In the next few sections I will call out everything that changes when adding TypeScript to an Express project.
Note that all of this has already been setup for this project, but feel free to use this as a reference for converting other Node.js projects to TypeScript.

## Getting TypeScript
TypeScript itself is simple to add to any project with `npm`.
```
npm install -D typescript
```
If you're using VS Code then you're good to go!
VS Code will detect and use the TypeScript version you have installed in your `node_modules` folder.
For other editors, make sure you have the corresponding [TypeScript plugin](http://www.typescriptlang.org/index.html#download-links).

## Project Structure
The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.vscode**              | Contains VS Code specific settings                                                            |
| **.github**              | Contains GitHub settings and configurations, incuding the GitHub Actions workflows            |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | Passport authentication strategies and login middleware. Add other complex config code here   |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/models**           | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/public**           | Static assets that will be used client side                                                   |
| **src/types**            | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files)          |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Separate from source because there is a different build process.         |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .travis.yml              | Used to configure Travis CI build                                                             |
| .copyStaticAssets.ts     | Build script that copies images, fonts, and JS libs to the dist folder                        |
| jest.config.js           | Used to configure Jest running tests written in TypeScript                                    |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tsconfig.tests.json      | Config settings for compiling tests written in TypeScript                                     |
| .eslintrc                | Config settings for ESLint code style checking                                                |
| .eslintignore            | Config settings for paths to exclude from linting                                             |

## Building the project
It is rare for JavaScript projects not to have some kind of build pipeline these days, however Node projects typically have the least amount of build configuration.
Because of this I've tried to keep the build as simple as possible.
If you're concerned about compile time, the main watch task takes ~2s to refresh.

### Configuring TypeScript compilation
TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.
```json
"compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
        "*": [
            "node_modules/*",
            "src/types/*"
        ]
    }
},
```

| `compilerOptions` | Description |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `"module": "commonjs"`             | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use            |
| `"esModuleInterop": true,`         | Allows usage of an alternate module import syntax: `import foo from 'foo';`                            |
| `"target": "es6"`                  | The output language level. Node supports ES6, so we can target that here                               |
| `"noImplicitAny": true`            | Enables a stricter setting which throws errors when something has a default `any` value                |
| `"moduleResolution": "node"`       | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node)                                                                    |
| `"sourceMap": true`                | We want source maps to be output along side our JavaScript. See the [debugging](#debugging) section    |
| `"outDir": "dist"`                 | Location to output `.js` files after compilation                                                        |
| `"baseUrl": "."`                   | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped) |
| `paths: {...}`                     | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped) |

The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context:
```json
"include": [
    "src/**/*"
]
```
`include` takes an array of glob patterns of files to include in the compilation.
This project is fairly simple and all of our .ts files are under the `src` folder.
For more complex setups, you can include an `exclude` array of glob patterns that removes specific files from the set defined with `include`.
There is also a `files` option which takes an array of individual file names which overrides both `include` and `exclude`.


## License
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the [MIT](LICENSE.txt) License.
