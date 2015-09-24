var fs = require('fs');
var basePath = 'creative/img/';
var saveFile = 'pre.txt';

fs.readdir(basePath, function(err, files){
	fs.unlink(saveFile, function(){});

	for(var i = 0; i < files.length; ++i){
		if(files[i][0] != '.'){
			save(basePath + files[i], i == files.length - 1);
		}
	}
});

function save(content, flag){
	if(flag){
		fs.appendFile(saveFile, content, 'utf-8', function(){});
	}else{
		fs.appendFile(saveFile, content + '\r\n', 'utf-8', function(){});
	}
	
}