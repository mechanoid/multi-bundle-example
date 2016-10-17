const path = require('path')
const glob = require('glob')
const rollup = require('rollup').rollup
const buble = require('rollup-plugin-buble')

const libs = glob.sync('src/**/index.js').map(file => path.basename(path.dirname(file)))

const externals = {
  external: libs,
  paths: libs.reduce((paths, lib) => Object.assign(paths, { [lib]: `/dist/${lib}.js` }), {})
}

// creating lib bundles out of sub directories of src.
// All index.js files identity bundled libs, which will be retrievable by its basic dirname.
//
// Example:
//
// ```
// import example from 'example'
// ```
//
// will be resolved to
//
// ```
// define(['/dist/logger.js'], function (...
// ```
const libBundles = libs.map((lib) => {
  return rollup(Object.assign({}, externals, {
    entry: `src/${lib}/index.js`,
    plugins: [buble()]
  }))
  .then((bundle) => bundle.write({
    format: 'amd',
    dest: `dist/${lib}.js`
  }))
})

// build main endpoint bundle
Promise.all(libBundles)
.then(() => rollup(Object.assign({}, externals, {
  entry: 'src/app.js',
  plugins: [buble()]
})))
.then((bundle) => bundle.write({
  format: 'amd',
  dest: 'dist/app.js'
}))
