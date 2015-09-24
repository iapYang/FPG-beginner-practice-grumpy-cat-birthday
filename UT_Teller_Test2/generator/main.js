var fs = require("fs");
var rd = require("rd");
var fileUtil = require('./fileUtil.js');
var deleteImgs = require('./deleteUselessImgs.js');
var EasyZip=require('easy-zip').EasyZip;

var pd = require('pretty-data').pd;

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Do you want to delete useless images?(Y/N)", function(answer) {
	if(answer.toLowerCase() == 'y'){
		deleteImgs.deleteImgs();
	}

	var source = fileUtil.readFile('../toClient/creative/style.css');
	var css_pp = pd.css(source);
	fileUtil.writeFileSync('../toClient/creative/style.css',css_pp);
	console.log('style.css is compressed...');

	var files = rd.readSync('../toClient/creative');
	var arr = [];
	files.forEach(function(item,index){
		var a = item.split('creative\\').pop();
		if(a.indexOf('.')>=0){
			if(a.match(/css\\|less\\|modules\\|swf\\|style.less|.map/)) return;
			arr.push({source: item, target: a});
		}
	});
	// console.log(arr);
	console.log('generating zip file, please wait...');
	var zip4 = new EasyZip();
	zip4.batchAdd(arr,function(){
	    zip4.writeToFile('../creative.zip');
	});
	rl.close();
});
