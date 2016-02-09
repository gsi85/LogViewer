Meteor.startup(function() {
    clearCollections();
    publishCollections();

    //TODO: just for testing purpose
    QuickFilters.insert({
        name: "Log level",
        categories: []
    });
    
    parsePatterns();
    refreshFileWatchers();
    SyncedCron.start();
});

var clearCollections = function() {
    Log.remove({});
    LogPatterns.remove({});
    QuickFilters.remove({});
}

var publishCollections = function() {
    Meteor.publish("logs", function() {
        return Log.find();
    });
    Meteor.publish("watchedFiles", function() {
        return WatchedFile.find();
    });
    Meteor.publish("logPatterns", function() {
        return LogPatterns.find();
    });
    Meteor.publish("quickFilters", function() {
        return QuickFilters.find();
    });
}