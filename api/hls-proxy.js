import request from 'request';
import http from 'http';

export default async function handler(req, res) {
  const imageUrl = 'https://kuizuo.cn/img/logo.webp'; // 在线图片的 URL，根据实际情况修改

  http.get(imageUrl, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to fetch image. Status code: ${response.statusCode}`);
      res.status(500).end();
      return;
    }

    const chunks = [];
    response.on('data', (chunk) => chunks.push(chunk));
    response.on('end', () => {
      const imageData = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(imageData);
    });
  }).on('error', (error) => {
    console.error(`Error fetching image: ${error.message}`);
    res.status(500).end();
  });


  // const url = decodeURIComponent(req.url.slice(19));
  // const ret = {};

  // request.get(url, (err, requestResult) => {
  //     if (err) {
  //       console.log('err', err);
  //       res.send(err);
  //     } else {
  //       // res.send(requestResult.body);
  //       res.writeHead(200, {
  //         'Content-Type': ret['content-type'],
  //         'Content-Length': ret['content-length']
  //       });
  //       res.end(Buffer.from(requestResult.body));
  //     }
  //   })
  //   .on('response', function(response) {
  //     // 设置响应头
  //     if (response.headers['content-type']) {
  //     	ret['content-type'] = response.headers['content-type'];
  //     	res.setHeader('Content-Type', response.headers['content-type']);
  //     }

  //     if (response.headers['content-length']) {
  //     	ret['content-length'] = response.headers['content-length'];
  //     	res.setHeader('Content-Length', response.headers['content-length']);
  //     }

  //     if (response.headers['content-disposition']) {
  //     	ret['content-disposition'] = response.headers['content-disposition'];
  //     	res.setHeader('Content-Disposition', response.headers['content-disposition']);
  //     }

  //   })
}