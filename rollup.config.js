import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';

const extensions = ['.ts', '.js'];

const LIBRARY_NAME = 'name';
const LIBRARY_NAME_LOWER = LIBRARY_NAME.toLowerCase();

export default [

  {
    input: 'src/index.ts',

    preserveModules: true,

    output: {
      dir: 'build/commonjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },

    plugins: [
      nodeResolve({browser: true}),
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      typescript({
        declaration: true,
        rootDir: 'src',
        declarationDir: 'build/commonjs/src',
      }),
    ],
  },

  {
    input: 'src/index.ts',
    preserveModules: true,
    output: {
      dir: 'build/es',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },

    plugins: [
      nodeResolve({browser: true}),
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      typescript({
        declaration: true,
        rootDir: 'src',
        declarationDir: 'build/es/src',
      }),
    ],
  },

  {
    input: 'src/index.ts',
    output: {
      file: `build/umd/${LIBRARY_NAME_LOWER}.js`,
      // dir: 'build/umd',
      format: 'umd',
      name: LIBRARY_NAME,
      sourcemap: true,
    },
    plugins: [
      nodeResolve({browser: true}),
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      typescript({
        declaration: true,
        rootDir: 'src',
        declarationDir: 'build/umd',
      }),
    ],
  },
];
