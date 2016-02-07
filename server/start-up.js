Meteor.startup(function() {
    Log.remove({});
    LogPatterns.remove({});

    parsePatterns();
    refreshFileWatchers();
    SyncedCron.start();

});