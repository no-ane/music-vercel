const request = require('request');

export default function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.send('403');
  }

  request.get(decodeURIComponent(url))
    .on('response', function (response) {
      // 设置响应头
      // res.setHeader('Content-Type', 'text/html');
      // res.setHeader('Cache-Control', 'no-cache');

      if (response.headers['content-type']) res.setHeader('Content-Type', response.headers['content-type']);
      if (response.headers['content-length']) res.setHeader('Content-Length', response.headers['content-length']);
      if (response.headers['content-disposition']) res.setHeader('Content-Disposition', response.headers['content-disposition']);
    })
    .pipe(res);
}
