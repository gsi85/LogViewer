var NpmFileSystem = Npm.require('fs');
var OperatingSystem = Npm.require('os');
var lastLengths = [];

parseLog = function(watchedFile, firstTimeRun) {
    var currentTime = new Date().getTime();

    try {
        var filePath = watchedFile.filePath;
        var data = NpmFileSystem.readFileSync(filePath, 'utf8');
        if (firstTimeRun || lastLengths[filePath] != data.length) {
            lastLengths[filePath] = data.length;
            Log.remove({
                source: filePath
            });
            processLog(data.split(OperatingSystem.EOL), watchedFile.logPattern);
            Log.insert({
                source: filePath,
                text: data
            });
            console.log('updated source: ' + filePath);
        }
    } catch (exception) {
        console.log('failed to update source: ' + filePath + ", with reason: " + exception);
    }
};

var processLog = function(data, logPattern) {
    var logEntry = null;
    for (index = 0; index < data.length; ++index) {
        if (logEntry === null) {
            headers = parseHeaders(data[index], logPattern);
        }
    }
};

var parseHeaders = function(data, logPattern) {
    var headers = [];
    logPattern.prefixElements.forEach(function(entry) {
        if (entry.name == "timeStamp") {

        } else {
            headers[entry.name] = "";
        }
    });
}