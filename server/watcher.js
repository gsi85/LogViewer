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
            console.log("removed watcher from " + key);
        } catch (exception) {
            console.log("failed to remove watcher from " + key + ", with reason: " + exception);
        }
    }
    watchers = [];
}

var addAllWatchers = function() {
    WatchedFile.find().forEach(function(watchedFile) {
        try {
            watchers[watchedFile.filePath] = NpmFileSystem.watch(watchedFile.filePath, Meteor.bindEnvironment(function() {
                parseLog(watchedFile);
            }));
            refreshQuickFilterCategories(watchedFile);
            console.log("added watcher to " + watchedFile.filePath);
            parseLog(watchedFile, true);
        } catch (exception) {
            console.log("failed to add watcher to " + watchedFile.filePath + ", with reason: " + exception);
        }
    });
}

var refreshQuickFilterCategories = function(watchedFile) {
    watchedFile.logPattern.prefixElements.forEach(function(prefixElement) {
        if (prefixElement.quickFilter) {
            var existingFilter = QuickFilters.findOne({
                name: prefixElement.name
            });
            if (!existingFilter) {
                QuickFilters.insert({
                    name: prefixElement.name,
                    source: watchedFile.filePath,
                    categories: []
                });
                console.log('added quick filter category: ' + prefixElement.name);
            }
        }
    });
};