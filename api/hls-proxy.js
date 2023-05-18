const request = require('request');

export default function handler(req, res) {
  res.send(req.originalUrl);
}
