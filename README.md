# webpack-react-starter-kit
Boilerplate to kick off your react app using webpack

This boilerplate makes the following available to your app at the start:

### _webpack_build_
webpack_build contains pre-configured environments and composable presets. 

###### Environments
Environments include the `common` (which is loaded first) and either `development` or `production` (which is loaded on top of `common`). There is also `none` in case you want to provide your customized environment.

Usage

```sh
webpack --env.mode development
```

```sh
webpack-dev-server --env.mode development
```

if `--env.mode` is not provided, default to environment `production`

###### Presets
Presets are bite-sized webpack configs you can apply using `applyPresets` in your `webpack.config.js` or supply `--env.presets` through command line

```sh
webpack --env.presets noMinimize --env.presets analyze --env.openAnalyzer 0
```

Available presets

`clean`

Run `clean-webpack-plugin` to clean the output folder specified in `output.path` (default is `build`). Setting `output.path` using `--env.output.path`.

`outputDev`

Applicable only when you use `webpack-dev-server`, run `write-file-webpack-plugin` to output the files to `output.path`.

`serveStatics`

Run `copy-webpack-plugin` to copy the static content files from the folder speficied in `staticContents` to the build folder specified by `output.path`. Those are the files which appear as links in your app instead of being imported and packed by webpack.

```js
const DEFAULT_ENV = {
  mode: 'production',
  output: { path: path.resolve(__dirname, 'build') },
  presets: ['serveStatics'],
  staticContents: [path.resolve(__dirname, 'public')],
};
```

`extractCss`

Use `mini-css-extract-plugin` to extract css to a separate file for fasting loading of bundle.js. This preset is applied for `production` environment.

`analyze`

Start the `webpack-bundle-analyzer` after completing the build, set `--env.openAnalyzer 0` to prevent opening a new window to show bundle graph (default is _true_).

`limitTimezones`

If you use `moment-timezone` in your app, you can apply this preset to replace the provided full timezone file by `moment-timezone` with your own customize timezone file. This preset requires argument `timezonesFilepath` to specify the path to your timezone file.

```js
const DEFAULT_ENV = {
  mode: 'production',
  output: { path: path.resolve(__dirname, 'build') },
  presets: ['limitTimezones'],
  timezonesFilepath: path.resolve(__dirname, 'src/data/assets/i18n/timezones.json'),
};
```

`trimLocales`

If you use `moment` in your app, you can apply this preset to only pack those locales your app want to support from `moment/locale` via command line `--env.locales`. If none is supplied, no locale is packed.

```js
webpack --env.locales de --env.locales fr
```

You can create your own presets with naming convention `webpack.nameOfPreset.js` and put them inside `webpack_build/presets`

### _babel_
babel is pre-configured with 2 presets `@babel/preset-env` and `@babel/preset-react` and all the proposal from stage-0 to stage-3 (at the time of this writing) for your convenience.