const stringify = (obj) => {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    const arr = [];
    Object.keys(obj).forEach((key) => {
      // TODO: 考虑 value 为数组或对象的形式
      if (obj[key] || obj[key] === 0) {
        arr.push(`${key}=${obj[key]}`);
      }
    });
    return arr.join('&');
  }
  return '';
};

const parse = (str) => {
  const obj = {};
  const arr = str.split('&');
  arr.forEach((item) => {
    const [key, value] = item.split('=');
    obj[key] = value;
  });
  return obj;
};

export {
  stringify,
  parse,
};
