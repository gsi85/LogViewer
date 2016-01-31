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
            processLog(data.split(/\r?\n/), watchedFile);
            console.log('updated source: ' + filePath);
        }
    } catch (exception) {
        console.log('failed to update source: ' + filePath + ", with reason: " + exception);
    }
};

var processLog = function(data, watchedFile) {
    var textArray = [];
    for (var index = data.length - 1; index >= 0; --index) {
        textArray.push(data[index]);
        var headers = parseHeaders(data[index].split(/\s+/), watchedFile.logPattern);
        //last check required due to what it seems like to be a bug in momentjs' parser, when incorrect format is parsed to date
        if ("timeStamp" in headers && headers["timeStamp"] != "Invalid Date" && headers["timeStamp"] > new Date(2010, 1, 1)) {
            Log.insert({
                timeStamp: headers["timeStamp"],
                source: watchedFile.filePath,
                text: textArray.reverse()
            });
            textArray = [];
        }
    }
};

var parseHeaders = function(data, logPattern) {
    var headers = [];
    var prefixElements = logPattern.prefixElements;
    if (prefixElements.length <= data.length) {
        for (var index = 0; index < prefixElements.length; ++index) {
            var entry = prefixElements[index].name;
            headers[entry] = data[index];
        };
        var timeStamp = [];
        logPattern.timeStamp.elements.forEach(function(element) {
            timeStamp.push(headers[element]);
        });
        var timeStampToParse = timeStamp.join(logPattern.timeStamp.elementsDelimiter);
        headers["timeStamp"] = moment(timeStampToParse, logPattern.timeStamp.format).toDate();
    }
    return headers;
}