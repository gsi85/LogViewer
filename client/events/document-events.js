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