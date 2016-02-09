Log.after.insert(function(userId, logEntry) {
    var logPattern = WatchedFile.findOne({
        filePath: logEntry.source
    }).logPattern;   
});