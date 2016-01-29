Meteor.startup(function() {
    Log.remove({});
    WatchedFile.find().forEach(function(watchedFile) {
        addWatcher(watchedFile._id, watchedFile.filePath);
    });
});