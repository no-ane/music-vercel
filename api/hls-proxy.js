import request from 'request';

export default function handler(req, res) {
	const ret = {
		headers: req.headers,
		url: req.url
	}
  res.send(JSON.stringify(ret));
}
