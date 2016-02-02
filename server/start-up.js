Meteor.startup(function() {
    Log.remove({});
    LogPatterns.remove({});

    parsePatterns();

    WatchedFile.find().forEach(function(watchedFile) {
        addWatcher(watchedFile);
    });

    SyncedCron.start();

});