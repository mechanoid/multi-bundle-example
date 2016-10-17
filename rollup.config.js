const path = require('path')
const glob = require('glob')
const rollup = require('rollup').rollup
const buble = require('rollup-plugin-buble')

const libs = glob.sync('src/**/index.js').map(file => path.basename(path.dirname(file)))

const externals = {
  external: libs,
  paths: libs.reduce((paths, lib) => Object.assign(paths, { [lib]: `/dist/${lib}.js` }), {})
}

console.log(externals)

libs.map((lib) => {
  return rollup(Object.assign({}, externals, {
    entry: `src/${lib}/index.js`,
    plugins: [buble()]
  }))
  .then((bundle) => bundle.write({
    format: 'amd',
    dest: `dist/${lib}.js`
  }))
})

Promise.all('')
.then(() => rollup(Object.assign({}, externals, {
  entry: 'src/app.js',
  plugins: [buble()]
})))
.then((bundle) => bundle.write({
  format: 'amd',
  dest: 'dist/app.js'
}))
