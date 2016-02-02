logs = function() {
    return Log.find({}, {sort: {timeStamp: -1}});
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
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss,SSS');
});