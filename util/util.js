var fs=require("fs");
exports.loadConfig=function(configName){
	var path=rootPath+"/"+"config/"+configName+".json";
	var data=fs.readFileSync(path);
	return JSON.parse(data);
}
