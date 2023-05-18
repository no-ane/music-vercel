import request from 'request';

export default function handler(req, res) {
  res.send(req.originalUrl);
}
