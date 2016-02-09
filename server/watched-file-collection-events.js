var NpmFileSystem = Npm.require('fs');
var watchers = [];
var throwNoFileException = function() {
    throw new Meteor.Error(500, 'No file exists at the provided file path');
}
var thowAlreadyAddedException = function() {
    throw new Meteor.Error(500, 'File already watched');
}

WatchedFile.before.insert(function(userId, watchedFile) {
    try {
        if (!NpmFileSystem.lstatSync(watchedFile.filePath).isFile) {
            throwNoFileException();
        }
    } catch (exception) {
        throwNoFileException();
    }
    if (WatchedFile.findOne({
            filePath: watchedFile.filePath
        })) {
        thowAlreadyAddedException();
    }
});

WatchedFile.after.insert(function(userId, watchedFile) {
    refreshFileWatchers();
});

WatchedFile.after.remove(function(userId, watchedFile) {
    refreshFileWatchers();
    Log.remove({
        source: watchedFile.filePath
    });
    QuickFilters.remove({
        source: watchedFile.filePath
    });
});