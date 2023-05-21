import request from 'request';

export default async function handler(req, res) {
  const url = decodeURIComponent(req.url.slice(19));
  const ret = {};

  request.get(url, (err, res) => {
      if (err) {
	      console.log('err', err);
      	res.send(err);
      } else {
	      res.send(res.body)
      }
    })
    .on('response', function(response) {
      // 设置响应头
      res.set('Content-Type', response.headers['content-type']);
      res.set('Content-Length', response.headers['content-length']);
      res.set('Content-Disposition', response.headers['content-disposition']);
    })
}