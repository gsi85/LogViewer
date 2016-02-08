Template.body.events({
    "submit .new-file-form": function(event, template) {
        event.preventDefault();
        var filePath = event.target.filePath.value.trim();
        if (filePath != "") {
            WatchedFile.insert({
                filePath: filePath,
                alias: event.target.alias.value.trim(),
                logPattern: LogPatterns.findOne(event.target.logPattern.value)
            }, function(error, result) {
                if (error) {
                   template.$('#file-submit-error').html(error.reason);
                } else {
                    template.$('#file-submit-error').html("");
                }
            });
        }

        event.target.filePath.value = "";
        event.target.alias.value = "";
    }
});

Template.watchedFile.events({
    "click .delete": function() {
        WatchedFile.remove(this._id);
    }
});

Template.body.onCreated(function() {
    $(window).resize(function() {
        var newMaxWidth = $(".whatched-files-container").width() - $(".time-header").width();
        $(".log-entry").css({
            "max-width": newMaxWidth + "px"
        });
    });
});

Template.body.onDestroyed(function() {
    $(window).off('resize');
});