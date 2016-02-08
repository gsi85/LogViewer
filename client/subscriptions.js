Meteor.subscribe("logPatterns");
Meteor.subscribe("watchedFiles");
Meteor.subscribe("logs");
Meteor.subscribe('logs', function onReady() {
    var newMaxWidth = $(".whatched-files-container").width() - $(".time-header").width();
    $(".log-entry").css({
        "max-width": newMaxWidth + "px"
    });
});