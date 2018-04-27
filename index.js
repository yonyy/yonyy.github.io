// This file only exists for development purposes, running the app
const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const index = path.resolve(__dirname, 'index.html');

app.use(express.static('brewkrew'));
app.get('/', (req, res, next) => {
	res.sendFile(index);
});

app.get('/api/proxy', (req, res, next) => {
	const { url, key, address } = req.query
	console.log(url, key, address);
	request.get(({ 
		url,
		qs: {
			key,
			address
		},
		json: true,
	}), (err, resp, body) => {
		console.log('err: ', err);
		console.log('resp: ', resp);
		res.json(body);
	});
});

app.listen(8080, () => {
	console.log('yonyy.github.io listening on port 8080');
});
