import copy from 'rollup-plugin-copy';
import { join as pathJoin, resolve as pathResolve } from 'path';
import { config } from '../../rollup/config';

const srcPath = __dirname;
const buildPath = pathResolve(__dirname, '../../public');

export default config({
  input: pathJoin(srcPath, 'main.ts'),
  name: 'listOfQuotes',
  jsFile: pathJoin(buildPath, 'list-of-quotes/list-of-quotes.js'),
  plugins: [
    copy({
      targets: [
        {
          src: pathJoin(srcPath, './index.html'),
          dest: pathJoin(buildPath)
        }
      ],
      copyOnce: true
    })
  ]
});
