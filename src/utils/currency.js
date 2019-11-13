/**
 * 一个和价格相关的工具函数
 * 暂时未用到，现在是为了整理已有代码
 * 这个是用于 wxml 内的
 * @author pengtikui
 */

/**
 * 格式化价格
 * @param {number|string} price 价格，以分为单位
 * @returns {string} 以元为单位的价格，格式为 xx.xx
 */
const formatPrice = (price) => {
  if (!price || isNaN(price)) return '0.00';
  const result = (price / 100).toFixed(2).toString();
  return result;
};

/**
 * 更好的价格显示，去除后面的0
 * @param {number|string} price 价格，以分为单位
 * @returns {string} 格式化后的价格，以元为单位
 */
const betterPrice = (price) => {
  const formated = formatPrice(price);
  const formatedArr = formated.split('.');
  const yuan = formatedArr[0];
  const fen = formatedArr[1];
  if (fen === '00') return yuan;
  if (fen.split('')[1] === '0') return `${yuan}.${fen.split('')[0]}`;
  return formated;
};

/**
 * 拆分的价格
 * @param {number|string} price 价格，以分为单位
 * @returns {object} 以完整价格、元和分组成的对象
 * @example `{ yuan: '12', fen: '25' }`
 */
const splitPrice = (price) => {
  const formated = formatPrice(price);
  return {
    yuan: formated.split('.')[0],
    fen: formated.split('.')[1],
  };
};

export { formatPrice, betterPrice, splitPrice };
