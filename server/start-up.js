Meteor.startup(function() {
    Log.remove({});
    LogPatterns.remove({});

    Meteor.publish("logs", function() {
        return Log.find();
    });
    Meteor.publish("watchedFiles", function() {
        return WatchedFile.find();
    });
    Meteor.publish("logPatterns", function() {
        return LogPatterns.find();
    });

    parsePatterns();
    refreshFileWatchers();
    SyncedCron.start();

});