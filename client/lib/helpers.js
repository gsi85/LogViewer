Template.registerHelper('logs', function() {
    return Log.find({}, {
        sort: {
            timeStamp: -1
        }
    });
});

Template.registerHelper('watchedFiles', function() {
    return WatchedFile.find({});
});

Template.registerHelper('logPatterns', function() {
    return LogPatterns.find({});
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss,SSS');
});

Template.registerHelper('formatLogText', function(text) {
    return text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
});