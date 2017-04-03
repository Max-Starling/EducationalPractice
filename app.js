/*var fs = require('fs');
var fname = process.argv[2];
fs.open(fname, "w+", 0644, function(err, file_handle) {
	if (!err) {
	    fs.write(file_handle, fname, null, 'ascii', function(err, written) {
	        if (!err) {
	            console.log("Текст успешно записан в файл");
	        } else {
	            console.log("Произошла ошибка при записи");
	        }
	    });
	} else {
		console.log("Произошла ошибка при открытии");
	}
});*/

var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/hello', function (req, res) {
res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});