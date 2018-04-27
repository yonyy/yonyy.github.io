// This file only exists for development purposes, running the app
const express = require('express');
const path = require('path');

const app = express();
const index = path.resolve(__dirname, 'index.html');

app.use(express.static('brewkrew'));
app.get('/', (req, res, next) => {
	res.sendFile(index);
});

app.listen(8080, () => {
	console.log('yonyy.github.io listening on port 8080');
});
