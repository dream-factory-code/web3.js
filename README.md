<p align="center">
  <img src="assets/logo/web3js.jpg" width="200" alt="web3.js" />
</p>

# web3t - Tolar JavaScript API

This is the Tolar [JavaScript API][docs]
which connects to the [Generic JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) spec.

You need to run a local or remote [Tolar](https://www.tolar.io/) node to use this library.

Please read the [documentation][docs] for more.

## Installation

### Node

```bash
npm install @dreamfactoryhr/web3t
```

### In the Browser

Use the prebuild `dist/web3.min.js`, or
build using the [web3t][repo] repository:

```bash
npm run-script build
```

Then include `dist/web3.js` in your html file.
This will expose `Web3` on the window object.

## Usage

```js
// in node.js
var Web3 = require('@dreamfactoryhr/web3t');

var web3 = new Web3('https://...');
console.log(web3);
> {
    eth: ... ,
    shh: ... ,
    utils: ...,
    ...
}
```

Additionally you can set a provider using `web3.setProvider()` (e.g. WebsocketProvider):

```js
web3.setProvider("https://...");
// or
web3.setProvider(new Web3.providers.WebsocketProvider("https://..."));
```

There you go, now you can use it:

```js
web3.eth.getAccounts().then(console.log);
```

### Usage with TypeScript

We support types within the repo itself. Please open an issue here if you find any wrong types.

You can use `web3t` as follows:

```typescript
import Web3 from "web3";
const web3 = new Web3("https://...");
```

If you are using the types in a `commonjs` module like for example a node app you just have to enable `esModuleInterop` in your `tsconfig` compile option, also enable `allowSyntheticDefaultImports` for typesystem compatibility:

```js
"compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    ....
```

## Documentation

Documentation can be found at [ReadTheDocs][docs].

## Building

### Requirements

-   [Node.js](https://nodejs.org)
-   [npm](https://www.npmjs.com/)

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

### Building (gulp)

Build only the web3.js package:

```bash
npm run-script build
```

Or build all sub packages as well:

```bash
npm run-script build-all
```

This will put all the browser build files into the `dist` folder.

### Testing (mocha)

```bash
npm test
```

[docs]: https://tolar-clients.kwiki.io/docs/web3js
[repo]: https://github.com/dream-factory-code/web3.js
[repo-readme]: https://github.com/dream-factory-code/web3.js/blob/1.x/README.md
