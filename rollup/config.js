import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

import { serve } from './serve';

/**
 * @param {object} opts
 * @param {string} opts.input
 * @param {string} opts.name
 * @param {string} opts.jsFile
 * @param {Array} opts.plugins?
 * @returns {object}
 */
function config(opts) {
  const production = !process.env.ROLLUP_WATCH;
  const cssCodes = [];

  return {
    input: opts.input,
    output: {
      name: opts.name,
      file: opts.jsFile,
      sourcemap: !production,
      format: 'iife'
    },
    plugins: [
      svelte({
        dev: !production,
        preprocess: sveltePreprocess(),
        css: (css) => {
          cssCodes.push(css.code);
        }
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      typescript({ sourceMap: !production }),
      !production && serve(),
      !production && livereload('public'),
      production && terser(),
      postcss({
        extract: true,
        minimize: production,
        sourceMap: !production
      }),
      json(),
      (function () {
        return {
          name: 'svelte-css',
          generateBundle(options, bundle) {
            const cssAppend = cssCodes.join(production ? '\n' : '');
            if (cssAppend) {
              let cssFile = Object.keys(bundle).find((b) => b.match(/\.css$/i));
              if (cssFile) {
                cssFile = bundle[cssFile];
                cssFile.source = [cssFile.source, cssAppend.trim()].join('\n');
              }
            }
          }
        };
      })(),
      ...(opts.plugins || [])
    ],
    watch: {
      clearScreen: false
    }
  };
}

export { config };
