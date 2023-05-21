import request from 'request';
import qs from 'qs';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function handler(req, res) {

  // const url = 'http://xacu07.baidupcs.com/video/netdisk-videotran-xian/dc1bfeebcn8bb2e8151710ac487a697c_1166_1_ts/13253e38ff06863c647b5bf45a0d0c42?ts_size=3883328&app_id=31886974&csl=130&dp-logid=9032490625126805317&fn=%E5%83%8F%E9%B1%BC_%E7%8E%8B%E8%B4%B0%E6%B5%AA_6215c5a85b30e53c2e4c20c4ded38d72.mp3&from_type=1&fsid=291124099527735&iot_dev=0&iot_vip=0&iv=0&logid=9032490625126805317&mtime=1684313051&ouk=1582192676&r=179234360&size=4565558&sta_cs=2&sta_dt=audio&sta_dx=4&time=1684705013&to=28&tot=chCt0&uo=cnc&uva=965327153&vuk=1582192676&dtime=10&etag=13253e38ff06863c647b5bf45a0d0c42&fid=c9d89631fc39d5d32c2aba06b7f0533f-1582192676&len=161868&range=485604-647471&region=xian&sign=BOUTHNF-F3530edecde9cd71b79378b290804a96-BljiIxxoIl2EuHIGdeZZt1SnY2A%253D&need_suf=&pmk=140013253e38ff06863c647b5bf45a0d0c424aa57ff90000003b4140&by=my-streaming';
  const url = req.url.slice(19);

	const fnName = url.split('fn=')[1].split('&')[0];
	const encodeFnName = encodeURI(fnName);
	const url2 = `${url.split('fn=')[0]}fn=${encodeFnName}${url.split('fn=')[1].split('&').slice(1).join('&')}`

  const ret = {};

  request.get(url2, (err, requestResult) => {
      if (err) {
        console.log('err', err);
        res.send(err);
      } else {
        // res.send(requestResult.body);
        res.send(Buffer.from(requestResult.body, 'binary'));
      }
    })
    .on('response', function(response) {
      // 设置响应头
      if (response.headers['content-type']) {
      	ret['content-type'] = response.headers['content-type'];
      	res.setHeader('Content-Type', response.headers['content-type']);
      }

      if (response.headers['content-length']) {
      	ret['content-length'] = response.headers['content-length'];
      	res.setHeader('Content-Length', response.headers['content-length']);
      }

      if (response.headers['content-disposition']) {
      	ret['content-disposition'] = response.headers['content-disposition'];
      	res.setHeader('Content-Disposition', response.headers['content-disposition']);
      }

    })
}

export default allowCors(handler)
