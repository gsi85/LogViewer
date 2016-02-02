var NpmFileSystem = Npm.require('fs');
var watchers = [];

WatchedFile.before.insert(function(userId, watchedFile) {
    addWatcher(watchedFile);
});

WatchedFile.before.remove(function(userId, watchedFile) {
    removeWatcher(watchedFile._id, watchedFile.filePath);
});


addWatcher = function(watchedFile) {
    try {
        watchers[watchedFile._id] = NpmFileSystem.watch(watchedFile.filePath, Meteor.bindEnvironment(function() {
            parseLog(watchedFile);
        }));
        console.log("added watcher to " + watchedFile.filePath);
        parseLog(watchedFile, true);
    } catch (exception) {
        console.log("failed to add watcher to " + watchedFile.filePath + ", with reason: " + exception);
    }
}

removeWatcher = function(id, filePath) {
    try {
        watchers[id].close();
        Log.remove({
            source: filePath
        });
        console.log("removed watcher from " + filePath);
    } catch (exception) {
        console.log("failed to remove watcher from " + filePath + ", with reason: " + exception);
    }
}