import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'
// import uglify from 'rollup-plugin-uglify'


export default {
  entry: 'src/main.js',
  dest: 'lib/lib.min.js',
  format: 'cjs',
  sourceMap: 'true',
  moduleName: 'exemplator-middleware',
  plugins: [
    json(),
    typescript(),
    nodeResolve({
      jsnext: true,
      main: true,
      module: true,
      preferBuiltins: false
    }),
    commonjs({
      namedExports: {
        'node_modules/punycode/punycode.js': ['toASCII']
      }
    }),
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
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ]
}
