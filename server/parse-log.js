parseLog = (function() {
    var parseLog = {};

    NpmFileSystem = Npm.require('fs');
    lastLengths = [];

    parseLog.parseLog = function(watchedFile, firstTimeRun) {
        try {
            filePath = watchedFile.filePath;
            data = NpmFileSystem.readFileSync(filePath, 'utf8');
            if (firstTimeRun || lastLengths[filePath] != data.length) {
                lastLengths[filePath] = data.length;
                processLog(data.split(/\r?\n/), watchedFile);
            }
        } catch (exception) {
            console.log('failed to update source: ' + filePath + ", with reason: " + exception);
        }
    };

    function processLog(data, watchedFile) {
        var textArray = [];
        var latestEntry = Log.findOne({
            source: watchedFile.filePath
        }, {
            sort: {
                timeStamp: -1
            }
        });
        for (var index = data.length - 1; index >= 0; --index) {
            textArray.push(data[index]);
            var headers = parseHeaders(data[index].split(/\s+/), watchedFile.logPattern);
            //last two checks required due to what it seems like to be a bug in momentjs' parser, when incorrect format is parsed to date
            if ("timeStamp" in headers && headers["timeStamp"] != "Invalid Date" && headers["timeStamp"] > new Date(2010, 1, 1) && headers["timeStamp"] <= new Date()) {
                if (latestEntry == undefined || latestEntry.headers.timeStamp <= headers["timeStamp"]) {
                    var entryText = textArray.reverse().join("\n");
                    upsertLogEntry(headers, watchedFile, entryText);
                    updateQuickFilterCategories(headers);
                }
                textArray = [];
            }
        }
    }

    function parseHeaders(data, logPattern) {
        var headers = {};
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
    };

    function upsertLogEntry(headers, watchedFile, entryText) {
        Log.upsert({
            source: watchedFile.filePath,
            text: entryText
        }, {
            $set: {
                headers: headers,
                source: watchedFile.filePath,
                text: entryText
            }
        });
    };

    function updateQuickFilterCategories(headers) {
        QuickFilters.find().forEach(function(quickFilter) {
            if (quickFilter.name in headers) {
                var categories = quickFilter.categories;
                categories.push(headers[quickFilter.name]);
                QuickFilters.upsert({
                    name: quickFilter.name
                }, {
                    $set: {
                        categories: Array.from(new Set(categories))
                    }
                })
            }
        });
    }

    return parseLog;
}());