export function getUrl(url, params) {
  if (!params || Object.keys(params).length <= 0) return url;
  const _url = url.split('#');
  _url[0] = _url[0].indexOf('?') >= 0 ? (_url[0].endsWith('?') && !/\?\S*\?/.test(_url[0])) || _url[0].endsWith('&') ? _url[0] : _url[0] + '&' : _url[0] + '?';
  if (params) _url[0] += queryString(params, true);
  return _url.join('#')
}

export function queryString(params, encode) {
  let str = '';
  Object.keys(params).map(key => {
    if (params[key] instanceof Array) {
      params[key].map(val => str += '&' + key + '=' + (encode ? encodeURIComponent(val) : val))
    } else
      str += '&' + key + '=' + (encode ? encodeURIComponent(params[key]) : params[key])
  });
  return str.slice(1)
}

export function convertToFormData(obj) {
  const data = new FormData();
  Object.keys(obj).map(key => {
    if (obj[key] instanceof FileList) { // 多张图片
      [].map.call(obj[key], file => data.append(key, file))
    } else if (obj[key] instanceof Array && (obj[key][0] instanceof File || obj[key][0] instanceof FileList)) { // 多张图片
      obj[key].map(item => {
        if (item instanceof FileList) [].map.call(item, file => data.append(key, file));
        else data.append(key, item);
      })
    } else if ((typeof obj[key]).indexOf('object') >= 0) {
      data.append(key, JSON.stringify(obj[key]))
    } else {
      data.append(key, obj[key])
    }
  });
  return data
}
