import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'

export default {
  entry: 'src/main.js',
  dest: 'lib/lib.min.js',
  format: 'umd',
  sourceMap: 'inline',
  moduleName: 'exemplator-middleware',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      module: true,
      preferBuiltins: false
    }),
    commonjs(),
    globals(),
    builtins(),
    eslint({
      exclude: [
        'src/antlr/**'
      ]
    }),
    babel({exclude: 'node_modules/**'}),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    uglify()
  ]
}
