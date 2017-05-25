import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
  entry: 'src/main.js',
  dest: 'lib/lib.min.js',
  format: 'umd',
  sourceMap: 'inline',
  moduleName: 'exemplator-middleware',
  plugins: [
    resolve({jsnext: true, main: true}),
    commonjs(),
    babel({exclude: 'node_modules/**'}),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ]
}
