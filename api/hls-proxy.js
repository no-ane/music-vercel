import request from 'request';

export default function handler(req, res) {
  res.send(JSON.stringify(req));
}
