import request from 'request';

export default async function handler(req, res) {
  const url = decodeURIComponent(req.url.slice(19));
  const ret = {};

  request.get('https://res.cloudinary.com/practicaldev/image/fetch/s--c63-lUU4--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ppmwtvozrqoapx29p4nm.png', (err, res) => {
      console.log(err);
      if (err) {
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