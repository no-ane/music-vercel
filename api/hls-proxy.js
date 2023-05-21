import request from 'request';

export default async function handler(req, res) {
  const url = decodeURIComponent(req.url.slice(19));
  const ret = {};

  request.get(url, (err, requestResult) => {
      if (err) {
	      console.log('err', err);
      	res.send(err);
      } else {
	      res.send(requestResult)
      }
    })
    .on('response', function(response) {
      // 设置响应头
      if (response.headers['content-type']) res.setHeader('Content-Type', response.headers['content-type']);
      if (response.headers['content-length']) res.setHeader('Content-Length', response.headers['content-length']);
      if (response.headers['content-disposition']) res.setHeader('Content-Disposition', response.headers['content-disposition']);
    })
}