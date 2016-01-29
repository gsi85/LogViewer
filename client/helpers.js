logs = function() {
    return Log.find({});
}

watchedFiles = function() {
    return WatchedFile.find({});
}

Template.registerHelper('logs', logs);
Template.registerHelper('watchedFiles', watchedFiles);