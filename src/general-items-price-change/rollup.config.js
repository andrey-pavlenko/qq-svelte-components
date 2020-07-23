import copy from 'rollup-plugin-copy';
import { join as pathJoin, resolve as pathResolve } from 'path';
import { config } from '../../rollup/config';

const srcPath = __dirname;
const buildPath = pathResolve(__dirname, '../../public');

export default config({
  input: pathJoin(srcPath, 'main.ts'),
  name: 'generalItemsPriceChange',
  jsFile: pathJoin(
    buildPath,
    'general-items-price-change/general-items-price-change.js'
  ),
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
