import request from 'request';

export default function handler(req, res) {
  // 截取 /pan/proxy/ 后面的内容
  const url = decodeURIComponent(req.url.slice(19));
  request.get(url)
    .on('response', function(response) {
      // 设置响应头
      res.set('Content-Type', response.headers['content-type']);
      res.set('Content-Length', response.headers['content-length']);
      res.set('Content-Disposition', response.headers['content-disposition']);
    })
    .pipe(res);
}
