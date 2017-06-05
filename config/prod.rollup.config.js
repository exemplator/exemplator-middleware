import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'

export default {
  entry: 'src/main.js',
  dest: 'lib/lib.min.js',
  format: 'cjs',
  sourceMap: 'true',
  moduleName: 'exemplator-middleware',
  plugins: [
    json(),
    typescript(),
    replace({
      exclude: 'node_modules/**',
      NODE_ENV: JSON.stringify('production')
    })
  ]
}
