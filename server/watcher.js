var NpmFileSystem = Npm.require('fs');
var watchers = [];

refreshFileWatchers = function() {
    closeAllWathcers();
    addAllWatchers();
}

var closeAllWathcers = function() {
    for (var key in watchers) {
        try {
            watchers[key].close();
            console.log("removed watcher from " + watchers[key]);
        } catch (exception) {
            console.log("failed to remove watcher from " + watchers[key] + ", with reason: " + exception);
        }
    }
    watchers = [];
}

var addAllWatchers = function() {
    WatchedFile.find().forEach(function(watchedFile) {
        try {
            watchers[watchedFile._id] = NpmFileSystem.watch(watchedFile.filePath, Meteor.bindEnvironment(function() {
                parseLog(watchedFile);
            }));
            console.log("added watcher to " + watchedFile.filePath);
            parseLog(watchedFile, true);
        } catch (exception) {
            console.log("failed to add watcher to " + watchedFile.filePath + ", with reason: " + exception);
        }
    });
}