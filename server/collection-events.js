var NpmFileSystem = Npm.require('fs');
var watchers = [];

WatchedFile.after.insert(function(userId, watchedFile) {
    refreshFileWatchers();
});

WatchedFile.after.remove(function(userId, watchedFile) {
    refreshFileWatchers();
    Log.remove({
        source: watchedFile.filePath
    });
});