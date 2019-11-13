const path = require('path');
const fileLoader = require('../loader/file');
const sassLoader = require('../loader/sass');
const jsLoader = require('../loader/js');
const wxsLoader = require('../loader/wxs');

const complier = async (file) => {
  const originExtname = path.extname(file.origin);
  switch (originExtname) {
    case '.scss':
      return sassLoader(file);
    case '.js':
      return jsLoader(file);
    case '.wxs':
      return wxsLoader(file);
    default:
      return fileLoader(file);
  }
};

module.exports = complier;
