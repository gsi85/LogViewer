// This utter hack required because loggers usually keeps the file stream opened while app is running,
// thus the operating systems (tested on Windows) does not recognize the log file being altered, as a consiquence
// the fs.watch() event is not firing.
SyncedCron.add({
    name: 'Refresh log file states',
    schedule: function(parser) {
        return parser.text('every 1 seconds');
    },
    job: function() {
        var NpmFileSystem = Npm.require('fs');
        WatchedFile.find().forEach(function(watchedFile) {
            try {
                NpmFileSystem.statSync(watchedFile.filePath);
            } catch (exception) {}
        });
    }
});

SyncedCron.config({
    log: false
});