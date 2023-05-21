import request from 'request';

export default function handler(req, res) {
  const url = decodeURIComponent(req.url.slice(19));
  res.send(url);
  // request.get(url)
  //   .on('response', function(response) {
  //     // 设置响应头
  //     res.set('Content-Type', response.headers['content-type']);
  //     res.set('Content-Length', response.headers['content-length']);
  //     res.set('Content-Disposition', response.headers['content-disposition']);
  //   })
  //   .pipe(res);
}
