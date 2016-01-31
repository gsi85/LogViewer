logs = function() {
    return Log.find({});
}

watchedFiles = function() {
    return WatchedFile.find({});
}

logPatterns = function() {
    return LogPatterns.find({});
}

Template.registerHelper('logs', logs);
Template.registerHelper('watchedFiles', watchedFiles);
Template.registerHelper('logPatterns', logPatterns);