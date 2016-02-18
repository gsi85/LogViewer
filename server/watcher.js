var NpmFileSystem = Npm.require('fs');
var watchers = [];

refreshFileWatchers = (function() {

    refreshFileWatchers = {};

    refreshFileWatchers.refreshFileWatchers = function() {
        closeAllWathcers();
        addAllWatchers();
    };

    function closeAllWathcers() {
        for (var key in watchers) {
            try {
                watchers[key].close();
                console.log("removed watcher from " + key);
            } catch (exception) {
                console.log("failed to remove watcher from " + key + ", with reason: " + exception);
            }
        }
        watchers = [];
    };

    function addAllWatchers() {
        WatchedFile.find().forEach(function(watchedFile) {
            try {
                watchers[watchedFile.filePath] = NpmFileSystem.watch(watchedFile.filePath, Meteor.bindEnvironment(function() {
                    parseLog.parseLog(watchedFile);
                }));
                console.log("added watcher to " + watchedFile.filePath);
                parseLog.parseLog(watchedFile, true);
            } catch (exception) {
                console.log("failed to add watcher to " + watchedFile.filePath + ", with reason: " + exception);
            }
        });
    }

    return refreshFileWatchers;
    
}());