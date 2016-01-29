var watchers = [];

WatchedFile.before.insert(function(userId, watchedFile) {
    addWatcher(watchedFile._id, watchedFile.filePath);
});

WatchedFile.before.remove(function(userId, watchedFile) {
    removeWatcher(watchedFile._id, watchedFile.filePath);
});


addWatcher = function(id, filePath) {
    watchers[id] = NpmFileSystem.watch(filePath, Meteor.bindEnvironment(function() {
        parseLog(filePath);
    }));
    console.log("added watcher to " + filePath);
    parseLog(filePath, true);
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