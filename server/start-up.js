Meteor.startup(function() {

    console.log(moment("14-25-1995", "MM-DD-YYYY").toDate());

    Log.remove({});
    LogPatterns.remove({});

    parsePatterns();

    WatchedFile.find().forEach(function(watchedFile) {
        addWatcher(watchedFile);
    });

});