const fs = require('fs');
const babel = require('@babel/core');
const writeFile = require('../utils/writeFile');
const wrap = require('../utils/wrap');

/**
 * 编译 JS 文件
 * @param {string} origin 要编译的文件信息
 * @param {string} dist 要写入的文件信息
 */
const babelLoader = async ({ origin, dist }) => {
  const buffer = await wrap(fs.readFile)(origin);
  const result = await wrap(babel.transform)(buffer, {
    filename: origin,
    plugins: [
      ['module-resolver', {
        extensions: ['.js', '.json'],
        root: ['.'],
        alias: {
          '@': './src',
        },
      }],
      ['transform-node-env-inline'],
    ],
    comments: false,
    babelrc: false,
  });
  await writeFile(dist, unescape(result.code));
  return true;
};

module.exports = babelLoader;
