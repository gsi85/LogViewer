Meteor.startup(function() {
    clearCollections();
    publishCollections();

    //TODO: just for testing purpose
    QuickFilters.insert({
        name: "Log level",
        categories: []
    });

    parsePatterns.parsePatterns();
    refreshFileWatchers.refreshFileWatchers();
    SyncedCron.start();

    function clearCollections() {
        Log.remove({});
        LogPatterns.remove({});
        QuickFilters.remove({});
    };

    function publishCollections() {
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
});